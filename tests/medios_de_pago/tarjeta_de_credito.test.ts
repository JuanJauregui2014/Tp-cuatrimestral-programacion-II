import TarjetaDeCredito from "../../src/medios_de_pago/tarjeta_de_credito";

describe("Test de la clase TarjetaDeCredito", () => {

    const nroTarjeta = 1222233334444555;
    const cantCuotas = 3;

    let tarjetaDeCredito: TarjetaDeCredito;

    beforeEach(() => {
        tarjetaDeCredito = new TarjetaDeCredito(nroTarjeta, cantCuotas);
    });

    test("Verifico que sea instancia de TarjetaDeCredito", () => {
        expect(tarjetaDeCredito).toBeInstanceOf(TarjetaDeCredito);
    });

    test("Verifico que el medio de pago se haya creado con sus respectivos datos", () => {
        expect(tarjetaDeCredito.getNumeroTarjeta()).toEqual(nroTarjeta);
        expect(tarjetaDeCredito.getCuotas()).toEqual(cantCuotas);
        expect(tarjetaDeCredito.getTipoDePago()).toEqual("Tarjeta de credito");
    });

    test("Verifico que puedo cambiar el nroTarjeta y las cuotas ante un error de ingreso", () => {
        const nuevoNroTarjeta = 5444433332222111;
        const nuevaCantCuotas = 1;

        tarjetaDeCredito.setNumeroTarjeta(nuevoNroTarjeta);
        tarjetaDeCredito.setCuotas(nuevaCantCuotas);

        expect(tarjetaDeCredito.getNumeroTarjeta()).toEqual(nuevoNroTarjeta);
        expect(tarjetaDeCredito.getCuotas()).toEqual(nuevaCantCuotas);
    });

});