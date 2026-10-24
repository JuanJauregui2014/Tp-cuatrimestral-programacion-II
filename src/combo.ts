import  ElementoMenu  from "./elemento_menu";
import  Producto from "./producto";
import  ComboBeneficio  from "./combo_beneficio";

export default class Combo implements ElementoMenu {
    private nombre: string;
    private productos: ReadonlyArray<Producto>;
    private beneficio: ComboBeneficio;

    public constructor(nombre: string, productos: Producto[], beneficio: ComboBeneficio) {
        this.nombre = nombre;
        this.productos = productos;
        this.beneficio = beneficio;
    }
/* cree esto xq me tiraba error de numero magicoo,sino ponia el 0,
total es la alcancia donde se suman los valores,producto producto el elemento que se lee
y total + producto.getPrecio() agarra la alcancia y se lo suma al precio del producto
y bueno despues le aplicamos el beneficio */
 public getPrecio(): number {
        const valorInicialAcumulador = 0;
        const precioTotal = this.productos.reduce(
            (total, producto) => total + producto.getPrecio(),
            valorInicialAcumulador
        );
        return this.beneficio.aplicarBeneficio(precioTotal);
    }
    public getNombre(): string {
        return this.nombre;
    }
    public getProductos(): ReadonlyArray<Producto> { return this.productos; }
    public getBeneficio(): ComboBeneficio { return this.beneficio; }
}