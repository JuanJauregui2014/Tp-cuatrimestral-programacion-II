import MedioDePago from "./medio_de_pago";
import Pedido from "./pedido";

export default interface Descuento {
    aplicable(pedido: Pedido): boolean;
    calcularMontoDescuento(pedido: Pedido): number;
}