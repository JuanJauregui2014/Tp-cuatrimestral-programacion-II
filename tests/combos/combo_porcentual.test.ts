import ComboPorcentual from "../../src/combos/combo_porcentual";

describe("Test de la clase ComboPorcentual", () => {

    const porcentajeDescuento = 0.1;

    let comboPorcentual: ComboPorcentual;

    beforeEach(() => {
        comboPorcentual = new ComboPorcentual(porcentajeDescuento);
    });

    test("Verifico que sea instancia de ComboPorcentual", () => {
        expect(comboPorcentual).toBeInstanceOf(ComboPorcentual);
    });

    test("Verifico que el tipo de combo se haya creado con sus respectivos datos", () => {
        expect(comboPorcentual.getPorcentajeDescuento()).toEqual(porcentajeDescuento);
    });

    test("Verifico que puedo cambiar el porcentaje de descuento ante un error de ingreso", () => {
        const nuevoPorcentaje = 0.2;
        comboPorcentual.setPorcentajeDescuento(nuevoPorcentaje);

        expect(comboPorcentual.getPorcentajeDescuento()).toEqual(nuevoPorcentaje);
    });

    test("Verifico que se aplique el beneficio indicado", () => {
        const precioBasePrueba = 3000;
        const precioFinalEsperado = precioBasePrueba - (precioBasePrueba * porcentajeDescuento);

        expect(comboPorcentual.aplicarBeneficio(precioBasePrueba)).toEqual(precioFinalEsperado);
    });

});