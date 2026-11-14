import Pedido from "../pedidos/pedido";

/**
 * Define el contrato común de los descuentos aplicables a un pedido.
 */
export default interface Descuento {
    aplicable(pedido: Pedido): boolean;
    getPorcentaje(): number;
}