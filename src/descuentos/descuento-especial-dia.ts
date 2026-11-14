import Descuento from "./descuento";
import DiaSemana from "../dia_semana";
import Pedido from "../pedidos/pedido";

/**
 * Implementa un descuento condicionado al día de la semana en que se realizó el pedido.
 */
export default class DescuentoEspecialDia implements Descuento {
    private diaDescuento: DiaSemana;
    private porcentajeDescuento: number;

/**
 * Inicializa la instancia con los datos necesarios.
 * @param diaElegido - Parámetro de tipo DiaSemana utilizado por la operación.
 * @param porcentajeIngresado - Parámetro de tipo number utilizado por la operación.
 */
    public constructor (diaElegido: DiaSemana, porcentajeIngresado: number) {
        this.diaDescuento = diaElegido;
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
        return pedido.getFecha().getDay() === this.diaDescuento;
    }
}