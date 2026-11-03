import Descuento from "./descuento";
import MedioDePago from "./medio_de_pago";
import Pedido from "./pedido";

export default class DescuentoEfectivo implements Descuento {
    private efectivo: string;
    private porcentajeDescuento: number;

    public constructor () {
        this.efectivo = "Efectivo";
        this.porcentajeDescuento = 0.1;
    }

    public aplicable(pedido: Pedido, medioPago: MedioDePago): boolean {
        return medioPago.getTipoDePago() === this.efectivo;
    }
    public aplicarDescuento(pedido: Pedido, medioPago: MedioDePago): number {
        return pedido.getTotalBruto() * this.porcentajeDescuento;
    }
}