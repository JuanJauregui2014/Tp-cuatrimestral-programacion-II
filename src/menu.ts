import Categoria from "./categoria";
import Combo from "./combo";
import Producto from "./producto";

export default class Menu {

    private categorias:Categoria[];
    private combos: Combo[];
    private productos: Producto[];

    public constructor(categorias?: Categoria[], combos?: Combo[], productos?: Producto[]) {
        this.categorias = categorias ?? [];
        this.combos = combos ?? [];
        this.productos = productos ?? [];
    }

    public getCategorias(): Categoria[] {
        return this.categorias;
    }

    public getCombos(): Combo[] {
        return this.combos;
    }

    public getProductos(): Producto[] {
        return this.productos;
    }
    //elimine los set de categorias,
    // combos y productos ya que no se pueden cambiar una vez creado el menu, solo se pueden agregar nuevos elementos

    //metodos para agregar una nueva categoria, combo o producto al menu
    public agregarCategoria(categoria: Categoria): void {
        this.categorias.push(categoria);
    }
    public agregarCombo(combo: Combo): void {
        this.combos.push(combo);
    }
    public agregarProducto(producto: Producto): void {
        this.productos.push(producto);
    }
}