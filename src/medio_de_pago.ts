
export default interface MedioDePago {
    procesarPago(monto: number): void;
    getTipoDePago(): string;
}