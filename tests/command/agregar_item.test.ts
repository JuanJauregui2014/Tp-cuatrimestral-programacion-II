import AgregarItemCommand from "../../src/command/agregar_item";
import Categoria from "../../src/componentes_del_menu/categoria";
import Producto from "../../src/componentes_del_menu/producto";
import Item from "../../src/items/item";

const UNA_UNIDAD = 1;
const PRECIO_HAMBURGUESA = 1000;

describe("AgregarItemCommand", () => {

    let carnes: Categoria;
    let hamburguesa: Producto;

    beforeEach(() => {
        carnes = new Categoria("Carnes");
        hamburguesa = new Producto("Hamburguesa", PRECIO_HAMBURGUESA, carnes);
    });

    test("debería agregar un ítem al pedido", () => {
        const item: Item = new Item(UNA_UNIDAD, hamburguesa);
        const items: Item[] = [];

        const comando = new AgregarItemCommand(items, item);

        comando.ejecutar();

        expect(items).toHaveLength(UNA_UNIDAD);
        expect(items[0]).toBe(item);
    });

    test("debería deshacer la operación de agregar un ítem", () => {
        const item: Item = new Item(UNA_UNIDAD, hamburguesa);
        const items: Item[] = [item];

        const comando = new AgregarItemCommand(items, item);

        comando.deshacer();

        const cero = 0;

        expect(items).toHaveLength(cero);
    });

    test("debería lanzar un error si intenta deshacer un ítem inexistente", () => {
        const item: Item = new Item(UNA_UNIDAD, hamburguesa);
        const items: Item[] = [];

        const comando = new AgregarItemCommand(items, item);

        expect(() => comando.deshacer()).toThrow(
            "No se encuentra el item para deshacer"
        );
    });
});
