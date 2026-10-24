import MedioDePago from "./medio_de_pago";
export default class TarjetaDeCredito implements MedioDePago {
    private numeroTarjeta: number;
    private cuotas: number;

    public constructor(numeroTarjeta: number, cuotas: number){
        this.numeroTarjeta = numeroTarjeta;
        this.cuotas = cuotas;
    }

    public getTipoDePago(): string {
        return "TARJETA DE CREDITO";
    }

    procesarPago(monto: number): boolean {
        
        return true
    }
}