import ComboPrecioFijo from "../../src/combos/combo_preciofijo";

describe("Test de la clase ComboPrecioFijo", () => {

    const precioFijoDelCombo = 5000;

    let comboPrecioFijo: ComboPrecioFijo;

    beforeEach(() => {
        comboPrecioFijo = new ComboPrecioFijo(precioFijoDelCombo);
    });

    test("Verifico que sea instancia de ComboPorcentual", () => {
        expect(comboPrecioFijo).toBeInstanceOf(ComboPrecioFijo);
    });

    test("Verifico que el tipo de combo se haya creado con sus respectivos datos", () => {
        expect(comboPrecioFijo.getPrecioFijo()).toEqual(precioFijoDelCombo);
    });

    test("Verifico que puedo cambiar el precio fijo ante un error de ingreso", () => {
        const nuevoPrecioFijo = 6500;
        comboPrecioFijo.setPrecioFijo(nuevoPrecioFijo);

        expect(comboPrecioFijo.getPrecioFijo()).toEqual(nuevoPrecioFijo);
    });

    test("Verifico que no se aplica ningún beneficio", () => {
        const precioFinalEsperado = precioFijoDelCombo;

        expect(comboPrecioFijo.aplicarBeneficio(precioFijoDelCombo)).toEqual(precioFinalEsperado);
    });

});