import MedioDePago from "./medio_de_pago";
export default class BilleteraVirtual implements MedioDePago {
    private alias: string;
    private tipoDePago: string;

    public constructor(alias: string) {
        this.alias = alias;
        this.tipoDePago = "Billetera Virtual";
    }

    public getAlias(): string {
        return this.alias;
    }

    public getTipoDePago(): string {
        return this.tipoDePago;
    }

    public setAlias(alias: string): void {
        this.alias = alias;
    }

    public procesarPago(monto: number): void {
        console.log(`Monto a cobrar: ${monto} --- Tipo de pago: ${this.tipoDePago}`);
        console.log("---Pago procesado---");
    }
}