
import EstadoPedido from "./estado_pedido";
import Item from "../items/item";
import MedioDePago from "../medios_de_pago/medio_de_pago";
import EstadoItem from "../items/estado_item";
import Descuento from "../descuentos/descuento";
import Efectivo from "../medios_de_pago/efectivo";
import ComandoPedido from "../command/comando_pedido";
import AgregarItemCommand from "../command/agregar_item";
import QuitarItemCommand from "../command/quitar_item";
const CERO = 0;
// eslint-disable-next-line id-length
const UNO = 1;

/**
 * Define la estructura y el comportamiento común de los pedidos del restaurante.
 */
export default abstract class Pedido { // Abstracta porque no existe un pedido genérico

    private numeroPedido: number;
    private nombreCliente: string;
    private costoEnvio: number;
    private fecha: Date;
    private estado: EstadoPedido; // Estado actual del pedido
    private items: Item[]; // Lista de productos y combos agregados
    private totalBruto: number;
    private descuento: number;
    private totalCobrado: number;
    private medioPagoElegido: MedioDePago;
    private historialComandos: ComandoPedido[] = [];//aca guardamos los comandos


/**
 * Inicializa la instancia con los datos necesarios.
 * @param numeroPedido - Parámetro de tipo number utilizado por la operación.
 * @param nombreCliente - Parámetro de tipo string utilizado por la operación.
 * @param costoEnvio - Parámetro de tipo number utilizado por la operación.
 */
    public constructor(numeroPedido: number, nombreCliente: string, costoEnvio: number) {
        this.numeroPedido = numeroPedido;
        this.nombreCliente = nombreCliente;
        this.costoEnvio = costoEnvio;
        this.fecha = new Date(); // Guarda fecha y hora actual
        this.estado = EstadoPedido.EN_CONSTRUCCION; // Todo pedido comenzaria así, para consultar en quitar item
        this.items = []; // Inicializa colección vacía
        this.totalBruto = CERO;
        this.descuento = CERO;
        this.totalCobrado = CERO;
        this.medioPagoElegido = new Efectivo(); //Al crear un pedido nuevo, el medio de pago predeterminado es efectivo
    }
/**
 * Agrega un ítem al pedido si este se encuentra en construcción.
 * @param item - Parámetro de tipo Item utilizado por la operación.
 * @throws {Error} Si no se cumplen las condiciones necesarias para realizar la operación.
 */
    public agregarItem(item: Item): void {

        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error(
                "Pedido no se encuentra en construcción. No se puede agregar el item"
            );
        }

        const comando = new AgregarItemCommand(this.items, item);

        comando.ejecutar();

        this.historialComandos.push(comando);
    }
/**
 * Quita un ítem del pedido si se encuentra en un estado que permite modificarlo.
 * @param item - Parámetro de tipo Item utilizado por la operación.
 * @throws {Error} Si no se cumplen las condiciones necesarias para realizar la operación.
 */
    public quitarItem(item: Item): void {

        if (item.getEstado() !== EstadoItem.PENDIENTE) {
            throw new Error(
                "Item ya pasó a preparación. No se puede modificar"
            );
        }

        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error(
                "Pedido no se encuentra en construcción. No se puede eliminar el item"
            );
        }

        const comando = new QuitarItemCommand(this.items, item);

        comando.ejecutar();

        this.historialComandos.push(comando);
    }
/**
 * Revierte la última modificación registrada en el historial de comandos.
 * @throws {Error} Si no se cumplen las condiciones necesarias para realizar la operación.
 */
    public deshacerUltimaModificacion(): void {
        // Solo se puede deshacer una modificacion antes de confirmar el pedido
        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error(
                "Pedido no se encuentra en construcción. No se puede deshacer las modificaciones"
            );
        }
        // Verificamos si hay comandos en el historial
        if (!this.historialComandos.length) {
            throw new Error("No se realizo ninguna modificación para deshacer");
        }

        const posicionUltimo = this.historialComandos.length - UNO;
        const ultimoComando = this.historialComandos[posicionUltimo];

        ultimoComando.deshacer();

        this.historialComandos.pop();
    }

/**
 * Confirma el pedido e inicia su proceso de preparación.
 */
    public confirmarPedido(): void {
        this.estado = EstadoPedido.CONFIRMADO; // El pedido deja de ser editable
    }

