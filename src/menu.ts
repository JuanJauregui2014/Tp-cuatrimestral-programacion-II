import Categoria from "./categoria";
import Combo from "./combo";
import Producto from "./producto";

export default class Menu {

    private categorias: Map<string, Categoria>;
    private combos: Map<string, Combo>;
    private productos: Map<string, Producto>;

    constructor(categorias?: Map<string, Categoria>, combos?: Map<string, Combo>, productos?: Map<string, Producto>) {
        this.categorias = categorias ?? new Map();
        this.combos = combos ?? new Map();
        this.productos = productos ?? new Map();
    }

    public getCategorias(): Map<string, Categoria> {
        return this.categorias;
    }

    public getCombos(): Map<string, Combo> {
        return this.combos;
    }

    public getProductos(): Map<string, Producto> {
        return this.productos;
    }

    public setCategorias(categorias: Map<string, Categoria>): void {
        this.categorias = categorias;
    }

    public setCombos(combos: Map<string, Combo>): void {
        this.combos = combos;
    }

    public setProductos(productos: Map<string, Producto>): void {
        this.productos = productos;
    }

}