import Pedido from "../pedidos/pedido";

export default interface Descuento {
    aplicable(pedido: Pedido): boolean;
    getPorcentaje(): number;
}