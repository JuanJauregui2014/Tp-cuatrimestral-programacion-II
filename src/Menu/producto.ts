export class Producto {
    
    private nombre: string;
    private precioDeVenta: number;

    public constructor(nombre: string, precio: number) {
        this.precioDeVenta = precio;
        this.nombre = nombre;
    }

    public getPrecio(): number {
        return this.precioDeVenta;
    }

    public getNombre(): string {
        return this.nombre;
    }
    
}