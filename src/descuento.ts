import MedioDePago from "./medio_de_pago";
import Pedido from "./pedido";

export default interface Descuento {
    aplicable(pedido: Pedido, medioPago: MedioDePago): boolean;
    aplicarDescuento(pedido: Pedido, medioPago: MedioDePago): number;
}