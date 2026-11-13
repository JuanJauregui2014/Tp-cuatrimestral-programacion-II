import ElementoMenu from "./elemento_menu";
import Producto from "./producto";
import ComboBeneficio from "../combos/combo_beneficio";

/**
 * Representa una combinación de productos y el beneficio aplicado sobre su precio.
 */
export default class Combo implements ElementoMenu {
    private nombre: string;
    private productos: ReadonlyArray<Producto>;
    private beneficio: ComboBeneficio;

/**
 * Inicializa la instancia con los datos necesarios.
 * @param nombre - Parámetro de tipo string utilizado por la operación.
 * @param productos - Parámetro de tipo Producto[] utilizado por la operación.
 * @param beneficio - Parámetro de tipo ComboBeneficio utilizado por la operación.
 */
    public constructor(nombre: string, productos: Producto[], beneficio: ComboBeneficio) {
        this.nombre = nombre;
        this.productos = productos;
        this.beneficio = beneficio;
    }
    /* cree esto xq me tiraba error de numero magicoo,sino ponia el 0,
    total es la alcancia donde se suman los valores,producto producto el elemento que se lee
    y total + producto.getPrecio() agarra la alcancia y se lo suma al precio del producto
    y bueno despues le aplicamos el beneficio */
/**
 * Devuelve precio.
 * @returns number con el resultado de la operación.
 */
    public getPrecio(): number {
        const valorInicialAcumulador = 0;
        const precioTotal = this.productos.reduce(
            (total, producto) => total + producto.getPrecio(),
            valorInicialAcumulador
        );
        return this.beneficio.aplicarBeneficio(precioTotal);
    }
/**
 * Devuelve nombre.
 * @returns string con el resultado de la operación.
 */
    public getNombre(): string {
        return this.nombre;
    }
/**
 * Devuelve productos.
 * @returns ReadonlyArray<Producto> con el resultado de la operación.
 */
    public getProductos(): ReadonlyArray<Producto> { return this.productos; }
/**
 * Devuelve beneficio.
 * @returns ComboBeneficio con el resultado de la operación.
 */
    public getBeneficio(): ComboBeneficio { return this.beneficio; }
}