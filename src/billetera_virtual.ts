import { MedioDePago } from "./medio_de_pago";
import { MetodoDePago } from "./metodo_de_pago";
export default class BilleteraVirtual implements MetodoDePago {
    public tipo: MedioDePago.BVIRTUAL;
    private alias: string;

    public constructor(alias: string, tipo: MedioDePago) {
        this.alias = alias;
        this.tipo = MedioDePago.BVIRTUAL;
    }

    procesarPago(monto: number): boolean {

        return true;
    }
}