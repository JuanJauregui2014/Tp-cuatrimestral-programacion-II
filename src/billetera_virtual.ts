import MedioDePago from "./medio_de_pago"
export default class BilleteraVirtual implements MedioDePago {
    private alias: string;

    public constructor(alias: string) {
        this.alias = alias;
    }

    procesarPago(monto: number): boolean {

        return true;
    }
}