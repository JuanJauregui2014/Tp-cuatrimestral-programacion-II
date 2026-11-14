/* eslint-disable @typescript-eslint/naming-convention */

import ComandoPedido from "./comando_pedido";
import Item from "../items/item";

/**
 * Encapsula la operación de quitar un ítem y conserva la información necesaria para deshacerla.
 */
export default class QuitarItemCommand implements ComandoPedido {

    private static readonly POSICION_NO_ENCONTRADA = -1;
    private static readonly CANTIDAD_ITEMS_A_ELIMINAR = 1;
    private static readonly CANTIDAD_ITEMS_A_INSERTAR = 0;

    private items: Item[];
    private item: Item;
    // Guardamos la posición original del item en el array de items para poder deshacer la acción.
    private posicionOriginal: number = QuitarItemCommand.POSICION_NO_ENCONTRADA;
    //recibimos el array de items del pedido y el item a quitar
/**
 * Inicializa la instancia con los datos necesarios.
 * @param items - Parámetro de tipo Item[] utilizado por la operación.
 * @param item - Parámetro de tipo Item utilizado por la operación.
 */
    public constructor(items: Item[], item: Item) {
        this.items = items;
        this.item = item;
    }

    //quitamos el item
/**
 * Ejecuta la operación encapsulada por el comando.
 */
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
/**
 * Revierte la operación realizada por el comando.
 */
    public deshacer(): void {
        if (this.posicionOriginal === QuitarItemCommand.POSICION_NO_ENCONTRADA) {
            throw new Error("El comando no fue ejecutado");
        }
        // Insertamos el item en la posición original del array de items.
        //xq queremos que quede en la misma posición que estaba antes de quitarlo, no al final del array
        this.items.splice(this.posicionOriginal, QuitarItemCommand.CANTIDAD_ITEMS_A_INSERTAR, this.item);
    }
}
