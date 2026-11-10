
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
    //lo cambie xq antes solo agregabamos el item
    //ahora con el command podemos agregar y deshacer la accion de agregar el item
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
    //ahora se encarga de eliminar el producto y guardar la poscion
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
    //deshacemos la ultima modificacion, ya sea agregar o quitar item
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

    public confirmarPedido(): void {
        this.estado = EstadoPedido.CONFIRMADO; // El pedido deja de ser editable
    }

    public puedeFacturarse(): boolean {

        return this.items.every(item => item.getEstado() === EstadoItem.LISTO);
        // Verifica que TODOS los items estén listos
    }

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

    public aplicarDescuento(descuentos: Descuento[]): void {
        let mejorDescuento = CERO;
        for (const descuento of descuentos) {
            if (descuento.aplicable(this) &&
                descuento.calcularMontoDescuento(this) > mejorDescuento) {
                mejorDescuento = descuento.calcularMontoDescuento(this);
            }
        }
        this.descuento = mejorDescuento;
    }

    public calcularTotalFinal(): void {
        this.totalCobrado = this.totalBruto - this.descuento;
    }

    // Getters
    public getNumeroPedido(): number {
        return this.numeroPedido;
    }

    public getNombreCliente(): string {
        return this.nombreCliente;
    }

    public getCostoEnvio(): number {
        return this.costoEnvio;
    }

    public getFecha(): Date {
        return this.fecha;
    }

    public getEstado(): EstadoPedido {
        return this.estado;
    }

    public getItems(): Item[] {
        return this.items;
    }

    public getTotalBruto(): number {
        return this.totalBruto;
    }

    public getDescuento(): number {
        return this.descuento;
    }

    public getTotalCobrado(): number {
        return this.totalCobrado;
    }

    public getMedioDePago(): MedioDePago {
        return this.medioPagoElegido;
    }

    // Setters
    public setNumeroPedido(numeroPedido: number): void {
        this.numeroPedido = numeroPedido;
    }

    public setNombreCliente(nombreCliente: string): void {
        this.nombreCliente = nombreCliente;
    }

    public setCostoEnvio(costoEnvio: number): void {
        this.costoEnvio = costoEnvio;
    }

    public setFecha(fecha: Date): void {
        this.fecha = fecha;
    }

    public setEstado(estado: EstadoPedido): void {
        this.estado = estado;
    }

    public setMedioDePago(medioPago: MedioDePago): void {
        this.medioPagoElegido = medioPago;
    }

}
