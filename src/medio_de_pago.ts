
export default interface MedioDePago {
    procesarPago(monto: number): boolean;
}