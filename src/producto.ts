import  Categoria  from "./categoria";
import  ElementoMenu from "./elemento_menu";

export default class Producto implements ElementoMenu {
    private nombre: string;
    private precioDeVenta: number;
    private categoria: Categoria;

    public constructor(nombre: string, precioDeVenta: number, categoria: Categoria) {
        this.nombre = nombre;
        this.precioDeVenta = precioDeVenta;
        this.categoria = categoria;
    }

    public getPrecio(): number {
        return this.precioDeVenta;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getCategoria(): Categoria {
        return this.categoria;
    }
}