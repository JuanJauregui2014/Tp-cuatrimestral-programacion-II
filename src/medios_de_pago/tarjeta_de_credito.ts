import MedioDePago from "./medio_de_pago";
export default class TarjetaDeCredito implements MedioDePago {
    private numeroTarjeta: number;
    private cuotas: number;
    private tipoDePago: string;

    public constructor(numeroTarjeta: number, cuotas: number) {
        this.numeroTarjeta = numeroTarjeta;
        this.cuotas = cuotas;
        this.tipoDePago = "Tarjeta de credito";
    }

    public getNumeroTarjeta(): number {
        return this.numeroTarjeta;
    }

    public getCuotas(): number {
        return this.cuotas;
    }

    public getTipoDePago(): string {
        return this.tipoDePago;
    }

    public setNumeroTarjeta(numeroNuevo: number): void {
        this.numeroTarjeta = numeroNuevo;
    }

    public setCuotas(numeroNuevo: number): void {
        this.cuotas = numeroNuevo;
    }

    public procesarPago(monto: number): void {
        console.log(`Monto a cobrar: ${monto} --- Tipo de pago: ${this.tipoDePago}`);
        console.log("---Pago procesado---");
    }
}