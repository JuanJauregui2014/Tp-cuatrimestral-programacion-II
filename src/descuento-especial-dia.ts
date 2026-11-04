import Descuento from "./descuento";
import { DiaSemana } from "./dia_semana";
import Pedido from "./pedido";

export default class DescuentoEspecialDia implements Descuento {
    private diaDescuento: DiaSemana;
    private porcentajeDescuento: number;

    public constructor () {
        this.diaDescuento = DiaSemana.MIERCOLES;
        this.porcentajeDescuento = 0.2;
    }

    public aplicable(pedido: Pedido): boolean {
        return pedido.getFecha().getDay() === this.diaDescuento;
    }
    public calcularMontoDescuento(pedido: Pedido): number {
        return pedido.getTotalBruto() * this.porcentajeDescuento;
    }
}