/**
 * Realiza la operación puedeFacturarse dentro del modelo del restaurante.
 * @returns boolean con el resultado de la operación.
 */
    public puedeFacturarse(): boolean {

        return this.items.every(item => item.getEstado() === EstadoItem.LISTO);
        // Verifica que TODOS los items estén listos
    }

/**
 * Calcula el importe bruto del pedido, incluido el costo de envío.
 */
    public calcularTotalBruto(): void {

        this.totalBruto = this.items.reduce(
            (total, item) => total + (item.getElemento().getPrecio() * item.getCantidad()), CERO
        );
        // Suma el subtotal de todos los items con sus respectivas cantidades
        // Ejemplo: (hamburguesa * cantHamburguesas) + (bebida * cantBebida) + etc...

        this.totalBruto += this.costoEnvio;
        //Sumo al subtotal de envío.
        //Dependiendo el tipo de pedido, se sumará el envío cargado o quedará igual.

    }

/**
 * Determina y aplica el descuento más conveniente entre los recibidos.
 * @param descuentos - Parámetro de tipo Descuento[] utilizado por la operación.
 */
    public aplicarDescuento(descuentos: Descuento[]): void {
        let mejorDescuento = CERO;
        for (const descuento of descuentos) {
            if (descuento.aplicable(this) &&
                descuento.getPorcentaje() > mejorDescuento) {
                mejorDescuento = descuento.getPorcentaje();
            }
        }
        this.descuento = this.totalBruto * mejorDescuento;
    }

/**
 * Calcula el importe final que debe abonarse.
 */
    public calcularTotalFinal(): void {
        this.totalCobrado = this.totalBruto - this.descuento;
    }

    // Getters
/**
 * Devuelve numeropedido.
 * @returns number con el resultado de la operación.
 */
    public getNumeroPedido(): number {
        return this.numeroPedido;
    }

/**
 * Devuelve nombrecliente.
 * @returns string con el resultado de la operación.
 */
    public getNombreCliente(): string {
        return this.nombreCliente;
    }

/**
 * Devuelve costoenvio.
 * @returns number con el resultado de la operación.
 */
    public getCostoEnvio(): number {
        return this.costoEnvio;
    }

/**
 * Devuelve fecha.
 * @returns Date con el resultado de la operación.
 */
    public getFecha(): Date {
        return this.fecha;
    }

/**
 * Devuelve estado.
 * @returns EstadoPedido con el resultado de la operación.
 */
    public getEstado(): EstadoPedido {
        return this.estado;
    }

/**
 * Devuelve items.
 * @returns Item[] con el resultado de la operación.
 */
    public getItems(): Item[] {
        return this.items;
    }

/**
 * Devuelve totalbruto.
 * @returns number con el resultado de la operación.
 */
    public getTotalBruto(): number {
        return this.totalBruto;
    }

/**
 * Devuelve descuento.
 * @returns number con el resultado de la operación.
 */
    public getDescuento(): number {
        return this.descuento;
    }

/**
 * Devuelve totalcobrado.
 * @returns number con el resultado de la operación.
 */
    public getTotalCobrado(): number {
        return this.totalCobrado;
    }

/**
 * Devuelve mediodepago.
 * @returns MedioDePago con el resultado de la operación.
 */
    public getMedioDePago(): MedioDePago {
        return this.medioPagoElegido;
    }

    // Setters
/**
 * Actualiza numeropedido.
 * @param numeroPedido - Parámetro de tipo number utilizado por la operación.
 */
    public setNumeroPedido(numeroPedido: number): void {
        this.numeroPedido = numeroPedido;
    }

/**
 * Actualiza nombrecliente.
 * @param nombreCliente - Parámetro de tipo string utilizado por la operación.
 */
    public setNombreCliente(nombreCliente: string): void {
        this.nombreCliente = nombreCliente;
    }

/**
 * Actualiza costoenvio.
 * @param costoEnvio - Parámetro de tipo number utilizado por la operación.
 */
    public setCostoEnvio(costoEnvio: number): void {
        this.costoEnvio = costoEnvio;
    }

/**
 * Actualiza estado.
 * @param estado - Parámetro de tipo EstadoPedido utilizado por la operación.
 */
    public setEstado(estado: EstadoPedido): void {
        this.estado = estado;
    }

/**
 * Actualiza mediodepago.
 * @param medioPago - Parámetro de tipo MedioDePago utilizado por la operación.
 */
    public setMedioDePago(medioPago: MedioDePago): void {
        this.medioPagoElegido = medioPago;
    }

}
