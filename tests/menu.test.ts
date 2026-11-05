
import Menu from "../src/menu";
import { describe, expect, test } from "@jest/globals";
import Categoria from "../src/componentes_del_menu/categoria";
import Combo from "../src/componentes_del_menu/combo";
import Producto from "../src/componentes_del_menu/producto";

describe("test de la clase Menu", () => {
    test("agregar una categoria al menu", () => {
        const menu = new Menu();
        const categoria = new Categoria("Bebidas");
        menu.agregarCategoria(categoria);
        expect(menu.getCategorias()).toEqual([categoria]);
    });

    test("agregar un combo al menu", () => {
        const menu = new Menu();
        const porcentajeDesc = 0.9;
        const beneficio = {aplicarBeneficio: jest.fn((precio: number) => precio * porcentajeDesc) // 10% de descuento
        };
        const precioProducto = 100;
        const combo = new Combo(
            "Combo 1", [new Producto("Hamburguesa", precioProducto, new Categoria("Comidas"))], beneficio
        );
        menu.agregarCombo(combo);
        expect(menu.getCombos()).toEqual([combo]);
    });

    test("agregar un producto al menu", () => {
        const menu = new Menu();
        const precioProducto = 100;
        const producto = new Producto("Hamburguesa", precioProducto, new Categoria("Comidas"));
        menu.agregarProducto(producto);
        expect(menu.getProductos()).toEqual([producto]);
    });
});