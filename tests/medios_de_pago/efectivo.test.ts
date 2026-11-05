import Efectivo from "../../src/medios_de_pago/efectivo";

describe("Test de la clase Efectivo", () => {

    let efectivo: Efectivo;

    beforeEach(() => {
        efectivo = new Efectivo();
    });

    test("Verifico que sea instancia de Efectivo", () => {
        expect(efectivo).toBeInstanceOf(Efectivo);
    });

    test("Verifico que el medio de pago se haya creado con sus respectivos datos", () => {
        expect(efectivo.getTipoDePago()).toEqual("Efectivo");
    });

});