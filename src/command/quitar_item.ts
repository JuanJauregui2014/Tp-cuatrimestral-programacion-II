/* eslint-disable @typescript-eslint/naming-convention */

import ComandoPedido from "./comando_pedido";
import Item from "../items/item";

export default class QuitarItemCommand implements ComandoPedido {

    private static readonly POSICION_NO_ENCONTRADA = -1;
    private static readonly CANTIDAD_ITEMS_A_ELIMINAR = 1;
    private static readonly CANTIDAD_ITEMS_A_INSERTAR = 0;

    private items: Item[];
    private item: Item;
    // Guardamos la posición original del item en el array de items para poder deshacer la acción.
    private posicionOriginal: number = QuitarItemCommand.POSICION_NO_ENCONTRADA;
    //recibimos el array de items del pedido y el item a quitar
    public constructor(items: Item[], item: Item) {
        this.items = items;
        this.item = item;
    }

    //quitamos el item
    public ejecutar(): void {
        // Guardamos la posición original del item en el array de items para poder deshacer la acción.
        this.posicionOriginal = this.items.indexOf(this.item);
        // Si el item no se encuentra en el array, lanzamos un error.
        if (this.posicionOriginal === QuitarItemCommand.POSICION_NO_ENCONTRADA) {
            throw new Error("El item no pertenece al pedido");
        }

    // Eliminamos el item del array de items.
        this.items.splice(this.posicionOriginal, QuitarItemCommand.CANTIDAD_ITEMS_A_ELIMINAR);
    }
    //deshacemos la accion de quitar el item
    public deshacer(): void {
        if (this.posicionOriginal === QuitarItemCommand.POSICION_NO_ENCONTRADA) {
            throw new Error("El comando no fue ejecutado");
        }
        // Insertamos el item en la posición original del array de items.
        //xq queremos que quede en la misma posición que estaba antes de quitarlo, no al final del array
        this.items.splice(this.posicionOriginal, QuitarItemCommand.CANTIDAD_ITEMS_A_INSERTAR, this.item);
    }
}
