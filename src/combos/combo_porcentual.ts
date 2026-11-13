import ComboBeneficio from "./combo_beneficio";
/**
 * Class ComboPorcentual, utilizada en la gestión del restaurante.
 */
export default class ComboPorcentual implements ComboBeneficio {
    private porcentajeDescuento: number;

/**
 * Inicializa la instancia con los datos necesarios.
 * @param porcentajeDescuento - Parámetro de tipo number utilizado por la operación.
 */
    public constructor(porcentajeDescuento: number) {
        this.porcentajeDescuento = porcentajeDescuento;
    }

/**
 * Aplica el beneficio correspondiente al importe recibido.
 * @param precioBase - Parámetro de tipo number utilizado por la operación.
 * @returns number con el resultado de la operación.
 */
    public aplicarBeneficio(precioBase: number): number {
        return precioBase - (precioBase * this.porcentajeDescuento);
    }
/**
 * Devuelve porcentajedescuento.
 * @returns number con el resultado de la operación.
 */
    public getPorcentajeDescuento(): number
    { return this.porcentajeDescuento; }

/**
 * Actualiza porcentajedescuento.
 * @param porcentajeDescuento - Parámetro de tipo number utilizado por la operación.
 */
    public setPorcentajeDescuento(porcentajeDescuento: number): void
     { this.porcentajeDescuento = porcentajeDescuento; }
}