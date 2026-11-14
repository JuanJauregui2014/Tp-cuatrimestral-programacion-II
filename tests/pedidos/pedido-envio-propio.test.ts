import PedidoEnvioPropio from "../../src/pedidos/pedido_envio_propio";

describe("Test de la clase PedidoEnvioPropio", () => {
    const nroPedido = 8;
    const nombreCliente = "Francisco";
    const costoEnvio = 6000;
    const direccion = "Carlos Villate 4480, Munro";

    let pedidoEnvio: PedidoEnvioPropio;

    beforeEach(() => {
        pedidoEnvio = new PedidoEnvioPropio(nroPedido, nombreCliente, costoEnvio, direccion);
    });

    test("Verifico que sea instancia de PedidoEnvioPropio", () => {
        expect(pedidoEnvio).toBeInstanceOf(PedidoEnvioPropio);
    });

    test("Verifico que el pedido se haya creado con sus respectivos datos únicos correctamente", () => {
        expect(pedidoEnvio.getDireccion()).toEqual(direccion);
    });

    test("Verifico que puedo cambiar la dirección del envío ante un error de ingreso", () => {
        const nuevaDireccion = "Mozart 2300, Cdad. Autónoma de Buenos Aires";
        pedidoEnvio.setDireccion(nuevaDireccion);

        expect(pedidoEnvio.getDireccion()).toEqual(nuevaDireccion);
    });

});