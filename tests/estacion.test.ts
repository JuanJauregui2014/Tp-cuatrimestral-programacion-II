import Estacion from "../src/estacion";
import Categoria from "../src/categoria";
import Item from "../src/item";
import ElementoMenu from "../src/elemento_menu";
import EstadoItem from "../src/estado_item";

const PRECIO_ELEMENTO = 10;

const crearElementoMock = (): ElementoMenu => ({
    getPrecio: jest.fn().mockReturnValue(PRECIO_ELEMENTO),
    getNombre: jest.fn().mockReturnValue("Elemento de prueba"),
});
describe("test de la clase Estacion", () => {
    test("crear una estacion con nombre y categorias", () => {
        const categoria1 = new Categoria("Bebidas");
        const categoria2 = new Categoria("Comidas");
        const estacion = new Estacion("Estacion 1", [categoria1, categoria2]);

        expect(estacion.getNombre()).toBe("Estacion 1");
        expect(estacion.getCategorias()).toEqual([categoria1, categoria2]);
        expect(estacion.getItems()).toEqual([]);
    });

    test("agregar un item a la estacion", () => {
        const categoria = new Categoria("Bebidas");
        const estacion = new Estacion("Estacion 1", [categoria]);
        const cantidadItems = 2;
        const item = new Item(cantidadItems, crearElementoMock());

        estacion.agregarItem(item);

        expect(estacion.getItems()).toEqual([item]);
    });

    test("avanzar el estado de un item en la estacion", () => {
        const categoria = new Categoria("Bebidas");
        const estacion = new Estacion("Estacion 1", [categoria]);
        const cantidadItems = 2;        
        const item = new Item(cantidadItems, crearElementoMock());

        estacion.agregarItem(item);
        estacion.avanzarItem(item);

        expect(item.getEstado()).toBe(EstadoItem.EN_PREPARACION);
    });
});   
