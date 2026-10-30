import { EstadoPedido } from "./estado_pedido";
import Item from "./item";
import MedioDePago from "./medio_de_pago";
import { DiaSemana } from "./dia_semana";
import EstadoItem from "./estado_item";

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

        this.posicionesDeEliminaciones.push(this.historialAgregaciones.findIndex(actual => actual === item));
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

        const ultimaEliminacion = this.historialEliminaciones.pop(); 
        // Obtengo la última eliminación realizada
        const posicionDeUltimaEliminacion = this.posicionesDeEliminaciones.pop();
        // Obtengo la posicion de la última eliminación realizada

        const parametroParaInsertar = 0; //Este parámetro "0" le indica al método splice que solo debe insertar el dato

        if (ultimaEliminacion && posicionDeUltimaEliminacion) {
            this.items.splice(posicionDeUltimaEliminacion, parametroParaInsertar, ultimaEliminacion);
            // Agrega nuevamente ese último item eliminado en la posición exacta en la que estaba
            this.historialAgregaciones.splice(posicionDeUltimaEliminacion, parametroParaInsertar, ultimaEliminacion);
            // Se agrega al historial de agregaciones, porque se entiende que se volvió a agregar el item, en la 
            // posicion exacta en la que estaba
        }

    }

    public deshacerAgregacion(): void {

        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error(
                "Pedido no se encuentra en construcción. No se puede deshacer las modificaciones"
            ); // Solo se puede deshacer una modificacion antes de confirmar el pedido
        }

        const ultimaAgregacion = this.historialAgregaciones.pop(); // Obtiene la última agregación realizada

        if (ultimaAgregacion) {
            this.items = this.items.filter(actual => actual !== ultimaAgregacion);
            // Elimina ese último item agregado
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
            (total, item) => total + (item.getElemento().getPrecio() * item.getCantidad()), CERO
        );
        // Suma el subtotal de todos los items con sus respectivas cantidades
        // Ejemplo: (hamburguesa * cantHamburguesas) + (bebida * cantBebida) + etc...

        this.totalBruto += this.costoEnvio;
        //Sumo al subtotal el costo de envío.
        //Dependiendo el tipo de pedido, se sumará el envío cargado o quedará igual.

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

}