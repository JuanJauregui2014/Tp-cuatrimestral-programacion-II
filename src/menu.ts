import Categoria from "./componentes_del_menu/categoria";
import Combo from "./componentes_del_menu/combo";
import Producto from "./componentes_del_menu/producto";

/**
 * Administra las categorías, los productos y los combos disponibles en el menú.
 */
export default class Menu {

    private categorias:Categoria[];
    private combos: Combo[];
    private productos: Producto[];

/**
 * Inicializa la instancia con los datos necesarios.
 * @param categorias - Parámetro de tipo Categoria[] utilizado por la operación.
 * @param combos - Parámetro de tipo Combo[] utilizado por la operación.
 * @param productos - Parámetro de tipo Producto[] utilizado por la operación.
 */
    public constructor(categorias?: Categoria[], combos?: Combo[], productos?: Producto[]) {
        this.categorias = categorias ?? [];
        this.combos = combos ?? [];
        this.productos = productos ?? [];
    }

/**
 * Devuelve categorias.
 * @returns Categoria[] con el resultado de la operación.
 */
    public getCategorias(): Categoria[] {
        return this.categorias;
    }

/**
 * Devuelve combos.
 * @returns Combo[] con el resultado de la operación.
 */
    public getCombos(): Combo[] {
        return this.combos;
    }

/**
 * Devuelve productos.
 * @returns Producto[] con el resultado de la operación.
 */
    public getProductos(): Producto[] {
        return this.productos;
    }
    //elimine los set de categorias,
    // combos y productos ya que no se pueden cambiar una vez creado el menu, solo se pueden agregar nuevos elementos

    //metodos para agregar una nueva categoria, combo o producto al menu
/**
 * Realiza la operación agregarCategoria dentro del modelo del restaurante.
 * @param categoria - Parámetro de tipo Categoria utilizado por la operación.
 */
    public agregarCategoria(categoria: Categoria): void {
        this.categorias.push(categoria);
    }
/**
 * Realiza la operación agregarCombo dentro del modelo del restaurante.
 * @param combo - Parámetro de tipo Combo utilizado por la operación.
 */
    public agregarCombo(combo: Combo): void {
        this.combos.push(combo);
    }
/**
 * Realiza la operación agregarProducto dentro del modelo del restaurante.
 * @param producto - Parámetro de tipo Producto utilizado por la operación.
 */
    public agregarProducto(producto: Producto): void {
        this.productos.push(producto);
    }
}