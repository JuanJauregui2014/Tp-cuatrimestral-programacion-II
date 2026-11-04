/* eslint-disable */
/* eslint-env jest */

import Menu from "../src/menu";
import { describe, expect, test } from "@jest/globals";
import Categoria from "../src/categoria";
import Combo from "../src/combo";
import Producto from "../src/producto";

describe("test de la clase Menu", () => {
    test("crear un menu con categorias, combos y productos", () => {
        const menu = new Menu();
        expect(menu.getCategorias()).toEqual([]);
        expect(menu.getCombos()).toEqual([]);
        expect(menu.getProductos()).toEqual([]);
    });

    test("agregar una categoria al menu", () => {
        const menu = new Menu();
        const categoria = new Categoria("Bebidas");
        menu.agregarCategoria(categoria);
        expect(menu.getCategorias()).toEqual([categoria]);
    });

    test("agregar un combo al menu", () => {
        const menu = new Menu();
        const beneficio = { aplicarBeneficio: (precio: number) => precio * 0.9, // 10% de descuento
        };
        const combo = new Combo("Combo 1", [new Producto("Hamburguesa", 5, new Categoria("Comidas"))], beneficio);
        menu.agregarCombo(combo);
        expect(menu.getCombos()).toEqual([combo]);
    });

    test("agregar un producto al menu", () => {
        const menu = new Menu();
        const producto = new Producto("Hamburguesa", 5, new Categoria("Comidas"));
        menu.agregarProducto(producto);
        expect(menu.getProductos()).toEqual([producto]);
    });
});