import Estacion from "../../src/estacion/estacion";
import Categoria from "../../src/componentes_del_menu/categoria";
import Item from "../../src/items/item";
import ElementoMenu from "../../src/componentes_del_menu/elemento_menu";
import EstadoItem from "../../src/items/estado_item";
//magic number te odio!
const PRECIO_ELEMENTO = 10;
const CANTIDAD_ITEMS_DE_PRUEBA = 2;
const CANTIDAD_ITEM_UNITARIO = 1;
const CARGA_CERO = 0;

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
        const cantidadItems = CANTIDAD_ITEMS_DE_PRUEBA;
        const item = new Item(cantidadItems, crearElementoMock());

        estacion.agregarItem(item);

        expect(estacion.getItems()).toEqual([item]);
    });

    test("avanzar el estado de un item en la estacion", () => {
        const categoria = new Categoria("Bebidas");
        const estacion = new Estacion("Estacion 1", [categoria]);
        const cantidadItems = CANTIDAD_ITEMS_DE_PRUEBA;
        const item = new Item(cantidadItems, crearElementoMock());

        estacion.agregarItem(item);
        estacion.avanzarItem(item);

        expect(item.getEstado()).toBe(EstadoItem.EN_PREPARACION);
    });
    test("debe devolver true si la estacion acepta la categoria", () => {
        const categoria = new Categoria("Carnes");
        const estacion = new Estacion("Parrilla", [categoria]);

        expect(estacion.puedePreparar(categoria)).toBe(true);
    });

    test("debe devolver false si la estacion no acepta la categoria", () => {
        const carnes = new Categoria("Carnes");
        const bebidas = new Categoria("Bebidas");
        const estacion = new Estacion("Parrilla", [carnes]);

        expect(estacion.puedePreparar(bebidas)).toBe(false);
    });
    test("una estacion vacia debe tener carga cero", () => {
    const categoria = new Categoria("Carnes");
    const estacion = new Estacion("Parrilla", [categoria]);

    expect(estacion.obtenerCarga()).toBe(CARGA_CERO);
});

test("debe contar los items pendientes", () => {
    const categoria = new Categoria("Carnes");
    const estacion = new Estacion("Parrilla", [categoria]);

    const item1 = new Item(CANTIDAD_ITEMS_DE_PRUEBA, crearElementoMock());
    const item2 = new Item(CANTIDAD_ITEM_UNITARIO, crearElementoMock());

    estacion.agregarItem(item1);
    estacion.agregarItem(item2);

    expect(estacion.obtenerCarga()).toBe(CANTIDAD_ITEMS_DE_PRUEBA);
});

test("no debe contar los items que ya estan listos", () => {
    const categoria = new Categoria("Carnes");
    const estacion = new Estacion("Parrilla", [categoria]);

    const item1 = new Item(CANTIDAD_ITEM_UNITARIO, crearElementoMock());
    const item2 = new Item(CANTIDAD_ITEM_UNITARIO, crearElementoMock());
    const item3 = new Item(CANTIDAD_ITEM_UNITARIO, crearElementoMock());

    estacion.agregarItem(item1);
    estacion.agregarItem(item2);
    estacion.agregarItem(item3);

    item1.avanzarEstado();
    item1.avanzarEstado();

    item2.avanzarEstado();

    expect(estacion.obtenerCarga()).toBe(CANTIDAD_ITEMS_DE_PRUEBA);
});
test("debe procesar el primer item de la cola", () => {
    const estacion = new Estacion("Parrilla", [
        new Categoria("Carnes")
    ]);

    const hamburguesa = new Item(CANTIDAD_ITEM_UNITARIO, crearElementoMock());
    const bife = new Item(CANTIDAD_ITEM_UNITARIO, crearElementoMock());

    estacion.agregarItem(hamburguesa);
    estacion.agregarItem(bife);

    estacion.avanzarItem(hamburguesa);

    expect(hamburguesa.getEstado()).toBe(EstadoItem.EN_PREPARACION);
    expect(bife.getEstado()).toBe(EstadoItem.PENDIENTE);
});

