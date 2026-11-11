import Descuento from "./descuento";
import Pedido from "../pedidos/pedido";

export default class DescuentoEfectivo implements Descuento {
    private efectivo: string;
    private porcentajeDescuento: number;

    public constructor (porcentajeIngresado: number) {
        this.efectivo = "Efectivo";
        this.porcentajeDescuento = porcentajeIngresado;
    }

    public getPorcentaje(): number {
        return this.porcentajeDescuento;
    }

    public aplicable(pedido: Pedido): boolean {
        return pedido.getMedioDePago().getTipoDePago() === this.efectivo;
    }
}