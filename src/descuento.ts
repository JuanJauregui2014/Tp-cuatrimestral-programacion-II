import Pedido from "./#pedido";
import { DiaSemana } from "./dia_semana";
import MedioDePago from "./medio_de_pago";
export default abstract class Descuento {

    public abstract esAplicable(MedioDePago: MedioDePago, dia: DiaSemana): boolean; 
    
    // total = precio bruto, sin descuento. logica a revisar.
    public abstract calcularMontoDescuento(total: number): number;
}