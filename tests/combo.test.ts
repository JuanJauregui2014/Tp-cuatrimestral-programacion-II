
import { describe, expect, jest, test } from "@jest/globals";
import Combo from "../src/combo";
import Producto from "../src/producto";
import ComboBeneficio from "../src/combo_beneficio";

describe("test para laclase combo",() =>{
    test("deberia calcular el precio total sumando los productos y aplicando el descuento o beneficio",() =>{
        const precioProducto1 = 100;
        const precioProducto2 = 200;
        //mockeamos productos falsos y le metemos el precio que devuelven
        const producto1 = { getPrecio: jest.fn().mockReturnValue(precioProducto1) } as unknown as Producto;
        const producto2 = { getPrecio: jest.fn().mockReturnValue(precioProducto2) } as unknown as Producto;

        //mockeamos el beneficio o descuento que aplicara el combo
        const porcentajeDescuento = 0.9;
        const beneficioMock: ComboBeneficio = {
            aplicarBeneficio: jest.fn((precioBase: number) => precioBase * porcentajeDescuento) // 10% de descuento
        };
        const combo = new Combo("Combo hamburguesa", [producto1, producto2], beneficioMock);
        
        const precioEsperadoDelCombo = (precioProducto1 + precioProducto2) * porcentajeDescuento;
        expect(combo.getPrecio()).toBe(precioEsperadoDelCombo); // (100 + 200) * 0.9 = 270
        const sumaDePreciosDeProductos = 300;
        expect(beneficioMock.aplicarBeneficio).toHaveBeenCalledWith(sumaDePreciosDeProductos); // (100 + 200) = 300
    });
})