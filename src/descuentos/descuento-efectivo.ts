import Descuento from "./descuento";
import Pedido from "../pedidos/pedido";

export default class DescuentoEfectivo implements Descuento {
    private efectivo: string;
    private porcentajeDescuento: number;

    public constructor () {
        this.efectivo = "Efectivo";
        this.porcentajeDescuento = 0.1;
    }

    public aplicable(pedido: Pedido): boolean {
        return pedido.getMedioDePago().getTipoDePago() === this.efectivo;
    }
    public calcularMontoDescuento(pedido: Pedido): number {
        return pedido.getTotalBruto() * this.porcentajeDescuento;
    }
}