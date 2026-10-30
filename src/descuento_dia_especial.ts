import Pedido from "./#pedido";
import Descuento from "./descuento";
import { DiaSemana } from "./dia_semana";
import MedioDePago from "./medio_de_pago";
export default class DescuentoDiaEspecial extends Descuento {
    private diaObjetivo: DiaSemana;
    private porcentaje: number;

    public constructor(diaObjetivo: DiaSemana, porcentaje: number) {
        super();
        this.diaObjetivo = diaObjetivo;
        this.porcentaje = porcentaje;
    }

    // Verifica que el descuento sea apto para ser aplicado
    public esAplicable(mediodepago: MedioDePago, dia: DiaSemana): boolean {
        return mediodepago.getTipoDePago() === "Descuento Dia Especial";
    }

    // Devuelve monto a descontar
    public calcularMontoDescuento(totalBruto: number): number {
        return totalBruto * (this.porcentaje / 100);
    }
}