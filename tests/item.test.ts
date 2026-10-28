import Item from "../src/item";
import EstadoItem from "../src/estado_item";
import ElementoMenu from "../src/elemento_menu";

describe("Test de la clase Item", () => {
    
    test("Deberia inicializar en estado PENDIENTE", () => {
        const elementoMock: ElementoMenu = {
            getPrecio: jest.fn(),
            getNombre: jest.fn(),
        };
        const cantidadItems = 5;
        const item = new Item(cantidadItems, elementoMock);
        expect(item.getEstado()).toBe(EstadoItem.PENDIENTE);
    });

    test("No deberia permitir modificar la cantidad de un item que no esta pendiente", () => {
        const elementoMock: ElementoMenu = {
            getPrecio: jest.fn(),
            getNombre: jest.fn(),
        };
        const cantidadItems = 5;
        const item = new Item(cantidadItems, elementoMock);
        
        item.avanzarEstado(); // Cambia el estado a EN_PREPARACION
        const cantidadModificada = 3;
        expect(() => item.setCantidad(cantidadModificada))
        .toThrow("No se puede modificar la cantidad de un item que no está pendiente.");
    });

});
