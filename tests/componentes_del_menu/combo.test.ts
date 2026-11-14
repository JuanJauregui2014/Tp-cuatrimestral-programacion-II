import { describe, expect, jest, test } from "@jest/globals";
import Combo from "../../src/componentes_del_menu/combo";
import Producto from "../../src/componentes_del_menu/producto";
import ComboBeneficio from "../../src/combos/combo_beneficio";

describe("Test para la clase combo",() =>{
    test("Deberia calcular el precio total sumando los productos y aplicando el descuento o beneficio",() =>{
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
        
        expect(combo.getProductos()).toEqual([producto1, producto2]);
        expect(combo.getBeneficio()).toEqual(beneficioMock);
        //Verificamos la correcta instancia del combo

        const precioEsperadoDelCombo = (precioProducto1 + precioProducto2) * porcentajeDescuento;
        expect(combo.getPrecio()).toEqual(precioEsperadoDelCombo); // (100 + 200) * 0.9 = 270
        const sumaDePreciosDeProductos = 300;
        expect(beneficioMock.aplicarBeneficio).toHaveBeenCalledWith(sumaDePreciosDeProductos); // (100 + 200) = 300
    });
});