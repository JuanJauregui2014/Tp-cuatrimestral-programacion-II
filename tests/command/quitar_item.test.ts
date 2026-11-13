
import QuitarItemCommand from "../../src/command/quitar_item";
import Categoria from "../../src/componentes_del_menu/categoria";
import Producto from "../../src/componentes_del_menu/producto";
import Item from "../../src/items/item";

const UNA_UNIDAD = 1;
const PRECIO_HAMBURGUESA = 1000;
const CERO = 0;
const POSICION_INICIAL = 0;
const POSICION_FINAL = 1;

// eslint-disable-next-line max-lines-per-function
describe("QuitarItemCommand", () => {

    let carnes: Categoria;
    let hamburguesa: Producto;

    beforeEach(() => {
        carnes = new Categoria("Carnes");
        hamburguesa = new Producto("Hamburguesa", PRECIO_HAMBURGUESA, carnes);
    });

    test("debería quitar un ítem del pedido", () => {
        const item: Item = new Item(UNA_UNIDAD, hamburguesa);
        const items: Item[] = [item];

        const comando = new QuitarItemCommand(items, item);

        comando.ejecutar();

        expect(items).toHaveLength(CERO);
        expect(items).not.toContain(item);
    });

    test("debería deshacer la operación de quitar un ítem y recuperarlo en su posición original", () => {
        const primerItem: Item = new Item(UNA_UNIDAD, hamburguesa);
        const segundoItem: Item = new Item(UNA_UNIDAD, hamburguesa);
        const tercerItem: Item = new Item(UNA_UNIDAD, hamburguesa);

        const items: Item[] = [primerItem, segundoItem, tercerItem];

        const comando = new QuitarItemCommand(items, segundoItem);

        comando.ejecutar();
        comando.deshacer();

        const tres = 3;

        expect(items).toHaveLength(tres);
        expect(items[POSICION_INICIAL]).toBe(primerItem);
        expect(items[POSICION_FINAL]).toBe(segundoItem);
    });

    test("debería lanzar un error si intenta quitar un ítem que no pertenece al pedido", () => {
        const item: Item = new Item(UNA_UNIDAD, hamburguesa);
        const otroItem: Item = new Item(UNA_UNIDAD, hamburguesa);
        const items: Item[] = [item];

        const comando = new QuitarItemCommand(items, otroItem);

        expect(() => comando.ejecutar()).toThrow(
            "El item no pertenece al pedido"
        );
    });

    test("debería lanzar un error si intenta deshacer el comando antes de ejecutarlo", () => {
        const item: Item = new Item(UNA_UNIDAD, hamburguesa);
        const items: Item[] = [item];

        const comando = new QuitarItemCommand(items, item);

        expect(() => comando.deshacer()).toThrow(
            "El comando no fue ejecutado"
        );
    });
});
