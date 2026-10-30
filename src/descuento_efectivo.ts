import Pedido from "./#pedido";
import Descuento from "./descuento";
import { DiaSemana } from "./dia_semana";
import MedioDePago from "./medio_de_pago";
export default class DescuentoEfectivo extends Descuento {
    private porcentaje: number;

    public constructor(porcentaje: number) {
        super();
        this.porcentaje = porcentaje;
    }

    // Verifica que el descuento sea apto para ser aplicado
    public esAplicable(MedioDePago: MedioDePago, dia: DiaSemana): boolean {
        return MedioDePago.getTipoDePago() === "Efectivo";
    }

    // Devuelve monto a descontar
    public calcularMontoDescuento(totalBruto: number): number {
        return totalBruto * (1 - this.porcentaje / 100);
    }
}