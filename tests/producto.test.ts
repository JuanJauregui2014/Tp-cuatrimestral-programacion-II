import { describe, expect, test } from "@jest/globals";
import Categoria from "../src/categoria";
import Producto from "../src/producto";

describe("test de la clase Producto", () => {
    test("crear un producto con nombre, precio y categoria", () => {
        const categoria = new Categoria("Bebidas");
        const producto = new Producto("Coca Cola", 150, categoria);
        expect(producto.getNombre()).toBe("Coca Cola");
        expect(producto.getPrecio()).toBe(150);
        expect(producto.getCategoria()).toBe(categoria);
    });
    test("obtener el precio, nombre y categoria de un producto", () => {
        const categoria = new Categoria("Bebidas");
        const producto = new Producto("Coca Cola", 150, categoria);
        expect(producto.getPrecio()).toBe(150);
        expect(producto.getNombre()).toBe("Coca Cola");
        expect(producto.getCategoria()).toBe(categoria);
    });

});