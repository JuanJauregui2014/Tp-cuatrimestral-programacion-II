import { MedioDePago } from "./medio_de_pago";
import { MetodoDePago } from "./metodo_de_pago";
export default class TarjetaDeDebito implements MetodoDePago {
    public tipo: MedioDePago.DEBITO;
    private numeroTarjeta: number;

    public constructor(numeroTarjeta: number, tipo: MedioDePago) {
        this.numeroTarjeta = numeroTarjeta;
        this.tipo = MedioDePago.DEBITO;
    }

    procesarPago(monto: number): boolean {
        
        return true;
    }
}