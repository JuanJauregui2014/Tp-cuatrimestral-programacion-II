import PedidoRetirar from "../../src/pedidos/pedido_retirar";

describe("Test de la clase PedidoRetirar", () => {
    const nroPedido = 12;
    const nombreCliente = "Mateo";
    const horarioARetirar = 22;

    let pedidoRetirar: PedidoRetirar;

    beforeEach(() => {
        pedidoRetirar = new PedidoRetirar(nroPedido, nombreCliente, horarioARetirar);
    });

    test("Verifico que sea instancia de PedidoRetirar", () => {
        expect(pedidoRetirar).toBeInstanceOf(PedidoRetirar);
    });

    test("Verifico que el pedido se haya creado con sus respectivos datos únicos correctamente", () => {
        expect(pedidoRetirar.getHorarioRetiro()).toEqual(horarioARetirar);
    });

    test("Verifico que puedo cambiar el horario de retiro ante un error de ingreso", () => {
        const nuevoHorarioDeRetiro = 23;
        pedidoRetirar.setHorarioRetiro(nuevoHorarioDeRetiro);

        expect(pedidoRetirar.getHorarioRetiro()).toEqual(nuevoHorarioDeRetiro);
    });

});