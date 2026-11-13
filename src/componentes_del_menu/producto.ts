import Categoria from "./categoria";
import ElementoMenu from "./elemento_menu";

/**
 * Representa un producto individual ofrecido en el menú.
 */
export default class Producto implements ElementoMenu {
    private nombre: string;
    private precioDeVenta: number;
    private categoria: Categoria;

/**
 * Inicializa la instancia con los datos necesarios.
 * @param nombre - Parámetro de tipo string utilizado por la operación.
 * @param precioDeVenta - Parámetro de tipo number utilizado por la operación.
 * @param categoria - Parámetro de tipo Categoria utilizado por la operación.
 */
    public constructor(nombre: string, precioDeVenta: number, categoria: Categoria) {
        this.nombre = nombre;
        this.precioDeVenta = precioDeVenta;
        this.categoria = categoria;
    }

/**
 * Devuelve precio.
 * @returns number con el resultado de la operación.
 */
    public getPrecio(): number {
        return this.precioDeVenta;
    }

/**
 * Devuelve nombre.
 * @returns string con el resultado de la operación.
 */
    public getNombre(): string {
        return this.nombre;
    }

/**
 * Devuelve categoria.
 * @returns Categoria con el resultado de la operación.
 */
    public getCategoria(): Categoria {
        return this.categoria;
    }
}