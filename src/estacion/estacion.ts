import Categoria from "../componentes_del_menu/categoria";
import EstadoItem from "../items/estado_item";
import Item from "../items/item";

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
    //aca lo que queria era primero encontrar el item que sigue que su estado no sea listo
    //luego lo guardo en la variable contra la que voy a comparar el item que me llega x parametro
    //si son estrictamente iguales , avanzo el estado del item, sino lanzo un error
    //basicamente comparo que el item que me llega corresponda al que sigue(usamos fifo)
    public avanzarItem(item: Item): void {
        const itemSiguiente = this.items.find(
            item => item.getEstado() !== EstadoItem.LISTO
        );
        if (item === itemSiguiente) {
            item.avanzarEstado();
        } else {
            throw new Error("el item no es el siguiente en la cola")
        }
    }
    //aca buscamos ver si la estacion puede preparar x producto segun la categoria
    //y uso includes para ver si la categoria que nos pasan se puede elaborar en la estacion
    //se le pasa categoria para ver justamente la categoria del producto
    public puedePreparar(categoria: Categoria): boolean {
       return this.categorias.includes(categoria);
    }

    //aca nos fijamos que tareas estan pendientes en la estacion
    //le hacemos un filter y usamos listo, xq nos interesan los que no esten listos justamente
    //y el length nos devuelve los items del nuevo array filtrado
    public obtenerCarga(): number {
        return this.items.filter(
            item => item.getEstado() !== EstadoItem.LISTO
        ).length;

    }
}