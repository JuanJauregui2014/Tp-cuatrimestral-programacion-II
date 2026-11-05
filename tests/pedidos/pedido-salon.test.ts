import PedidoSalon from "../../src/pedidos/pedido_salon";

describe("Test de la clase PedidoSalon", () => {
    const nroPedido = 5;
    const nombreCliente = "Pepe";
    const nroMesa = 2;
    const mozo = "Juan Manuel";

    let pedidoSalon: PedidoSalon;

    beforeEach(() => {
        pedidoSalon = new PedidoSalon(nroPedido, nombreCliente, nroMesa, mozo);
    });

    test("Verifico que sea instancia de PedidoSalon", () => {
        expect(pedidoSalon).toBeInstanceOf(PedidoSalon);
    });

    test("Verifico que el pedido se haya creado con sus respectivos datos únicos correctamente", () => {
        expect(pedidoSalon.getNumeroMesa()).toEqual(nroMesa);
        expect(pedidoSalon.getMozo()).toEqual(mozo);
    });

    test("Verifico que puedo cambiar el número de mesa y el mozo ante un error de ingreso", () => {
        const nuevoNroMesa = 4;
        const nuevoMozo = "Javier";
        pedidoSalon.setNumeroMesa(nuevoNroMesa);
        pedidoSalon.setMozo(nuevoMozo);

        expect(pedidoSalon.getNumeroMesa()).toEqual(nuevoNroMesa);
        expect(pedidoSalon.getMozo()).toEqual(nuevoMozo);
    });

});