import Descuento from "./descuento";
import DiaSemana from "../dia_semana";
import Pedido from "../pedidos/pedido";

export default class DescuentoEspecialDia implements Descuento {
    private diaDescuento: DiaSemana;
    private porcentajeDescuento: number;

    public constructor (diaElegido: DiaSemana, porcentajeIngresado: number) {
        this.diaDescuento = diaElegido;
        this.porcentajeDescuento = porcentajeIngresado;
    }

    public getPorcentaje(): number {
        return this.porcentajeDescuento;
    }

    public aplicable(pedido: Pedido): boolean {
        return pedido.getFecha().getDay() === this.diaDescuento;
    }
}