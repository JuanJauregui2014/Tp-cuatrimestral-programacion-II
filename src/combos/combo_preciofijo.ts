import ComboBeneficio from "./combo_beneficio";
/**
 * Class ComboPrecioFijo, utilizada en la gestión del restaurante.
 */
export default class ComboPrecioFijo implements ComboBeneficio {
    private precioFijo: number;
/**
 * Inicializa la instancia con los datos necesarios.
 * @param precioFijo - Parámetro de tipo number utilizado por la operación.
 */
    public constructor(precioFijo: number) {
        this.precioFijo = precioFijo;
    }
/**
 * Aplica el beneficio correspondiente al importe recibido.
 * @param _precioBase - Parámetro de tipo number.
 * @returns number con el resultado de la operación.
 */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public aplicarBeneficio(_precioBase: number): number {
        return this.precioFijo;
    }
/**
 * Devuelve preciofijo.
 * @returns number con el resultado de la operación.
 */
    public getPrecioFijo(): number {
        return this.precioFijo;
    }
/**
 * Actualiza preciofijo.
 * @param precioFijo - Parámetro de tipo number utilizado por la operación.
 */
    public setPrecioFijo(precioFijo: number): void {
        this.precioFijo = precioFijo;
    }
}