import Categoria from "./categoria";
import  Item  from "./item";

export default class Estacion {
    private nombre: string;
    private categorias: Categoria[];
    private items: Item[];

    public constructor(nombre: string, categorias: Categoria[]) {
        this.nombre = nombre;
        this.categorias = categorias;
        this.items = [];
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getCategorias(): Categoria[] {
        return this.categorias;
    }
    //metodo para obtener los items de la estacion, pero que no se puedan modificar desde afuera,
    //esto lo logramos con readonlyArray, que es un tipo de array que no permite modificar sus elementos
    public getItems(): ReadonlyArray<Item> {
        return this.items;
    }
    public agregarItem(item: Item): void {
        this.items.push(item);
    }

    public avanzarItem(item: Item): void {
        if (this.items.includes(item)) {
            item.avanzarEstado();
        }
    }
}