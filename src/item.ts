import ElementoMenu from "./elemento_menu";
import EstadoItem from "./estado_item";
export default class Item {
    private cantidad: number;
    private estado: EstadoItem = EstadoItem.PENDIENTE; // Estado inicial del item
    private elemento: ElementoMenu; // representa el elemento del menu

    public constructor(cantidad: number, elemento: ElementoMenu) {
        this.cantidad = cantidad;
        this.elemento = elemento;
    }

    public getCantidad(): number {
        return this.cantidad;
    }

    public getEstado(): EstadoItem {
        return this.estado;
    }
   

    public getElemento(): ElementoMenu {
        return this.elemento;
    }

    public setCantidad(cantidad: number): void {
        //aca manejamos el error de que no se pueda modificar la cantidad de un item que no esta pendiente
        if (!this.esModificable()) {
            throw new Error("No se puede modificar la cantidad de un item que no está pendiente.");
        }
        this.cantidad = cantidad;
    }

    public setElemento(elemento: ElementoMenu): void {
        //aca manejamos el error de que no se pueda modificar el elemento de un item que no esta pendiente
        if (!this.esModificable()) {
            throw new Error("No se puede modificar el elemento de un item que no está pendiente.");
        }
        this.elemento = elemento;
    }

    public avanzarEstado(): void {
        if (this.estado === EstadoItem.PENDIENTE) {
            this.estado = EstadoItem.EN_PREPARACION;
        } else if (this.estado === EstadoItem.EN_PREPARACION) {
            this.estado = EstadoItem.LISTO;
        }
    }
    public esModificable(): boolean {
        return this.estado === EstadoItem.PENDIENTE;
    }
}

