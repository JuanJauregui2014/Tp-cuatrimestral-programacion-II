import { MedioDePago } from "./medio_de_pago";
export interface MetodoDePago {
    tipo: MedioDePago;
    procesarPago(monto: number): boolean
}