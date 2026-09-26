import  ElementoMenu  from "./elemento_menu";
import  Producto from "./producto";
import  ComboBeneficio  from "./combo_beneficio";

export default class Combo implements ElementoMenu {
    private nombre: string;
    private productos: Producto[];
    private beneficio: ComboBeneficio;

    constructor(nombre: string, productos: Producto[], beneficio: ComboBeneficio) {
        this.nombre = nombre;
        this.productos = productos;
        this.beneficio = beneficio;
    }
/* cree esto xq me tiraba error de numero maigo,sino ponia el 0,
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

    public getProductos(): Producto[] { return this.productos; }
    public setProductos(productos: Producto[]): void { this.productos = productos; }
    public getBeneficio(): ComboBeneficio { return this.beneficio; }
    public setBeneficio(beneficio: ComboBeneficio): void { this.beneficio = beneficio; }
    public setNombre(nombre: string): void { this.nombre = nombre; }
}