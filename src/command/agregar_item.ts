import ComandoPedido from "./comando_pedido";
import Item from "../items/item";

//magic te sigo odiando
const ITEM_NO_ENCONTRADO = -1;
const CANTIDAD_ITEMS_A_ELIMINAR = 1;

/**
 * Encapsula la operación de agregar un ítem a un pedido y permite deshacerla.
 */
export default class AgregarItemCommand implements ComandoPedido {

    private items: Item[];
    private item: Item;
    //recibimos el array de items del pedido y el item a agregar
/**
 * Inicializa la instancia con los datos necesarios.
 * @param items - Parámetro de tipo Item[] utilizado por la operación.
 * @param item - Parámetro de tipo Item utilizado por la operación.
 */
    public constructor(items: Item[], item: Item) {
        this.items = items;
        this.item = item;
    }
    //agregamos el item
/**
 * Ejecuta la operación encapsulada por el comando.
 */
    public ejecutar(): void {
        this.items.push(this.item);
    }
    //deshacemos la accion de agregar el item
/**
 * Revierte la operación realizada por el comando.
 */
    public deshacer(): void {
        const posicion = this.items.lastIndexOf(this.item);

        if (posicion === ITEM_NO_ENCONTRADO) {
            throw new Error("No se encuentra el item para deshacer");
        }

        this.items.splice(posicion, CANTIDAD_ITEMS_A_ELIMINAR);
    }
}