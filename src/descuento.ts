import MedioDePago from "./medio_de_pago";
import Pedido from "./pedido";

export default interface Descuento {
    aplicable(pedido: Pedido, medioPago: MedioDePago): boolean;
    calcularMontoDescuento(pedido: Pedido, medioPago: MedioDePago): number;
}