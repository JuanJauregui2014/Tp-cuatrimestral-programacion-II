import Categoria from "../componentes_del_menu/categoria";
import EstadoItem from "../items/estado_item";
import Item from "../items/item";

/**
 * Representa una estación de trabajo que prepara elementos de determinadas categorías.
 */
export default class Estacion {
    private nombre: string;
    private categorias: Categoria[];
    private items: Item[];

/**
 * Inicializa la instancia con los datos necesarios.
 * @param nombre - Parámetro de tipo string utilizado por la operación.
 * @param categorias - Parámetro de tipo Categoria[] utilizado por la operación.
 */
    public constructor(nombre: string, categorias: Categoria[]) {
        this.nombre = nombre;
        this.categorias = categorias;
        this.items = [];
    }

/**
 * Devuelve nombre.
 * @returns string con el resultado de la operación.
 */
    public getNombre(): string {
        return this.nombre;
    }

/**
 * Devuelve categorias.
 * @returns Categoria[] con el resultado de la operación.
 */
    public getCategorias(): Categoria[] {
        return this.categorias;
    }
    //metodo para obtener los items de la estacion, pero que no se puedan modificar desde afuera,
    //esto lo logramos con readonlyArray, que es un tipo de array que no permite modificar sus elementos
/**
 * Devuelve items.
 * @returns ReadonlyArray<Item> con el resultado de la operación.
 */
    public getItems(): ReadonlyArray<Item> {
        return this.items;
    }
/**
 * Agrega un ítem al pedido si este se encuentra en construcción.
 * @param item - Parámetro de tipo Item utilizado por la operación.
 * @throws {Error} Si no se cumplen las condiciones necesarias para realizar la operación.
 */
    public agregarItem(item: Item): void {
        this.items.push(item);
    }
    //aca lo que queria era primero encontrar el item que sigue que su estado no sea listo
    //luego lo guardo en la variable contra la que voy a comparar el item que me llega x parametro
    //si son estrictamente iguales , avanzo el estado del item, sino lanzo un error
    //basicamente comparo que el item que me llega corresponda al que sigue(usamos fifo)
/**
 * Avanza el estado del siguiente ítem pendiente de preparación.
 * @param item - Parámetro de tipo Item utilizado por la operación.
 * @throws {Error} Si no se cumplen las condiciones necesarias para realizar la operación.
 */
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
/**
 * Indica si la estación puede preparar elementos de la categoría indicada.
 * @param categoria - Parámetro de tipo Categoria utilizado por la operación.
 * @returns boolean con el resultado de la operación.
 */
    public puedePreparar(categoria: Categoria): boolean {
       return this.categorias.includes(categoria);
    }

    //aca nos fijamos que tareas estan pendientes en la estacion
    //le hacemos un filter y usamos listo, xq nos interesan los que no esten listos justamente
    //y el length nos devuelve los items del nuevo array filtrado
/**
 * Devuelve la cantidad de ítems que todavía no están listos en la estación.
 * @returns number con el resultado de la operación.
 */
    public obtenerCarga(): number {
        return this.items.filter(
            item => item.getEstado() !== EstadoItem.LISTO
        ).length;

    }
}