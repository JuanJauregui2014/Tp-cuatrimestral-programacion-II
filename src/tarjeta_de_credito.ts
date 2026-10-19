import MedioDePago from "./medio_de_pago";
export default class TarjetaDeCredito implements MedioDePago {
    private numeroTarjeta: number;
    private cuotas: number;

    public constructor(numeroTarjeta: number, cuotas: number){
        this.numeroTarjeta = numeroTarjeta;
        this.cuotas = cuotas;
    }

    procesarPago(monto: number): boolean {
        
        return true;
    }
}