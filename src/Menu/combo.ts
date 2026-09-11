import { Producto } from "./producto";

const CERO = 0;

export class Combo {

    private static readonly porcentaje90 = 0.9;

    private nombre: string;
    private productos: Producto[];
    private precioEspecial: number;

    public constructor(nombre: string, productos: Producto[], precioEspecial?: number) {
        this.nombre = nombre;
        this.precioEspecial = precioEspecial ?? CERO;
        this.productos = productos;
    }

    private calcularTotal(): number {
        return this.productos.reduce((total, producto) => total + producto.getPrecio(), CERO);
    }

    public getPrecio(): number {
        this.precioEspecial = this.calcularTotal() * Combo.porcentaje90;
        return this.precioEspecial;
    }

    public getNombre(): string {
        return this.nombre;
    }
}