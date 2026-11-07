import TarjetaDeDebito from "../../src/medios_de_pago/tarjeta_de_debito";

describe("Test de la clase TarjetaDeDebito", () => {

    const nroTarjeta = 1222233334444555;

    let tarjetaDeDebito: TarjetaDeDebito;

    beforeEach(() => {
        tarjetaDeDebito = new TarjetaDeDebito(nroTarjeta);
    });

    test("Verifico que sea instancia de TarjetaDeDebito", () => {
        expect(tarjetaDeDebito).toBeInstanceOf(TarjetaDeDebito);
    });

    test("Verifico que el medio de pago se haya creado con sus respectivos datos", () => {
        expect(tarjetaDeDebito.getNumeroTarjeta()).toEqual(nroTarjeta);
        expect(tarjetaDeDebito.getTipoDePago()).toEqual("Tarjeta de debito");
    });

    test("Verifico que puedo cambiar el nroTarjeta ante un error de ingreso", () => {
        const nuevoNroTarjeta = 5444433332222111;

        tarjetaDeDebito.setNumeroTarjeta(nuevoNroTarjeta);

        expect(tarjetaDeDebito.getNumeroTarjeta()).toEqual(nuevoNroTarjeta);
    });

});