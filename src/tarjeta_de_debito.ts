import MedioDePago from "./medio_de_pago";
export default class TarjetaDeDebito implements MedioDePago {
    private numeroTarjeta: number;
    private tipoDePago: string;

    public constructor(numeroTarjeta: number, tipoDePago: string) {
        this.numeroTarjeta = numeroTarjeta;
        this.tipoDePago = "Tarjeta de debito"
    }

    public getTipoDePago(): string {
        return this.tipoDePago;
    }
    procesarPago(monto: number): void {
        console.log(`Monto a cobrar: ${monto} --- Tipo de pago: ${this.tipoDePago}`);
        console.log("---Pago procesado---");
    }
}