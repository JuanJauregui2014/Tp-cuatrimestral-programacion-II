import MedioDePago from "./medio_de_pago";
/**
 * Class TarjetaDeDebito, utilizada en la gestión del restaurante.
 */
export default class TarjetaDeDebito implements MedioDePago {
    private numeroTarjeta: number;
    private tipoDePago: string;

/**
 * Inicializa la instancia con los datos necesarios.
 * @param numeroTarjeta - Parámetro de tipo number utilizado por la operación.
 */
    public constructor(numeroTarjeta: number) {
        this.numeroTarjeta = numeroTarjeta;
        this.tipoDePago = "Tarjeta de debito";
    }

/**
 * Devuelve numerotarjeta.
 * @returns number con el resultado de la operación.
 */
    public getNumeroTarjeta(): number {
        return this.numeroTarjeta;
    }

/**
 * Devuelve tipodepago.
 * @returns string con el resultado de la operación.
 */
    public getTipoDePago(): string {
        return this.tipoDePago;
    }

/**
 * Actualiza numerotarjeta.
 * @param numeroNuevo - Parámetro de tipo number utilizado por la operación.
 */
    public setNumeroTarjeta(numeroNuevo: number): void {
        this.numeroTarjeta = numeroNuevo;
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