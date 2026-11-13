import MedioDePago from "./medio_de_pago";
/**
 * Class BilleteraVirtual, utilizada en la gestión del restaurante.
 */
export default class BilleteraVirtual implements MedioDePago {
    private alias: string;
    private tipoDePago: string;

/**
 * Inicializa la instancia con los datos necesarios.
 * @param alias - Parámetro de tipo string utilizado por la operación.
 */
    public constructor(alias: string) {
        this.alias = alias;
        this.tipoDePago = "Billetera Virtual";
    }

/**
 * Devuelve alias.
 * @returns string con el resultado de la operación.
 */
    public getAlias(): string {
        return this.alias;
    }

/**
 * Devuelve tipodepago.
 * @returns string con el resultado de la operación.
 */
    public getTipoDePago(): string {
        return this.tipoDePago;
    }

/**
 * Actualiza alias.
 * @param alias - Parámetro de tipo string utilizado por la operación.
 */
    public setAlias(alias: string): void {
        this.alias = alias;
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