import { describe, expect, test } from "@jest/globals";
import Categoria from "../src/categoria";
import Producto from "../src/producto";

describe("test de la clase Producto", () => {
    test("crear un producto con nombre, precio y categoria", () => {
        const categoria = new Categoria("Bebidas");
        const precioProducto = 300;
        const producto = new Producto("Coca Cola", precioProducto, categoria);
        expect(producto.getNombre()).toBe("Coca Cola");
        expect(producto.getPrecio()).toBe(precioProducto);
        expect(producto.getCategoria()).toBe(categoria);
    });
    test("obtener el precio, nombre y categoria de un producto", () => {
        const categoria = new Categoria("Bebidas");
        const precioProducto = 300;
        const producto = new Producto("Coca Cola", precioProducto, categoria);
        expect(producto.getPrecio()).toBe(precioProducto);
        expect(producto.getNombre()).toBe("Coca Cola");
        expect(producto.getCategoria()).toBe(categoria);
    });

});