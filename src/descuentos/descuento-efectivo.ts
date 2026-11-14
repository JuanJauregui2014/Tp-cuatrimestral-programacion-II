import Descuento from "./descuento";
import Pedido from "../pedidos/pedido";

/**
 * Implementa un descuento condicionado a que el pedido se abone en efectivo.
 */
export default class DescuentoEfectivo implements Descuento {
    private efectivo: string;
    private porcentajeDescuento: number;

/**
 * Inicializa la instancia con los datos necesarios.
 * @param porcentajeIngresado - Parámetro de tipo number utilizado por la operación.
 */
    public constructor (porcentajeIngresado: number) {
        this.efectivo = "Efectivo";
        this.porcentajeDescuento = porcentajeIngresado;
    }

/**
 * Devuelve porcentaje.
 * @returns number con el resultado de la operación.
 */
    public getPorcentaje(): number {
        return this.porcentajeDescuento;
    }

/**
 * Indica si el descuento puede aplicarse al pedido recibido.
 * @param pedido - Parámetro de tipo Pedido utilizado por la operación.
 * @returns boolean con el resultado de la operación.
 */
    public aplicable(pedido: Pedido): boolean {
        return pedido.getMedioDePago().getTipoDePago() === this.efectivo;
    }
}