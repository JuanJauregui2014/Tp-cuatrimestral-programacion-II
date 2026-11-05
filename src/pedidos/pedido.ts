import EstadoPedido from "./estado_pedido";
import Item from "../items/item";
import MedioDePago from "../medios_de_pago/medio_de_pago";
import EstadoItem from "../items/estado_item";
import Descuento from "../descuentos/descuento";
import Efectivo from "../medios_de_pago/efectivo";

const CERO = 0;

export default abstract class Pedido { // Abstracta porque no existe un pedido genérico

    private numeroPedido: number;
    private nombreCliente: string;
    private costoEnvio: number;
    private fecha: Date;
    private estado: EstadoPedido; // Estado actual del pedido
    private items: Item[]; // Lista de productos y combos agregados
    private historialAgregaciones: Item[]; // Funciona como pila para deshacer cambios
    private historialEliminaciones: Item[];
    private posicionesDeEliminaciones: number[]
    private totalBruto: number;
    private descuento: number;
    private totalCobrado: number;
    private medioPagoElegido: MedioDePago;


    public constructor(numeroPedido: number, nombreCliente: string, costoEnvio: number) {
        this.numeroPedido = numeroPedido;
        this.nombreCliente = nombreCliente;
        this.costoEnvio = costoEnvio;
        this.fecha = new Date(); // Guarda fecha y hora actual
        this.estado = EstadoPedido.EN_CONSTRUCCION; // Todo pedido comenzaria así, para consultar en quitar item
        this.items = []; // Inicializa colección vacía
        this.historialAgregaciones = []; // Inicializa historial vacío
        this.historialEliminaciones = []; // Inicializa historial vacío
        this.posicionesDeEliminaciones = []; // Inicializa vacío
        this.totalBruto = CERO;
        this.descuento = CERO;
        this.totalCobrado = CERO;
        this.medioPagoElegido = new Efectivo(); //Al crear un pedido nuevo, el medio de pago predeterminado es efectivo
    }

    public agregarItem(item: Item): void {

        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error("Pedido no se encuentra en construcción. No se puede agregar el item");
        }

        this.items.push(item); // Agrega el item al pedido

        this.historialAgregaciones.push(item); // Guarda el cambio para poder deshacerlo

    }

    public quitarItem(item: Item): void {

        if (item.getEstado() !== EstadoItem.PENDIENTE) {
            throw new Error(
                "Item ya pasó a preparación. No se puede modificar"
            ); // Solo se puede modificar o quitar un item antes de que esté en preparación
        }

        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error(
                "Pedido no se encuentra en construcción. No se puede eliminar el item"
            ); // Solo se puede modificar o quitar un item antes de confirmar el pedido
        }

        this.historialEliminaciones.push(item); // Lo agrega al historia lde eliminaciones

        this.posicionesDeEliminaciones.push(this.items.findIndex(actual => actual === item));
        // Guarda la posicion en la que estaba el item por si se deshace la eliminación

        this.items = this.items.filter(actual => actual !== item); // Elimina el item recibido

        this.historialAgregaciones = this.historialAgregaciones.filter(actual => actual !== item);
        // Elimina el item del historial de agregaciones
    }

    public deshacerEliminacion(): void {

        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error(
                "Pedido no se encuentra en construcción. No se puede deshacer las modificaciones"
            ); // Solo se puede deshacer una modificacion antes de confirmar el pedido
        }

        const listaVacia = 0;
        if (this.historialEliminaciones.length === listaVacia || this.posicionesDeEliminaciones.length === listaVacia) {
            throw new Error("No se realizo ninguna modificación para deshacer");
        }

        const ultimaEliminacion = this.historialEliminaciones.pop()!;
        // Obtengo la última eliminación realizada
        const posicionUltimaEliminacion = this.posicionesDeEliminaciones.pop()!;
        // Obtengo la posicion de la última eliminación realizada

        const parametroParaInsertar = 0; //Este parámetro "0" le indica al método splice que solo debe insertar el dato

        this.items.splice(posicionUltimaEliminacion, parametroParaInsertar, ultimaEliminacion);
        // Agrega nuevamente ese último item eliminado en la posición exacta en la que estaba
        this.historialAgregaciones.splice(posicionUltimaEliminacion, parametroParaInsertar, ultimaEliminacion);
        // Se agrega al historial de agregaciones, porque se entiende que se volvió a agregar el item, en la 
        // posicion exacta en la que estaba

    }

    public deshacerAgregacion(): void {

        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error(
                "Pedido no se encuentra en construcción. No se puede deshacer las modificaciones"
            ); // Solo se puede deshacer una modificacion antes de confirmar el pedido
        }

        const listaVacia = 0;
        if (this.historialAgregaciones.length === listaVacia) {
            throw new Error("No se realizo ninguna modificación para deshacer");
        }

        const ultimaAgregacion = this.historialAgregaciones.pop(); // Obtiene la última agregación realizada

        this.items = this.items.filter(actual => actual !== ultimaAgregacion);
        // Elimina ese último item agregado
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
        //Sumo al subtotal el costo de envío.
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

    public getHistorialAgregaciones(): Item[] {
        return this.historialAgregaciones;
    }

    public getHistorialEliminaciones(): Item[] {
        return this.historialEliminaciones;
    }

    public getPosicionesDeEliminaciones(): number[] {
        return this.posicionesDeEliminaciones;
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