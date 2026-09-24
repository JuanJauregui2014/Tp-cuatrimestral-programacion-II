import Categoria from "./categoria";
import { Item } from "./item";

export default class Estacion {
    private nombre: string;
    private categorias: Categoria[];
    private items: Item[];

    constructor(nombre: string, categorias: Categoria[]) {
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

    public getItems(): ReadonlyArray<Item> {
        return this.items;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setCategorias(categorias: Categoria[]): void {
        this.categorias = categorias;
    }

    public setItems(items: Item[]): void {
        this.items = items;
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