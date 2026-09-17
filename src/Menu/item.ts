export class Item {
    private cantidad: number;
    private estado: estadoItem;

    constructor(cantidad: number, estado: estadoItem) {
        this.cantidad = cantidad;
        this.estado = estadoItem.PENDIENTE;
    }

    public avanzarEstado(): void {
        if (this.estado === estadoItem.PENDIENTE) {
            this.estado = estadoItem.EN_PREPARACION;
        } else if (this.estado === estadoItem.EN_PREPARACION) {
            this.estado = estadoItem.LISTO;
        }
    }
    public esModificable(): boolean {
        return this.estado === estadoItem.PENDIENTE;
    }
}

enum estadoItem {
    PENDIENTE,
    EN_PREPARACION,
    LISTO
}