import Descuento from "./descuento";
import { DiaSemana } from "./dia_semana";
import MedioDePago from "./medio_de_pago";
import Pedido from "./pedido";

export default class DescuentoEspecialDia implements Descuento {
    private diaDescuento: DiaSemana;
    private porcentajeDescuento: number;

    public constructor () {
        this.diaDescuento = DiaSemana.MIERCOLES;
        this.porcentajeDescuento = 0.2;
    }

    public aplicable(pedido: Pedido, medioPago: MedioDePago): boolean {
        return pedido.getFecha().getDay() === this.diaDescuento;
    }
    public calcularMontoDescuento(pedido: Pedido, medioPago: MedioDePago): number {
        return pedido.getTotalBruto() * this.porcentajeDescuento;
    }
}