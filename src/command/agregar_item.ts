import ComandoPedido from "./comando_pedido";
import Item from "../items/item";

//magic te sigo odiando
const ITEM_NO_ENCONTRADO = -1;
const CANTIDAD_ITEMS_A_ELIMINAR = 1;

export default class AgregarItemCommand implements ComandoPedido {

    private items: Item[];
    private item: Item;
    //recibimos el array de items del pedido y el item a agregar
    public constructor(items: Item[], item: Item) {
        this.items = items;
        this.item = item;
    }
    //agregamos el item
    public ejecutar(): void {
        this.items.push(this.item);
    }
    //deshacemos la accion de agregar el item
    public deshacer(): void {
        const posicion = this.items.lastIndexOf(this.item);

        if (posicion === ITEM_NO_ENCONTRADO) {
            throw new Error("No se encuentra el item para deshacer");
        }

        this.items.splice(posicion, CANTIDAD_ITEMS_A_ELIMINAR);
    }
}
