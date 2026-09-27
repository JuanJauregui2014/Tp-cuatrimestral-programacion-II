import ElementoMenu from "./elemento_menu";

export class Item {
    private cantidad: number;
    private estado: EstadoItem;
    private elemento: ElementoMenu; // representa el elemento del menu

    constructor(cantidad: number, elemento: ElementoMenu) {
        this.cantidad = cantidad;
        this.elemento = elemento;
        this.estado = EstadoItem.PENDIENTE;
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
        this.cantidad = cantidad;
    }

    public setEstado(estado: EstadoItem): void {
        this.estado = estado;
    }

    public setElemento(elemento: ElementoMenu): void {
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

enum EstadoItem {
    PENDIENTE,
    EN_PREPARACION,
    LISTO
}