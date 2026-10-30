import { EstadoPedido } from "./estado_pedido";
import Item from "./item";
import ElementoMenu from "./elemento_menu";
import MedioDePago from "./medio_de_pago";
import { DiaSemana } from "./dia_semana";
import EstadoItem from "./estado_item";

const CERO = 0;

export default abstract class Pedido { // Abstracta porque no existe un pedido genérico

    private numeroPedido: number;
    private nombreCliente: string;
    private fecha: Date;
    private estado: EstadoPedido; // Estado actual del pedido
    private items: Item[]; // Lista de productos y combos agregados
    private historialAgregaciones: Item[]; // Funciona como pila para deshacer cambios
    private historialEliminaciones: Item[];
    private historialAcciones: boolean[];
    private totalBruto: number;
    private descuento: number;
    private totalCobrado: number;


    public constructor(numeroPedido: number, nombreCliente: string) {
        this.numeroPedido = numeroPedido;
        this.nombreCliente = nombreCliente;
        this.fecha = new Date(); // Guarda fecha y hora actual
        this.estado = EstadoPedido.EN_CONSTRUCCION; // Todo pedido comenzaria así, para consultar en quitar item
        this.items = []; // Inicializa colección vacía
        this.historialAgregaciones = []; // Inicializa historial vacío
        this.historialEliminaciones = [];
        this.totalBruto = CERO;
        this.descuento = CERO;
        this.totalCobrado = CERO;
        this.historialAcciones = [];
    }

    public agregarItem(elemento: ElementoMenu, cantidad: number): void {

        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error("Pedido no se encuentra en construcción. No se puede agregar item");
        }

        const item = new Item(cantidad, elemento);

        this.items.push(item); // Agrega el item al pedido

        this.historialAgregaciones.push(item); // Guarda el cambio para poder deshacerlo

        this.historialAcciones.push(false);
    }

    public quitarItem(item: Item): void {

        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error(
                "Pedido no se encuentra en construcción. No se puede agregar item"
            ); // Solo se puede modificar o quitar un item antes de confirmar el pedido
        }

        if (item.getEstado() !== EstadoItem.PENDIENTE) {
            throw new Error(
                "Item ya no está pendiente. No se puede modificar"
            ); // Solo se puede modificar o quitar un item antes de que esté en preparación
        }

        this.items = this.items.filter(actual => actual !== item); // Elimina el item recibido

        this.historialEliminaciones.push(item);

        this.historialAcciones.push(true);
    }

    public deshacerUltimaModificacion(): void {

        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error(
                "Pedido no se encuentra en construcción. No se puede deshacer las modificaciones"
            ); // Solo se puede deshacer una modificacion antes de confirmar el pedido
        }

        const esEliminacion = this.historialAcciones.pop();

        if (esEliminacion === undefined) {
            throw new Error("No hay ninguna acción que deshacer");
        }

        if (esEliminacion) {
            this.deshacerEliminacion();
        } else {
            this.deshacerAgregacion();
        }

    }

    private deshacerEliminacion(): void {

        const ultimaEliminacion = this.historialAgregaciones.pop(); // Obtiene la última agregación realizada

        if (ultimaEliminacion) {
            this.items = this.items.filter(actual => actual !== ultimaEliminacion); // Elimina ese último item agregado
        }

    }

    private deshacerAgregacion(): void {

        const ultimaAgregacion = this.historialAgregaciones.pop(); // Obtiene la última agregación realizada

        if (ultimaAgregacion) {
            this.items = this.items.filter(actual => actual !== ultimaAgregacion); // Elimina ese último item agregado
        }

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
            (total, item) => total + (item.getElemento().getPrecio() * item.getCantidad()), CERO);

        /* const costoEnvioPorPedido = 5000;

        if (this.doGetTipoDePedido() === "Pedido con envio") {
            this.totalBruto += 
        } */

        // Suma el subtotal de todos los items con sus respectivas cantidades
        // Ejemplo: (hamburguesa * cantHamburguesas) + (bebida * cantBebida) + etc...
    }

    public aplicarDescuento(medioPago: MedioDePago): void {
        const descuentoEfectivo = 0.1;
        const descuentoDiaDeSemana = 0.2;
        let mejorDescuento = CERO;

        if (medioPago.getTipoDePago() === "Efectivo") {
            mejorDescuento = this.totalBruto * descuentoEfectivo;
        }

        if (this.fecha.getDay() === DiaSemana.MIERCOLES) {
            mejorDescuento = this.totalBruto * descuentoDiaDeSemana;
        }

        this.descuento = mejorDescuento;

        // Se implementará más adelante cuando desarrollemos
        // DescuentoEfectivo y DescuentoDiaEspecial
    }

    public calcularTotalFinal(): void {
        this.totalCobrado = this.totalBruto - this.descuento;
    }

    public getNumeroPedido(): number {
        return this.numeroPedido;
    }

    public getNombreCliente(): string {
        return this.nombreCliente;
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

}