/**
 * Representa una categoría a la que pueden pertenecer los productos del menú.
 */
export default class Categoria {
    private nombre: string;
/**
 * Inicializa la instancia con los datos necesarios.
 * @param nombre - Parámetro de tipo string utilizado por la operación.
 */
    public constructor(nombre: string) {
        this.nombre = nombre;
    }

/**
 * Devuelve nombre.
 * @returns string con el resultado de la operación.
 */
    public getNombre(): string {
        return this.nombre;
    }

/**
 * Actualiza nombre.
 * @param nombre - Parámetro de tipo string utilizado por la operación.
 */
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }
}