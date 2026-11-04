/// <reference types="jest" />
import Item from "../src/item";
import EstadoItem from "../src/estado_item";
import ElementoMenu from "../src/elemento_menu";

describe("Test de la clase Item", () => {
    
    test("Deberia inicializar en estado PENDIENTE", () => {
        const elementoMock: ElementoMenu = {
            getPrecio: jest.fn(),
            getNombre: jest.fn(),
        };
        const item = new Item(2, elementoMock);
        expect(item.getEstado()).toBe(EstadoItem.PENDIENTE);
    });

    test("No deberia permitir modificar la cantidad de un item que no esta pendiente", () => {
        const elementoMock: ElementoMenu = {
            getPrecio: jest.fn(),
            getNombre: jest.fn(),
        };
        const item = new Item(2, elementoMock);
        
        item.avanzarEstado(); // Cambia el estado a EN_PREPARACION
        
        expect(() => item.setCantidad(3)).toThrow("No se puede modificar la cantidad de un item que no está pendiente.");
    });

});
