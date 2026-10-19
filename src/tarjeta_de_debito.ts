import MedioDePago from "./medio_de_pago";
export default class TarjetaDeDebito implements MedioDePago {
    private numeroTarjeta: number;

    public constructor(numeroTarjeta: number) {
        this.numeroTarjeta = numeroTarjeta;
    }

    procesarPago(monto: number): boolean {
        
        return true;
    }
}