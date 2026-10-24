import MedioDePago from "./medio_de_pago";
export default class TarjetaDeCredito implements MedioDePago {
    private numeroTarjeta: number;
    private cuotas: number;
    private tipoDePago: string;

    public constructor(numeroTarjeta: number, cuotas: number, tipoDePago: string) {
        this.numeroTarjeta = numeroTarjeta;
        this.cuotas = cuotas;
        this.tipoDePago = "Tarjeta de credito"
    }

    public getTipoDePago(): string {
        return this.tipoDePago;
    }

    procesarPago(monto: number): void {
        console.log(`Monto a cobrar: ${monto} --- Tipo de pago: ${this.tipoDePago}`);
        console.log("---Pago procesado---");
    }
}