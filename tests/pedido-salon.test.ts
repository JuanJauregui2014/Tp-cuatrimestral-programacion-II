import PedidoSalon from "../src/pedido_salon";

describe("Test de la clase PedidoSalon", () => {
    const nroPedidoSalon = 5;
    const nombreClienteSalon = "Pepe";
    const nroMesa = 2;
    const mozo = "Juan Manuel";

    let pedidoSalon: PedidoSalon;

    beforeEach(() => {
        pedidoSalon = new PedidoSalon(nroPedidoSalon, nombreClienteSalon, nroMesa, mozo);
    });

    test("Verifico que sea instancia de PedidoSalon", () => {
        expect(pedidoSalon).toBeInstanceOf(PedidoSalon);
    });

    test("Verifico que cada tipo de pedido se haya creado con sus respectivos datos correctamente", () => {
        expect(pedidoSalon.getNumeroMesa()).toEqual(nroMesa);
        expect(pedidoSalon.getMozo()).toEqual(mozo);
        expect(pedidoSalon.getNumeroPedido()).toEqual(nroPedidoSalon);
        expect(pedidoSalon.getNombreCliente()).toEqual(nombreClienteSalon);
    });

});