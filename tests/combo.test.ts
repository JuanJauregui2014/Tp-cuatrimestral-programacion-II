
import { describe, expect, jest, test } from "@jest/globals";
import Combo from "../src/combo";
import Producto from "../src/producto";
import ComboBeneficio from "../src/combo_beneficio";

describe("test para laclase combo",() =>{
    test("deberia calcular el precio total sumando los productos y aplicando el descuento o beneficio",() =>{
        //mockeamos productos falsos y le metemos el precio que devuelven
        const producto1 = { getPrecio: jest.fn().mockReturnValue(100) } as unknown as Producto;
        const producto2 = { getPrecio: jest.fn().mockReturnValue(200) } as unknown as Producto;

        //mockeamos el beneficio o descuento que aplicara el combo
        const beneficioMock: ComboBeneficio = {
            aplicarBeneficio: jest.fn((precioBase: number) => precioBase * 0.9) // 10% de descuento
        };
        const combo = new Combo("Combo hamburguesa", [producto1, producto2], beneficioMock);

        const precioTotal = combo.getPrecio();
        expect(precioTotal).toBe(270); // (100 + 200) * 0.9 = 270
        expect(beneficioMock.aplicarBeneficio).toHaveBeenCalledWith(300); // (100 + 200) = 300
    });
})