/**
 * Define las operaciones comunes de los medios de pago admitidos por el restaurante.
 */
export default interface MedioDePago {
    procesarPago(monto: number): void;
    getTipoDePago(): string;
}