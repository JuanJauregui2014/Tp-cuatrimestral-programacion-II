import MedioDePago from "./medio_de_pago";

export default class Efectivo implements MedioDePago {

    private tipoDePago: string;

    constructor() {
        this.tipoDePago = "Efectivo";
    }

    public getTipoDePago(): string {
        return this.tipoDePago;
    }

    public procesarPago(monto: number): void {
        console.log(`Monto a cobrar: ${monto} --- Tipo de pago: ${this.tipoDePago}`);
        console.log("---Pago procesado---");
    }

}