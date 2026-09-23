import Categoria from "./categoria";
import Combo from "./combo";
import Producto from "./producto";

export default class Menu {

    private categorias: Categoria[];
    private combos: Combo[];
    private productos: Producto[];

    constructor(categorias?: Categoria[], combos?: Combo[], productos?: Producto[]) {
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

    public setCategorias(pCategorias: Categoria[]): void {
        this.categorias = pCategorias;
    }

    public setCombos(pCombos: Combo[]): void {
        this.combos = pCombos;
    }

    public setProductos(pProductos: Producto[]): void {
        this.productos = pProductos;
    }

}