test("debe rechazar un item fuera del orden FIFO", () => {
    const estacion = new Estacion("Parrilla", [
        new Categoria("Carnes")
    ]);

    const hamburguesa = new Item(CANTIDAD_ITEM_UNITARIO, crearElementoMock());
    const bife = new Item(CANTIDAD_ITEM_UNITARIO, crearElementoMock());

    estacion.agregarItem(hamburguesa);
    estacion.agregarItem(bife);

    expect(() => estacion.avanzarItem(bife)).toThrow(
        "el item no es el siguiente en la cola"
    );

    expect(bife.getEstado()).toBe(EstadoItem.PENDIENTE);
});

test(" permite avanzar el segundo item cuando termina el primero", () => {
    const estacion = new Estacion("Parrilla", [
        new Categoria("Carnes")
    ]);

    const hamburguesa = new Item(CANTIDAD_ITEM_UNITARIO, crearElementoMock());
    const bife = new Item(CANTIDAD_ITEM_UNITARIO, crearElementoMock());

    estacion.agregarItem(hamburguesa);
    estacion.agregarItem(bife);

    estacion.avanzarItem(hamburguesa);
    estacion.avanzarItem(hamburguesa);

    expect(hamburguesa.getEstado()).toBe(EstadoItem.LISTO);

    estacion.avanzarItem(bife);

    expect(bife.getEstado()).toBe(EstadoItem.EN_PREPARACION);
});
test("debe registrar las preparaciones de un item", () => {
    const elementoMock: ElementoMenu = {
        getPrecio: jest.fn(),
        getNombre: jest.fn()
    };

    const combo = new Item(CANTIDAD_ITEM_UNITARIO, elementoMock);
    const hamburguesa = new Item(CANTIDAD_ITEM_UNITARIO, elementoMock);
    const bebida = new Item(CANTIDAD_ITEM_UNITARIO, elementoMock);

    combo.registrarPreparacion([hamburguesa, bebida]);

    expect(combo.getEstado()).toBe(EstadoItem.PENDIENTE);
});

test("debe pasar a EN_PREPARACION cuando comienza un producto", () => {
    const elementoMock: ElementoMenu = {
        getPrecio: jest.fn(),
        getNombre: jest.fn()
    };

    const combo = new Item(CANTIDAD_ITEM_UNITARIO, elementoMock);
    const hamburguesa = new Item(CANTIDAD_ITEM_UNITARIO, elementoMock);
    const bebida = new Item(CANTIDAD_ITEM_UNITARIO, elementoMock);

    combo.registrarPreparacion([hamburguesa, bebida]);

    hamburguesa.avanzarEstado();

    expect(combo.getEstado()).toBe(EstadoItem.EN_PREPARACION);
});

test("debe estar LISTO solamente cuando todas las preparaciones terminan", () => {
    const elementoMock: ElementoMenu = {
        getPrecio: jest.fn(),
        getNombre: jest.fn()
    };

    const combo = new Item(CANTIDAD_ITEM_UNITARIO, elementoMock);
    const hamburguesa = new Item(CANTIDAD_ITEM_UNITARIO, elementoMock);
    const bebida = new Item(CANTIDAD_ITEM_UNITARIO, elementoMock);

    combo.registrarPreparacion([hamburguesa, bebida]);

    hamburguesa.avanzarEstado();
    hamburguesa.avanzarEstado();

    expect(combo.getEstado()).toBe(EstadoItem.EN_PREPARACION);

    bebida.avanzarEstado();
    bebida.avanzarEstado();

    expect(combo.getEstado()).toBe(EstadoItem.LISTO);
});

test("no debe permitir avanzar directamente un item con preparaciones", () => {
    const elementoMock: ElementoMenu = {
        getPrecio: jest.fn(),
        getNombre: jest.fn()
    };

    const combo = new Item(CANTIDAD_ITEM_UNITARIO, elementoMock);
    const hamburguesa = new Item(CANTIDAD_ITEM_UNITARIO, elementoMock);

    combo.registrarPreparacion([hamburguesa]);

    expect(() => combo.avanzarEstado()).toThrow(
        "El estado del combo depende de sus preparaciones"
    );
});

});   
