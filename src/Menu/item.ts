import { ElementoMenu } from "./elemento-menu";

export class Item {
    private cantidad: number;
    private estado: EstadoItem;
    private elemento: ElementoMenu; // representa el elemento del menu

    constructor(cantidad: number, elemento: ElementoMenu) {
        this.cantidad = cantidad;
        this.elemento = elemento;
        this.estado = EstadoItem.PENDIENTE;
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