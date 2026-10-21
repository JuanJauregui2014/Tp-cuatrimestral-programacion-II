import { MetodoDePago } from "./metodo_de_pago";
import { MedioDePago } from "./medio_de_pago";
export default class TarjetaDeCredito implements MetodoDePago {
    public tipo: MedioDePago.CREDITO;
    private numeroTarjeta: number;
    private cuotas: number;

    public constructor(numeroTarjeta: number, cuotas: number, tipo: MedioDePago){
        this.numeroTarjeta = numeroTarjeta;
        this.cuotas = cuotas;
        this.tipo = MedioDePago.CREDITO;
    }

    procesarPago(monto: number): boolean {
        
        return true
    }
}