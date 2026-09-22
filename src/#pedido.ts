import { EstadoPedido } from "./estado_pedido";
import { Item } from "./item"; //nos falta
import ElementoMenu from "./elemento_menu"; 
import MedioDePago from "./medio_de_pago"; 
import { DiaSemana } from "./dia_semana"; 

export default abstract class Pedido { // Abstracta porque no existe un pedido genérico

    protected numeroPedido: number; 
    protected nombreCliente: string; 
    protected fecha: Date; 
    protected estado: EstadoPedido; // Estado actual del pedido
    protected items: Item[]; // Lista de productos y combos agregados
    protected historialModificaciones: Item[]; // Funciona como pila para deshacer cambios

    constructor(
        numeroPedido: number,
        nombreCliente: string
    ) {
        this.numeroPedido = numeroPedido;
        this.nombreCliente = nombreCliente;
        this.fecha = new Date(); // Guarda fecha y hora actual
        this.estado = EstadoPedido.EN_CONSTRUCCION; // Todo pedido comenzaria así, para consultar en quitar item
        this.items = []; // Inicializa colección vacía
        this.historialModificaciones = []; // Inicializa historial vacío
    }

    public agregarItem(
        elemento: ElementoMenu,
        cantidad: number
    ): void {

        const item = new Item(cantidad, elemento); // Creo el item - (falta clase, la doy por hecho)

        this.items.push(item); // Agrega el item al pedido - esta bien usado el push??

        if (this.estado === EstadoPedido.EN_CONSTRUCCION) {
            this.historialModificaciones.push(item); // Guarda el cambio para poder deshacerlo - chequear
        }
    }

    public quitarItem(item: Item): void {

        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            return; // Solo se puede modificar antes de confirmar
        }

        this.items = this.items.filter(
            actual => actual !== item
        ); // Elimina el item recibido
    }

    public deshacerUltimaModificacion(): void {

        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            return; // Solo se puede deshacer antes de confirmar
        }

        const ultimo = this.historialModificaciones.pop(); // Obtiene la última modificación realizada

        if (ultimo) {
            this.items = this.items.filter(
                actual => actual !== ultimo
            ); // Elimina ese último item agregado
        }
    }

    public confirmarPedido(): void {
        this.estado = EstadoPedido.CONFIRMADO; // El pedido deja de ser editable
    }

    public puedeFacturarse(): boolean {

        return this.items.every(
            item => item.estaListo() //la funcion flecha esta bien escrita??
        );

        // Verifica que TODOS los items estén listos
        // every() devuelve true solamente si todos cumplen la condición?
    }

    public calcularTotalBruto(): number {

        return this.items.reduce(
            (total, item) => total + item.getSubtotal(),
            0
        );

        // Suma el subtotal de todos los items
        // Ejemplo: hamburguesa + bebida + postre
    }

    public aplicarDescuento(): number {
        return 0;

        // Se implementará más adelante cuando desarrollemos
        // DescuentoEfectivo y DescuentoDiaEspecial
    }

    public calcularTotalFinal(
        medioPago: MedioDePago,
        diaActual: DiaSemana
    ): number {

        const total = this.calcularTotalBruto(); // Obtiene el total sin descuento

        medioPago.procesarPago(total); // Procesa el pago seleccionado

        return total - this.aplicarDescuento(); // Devuelve total final
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
}