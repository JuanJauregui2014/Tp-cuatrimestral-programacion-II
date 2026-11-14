import BilleteraVirtual from "../../src/medios_de_pago/billetera_virtual";

describe("Test de la clase BilleteraVirtual", () => {

    const alias = "PERA.LUNA.PASTEL01";

    let billeterVirtual: BilleteraVirtual;

    beforeEach(() => {
        billeterVirtual = new BilleteraVirtual(alias);
    });

    test("Verifico que sea instancia de BilleteraVirtual", () => {
        expect(billeterVirtual).toBeInstanceOf(BilleteraVirtual);
    });

    test("Verifico que el medio de pago se haya creado con sus respectivos datos", () => {
        expect(billeterVirtual.getAlias()).toEqual(alias);
        expect(billeterVirtual.getTipoDePago()).toEqual("Billetera Virtual");
    });

    test("Verifico que puedo cambiar el alias ante un error de ingreso", () => {
        const nuevoAlias = "PERA.LUNAR.PASTELITO";
        billeterVirtual.setAlias(nuevoAlias);

        expect(billeterVirtual.getAlias()).toEqual(nuevoAlias);
    });

});