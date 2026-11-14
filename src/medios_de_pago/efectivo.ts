import MedioDePago from "./medio_de_pago";
/**
 * Class Efectivo, utilizada en la gestión del restaurante.
 */
export default class Efectivo implements MedioDePago {
    private tipoDePago: string;
    
/**
 * Inicializa la instancia con los datos necesarios.
 */
    public constructor() {
        this.tipoDePago = "Efectivo";
    }

/**
 * Devuelve tipodepago.
 * @returns string con el resultado de la operación.
 */
    public getTipoDePago(): string {
        return this.tipoDePago;
    }

/**
 * Procesa el pago por el monto indicado.
 * @param monto - Parámetro de tipo number utilizado por la operación.
 */
    public procesarPago(monto: number): void {
        console.log(`Monto a cobrar: ${monto} --- Tipo de pago: ${this.tipoDePago}`);
        console.log("---Pago procesado---");
    }
}