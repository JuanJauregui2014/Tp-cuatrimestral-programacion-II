import DescuentoEspecialDia from "../../src/descuentos/descuento_especial_dia";
import Pedido from "../../src/pedidos/pedido";
import DiaSemana from "../../src/dia_semana";

const PORCENTAJE_DESCUENTO = 0.2;

const crearPedidoMock = (dia: DiaSemana): Pedido => ({
    getFecha: jest.fn().mockReturnValue({
        getDay: jest.fn().mockReturnValue(dia),
    }),
} as unknown as Pedido);

describe("test de la clase DescuentoEspecialDia", () => {
    test("crear un descuento con un porcentaje determinado", () => {
        const descuento = new DescuentoEspecialDia(
            DiaSemana.MIERCOLES,
            PORCENTAJE_DESCUENTO
        );
        expect(descuento.getPorcentaje()).toBe(PORCENTAJE_DESCUENTO);
    });

    test("aplicar descuento cuando el pedido corresponde al día elegido", () => {
        const descuento = new DescuentoEspecialDia(
            DiaSemana.MIERCOLES,
            PORCENTAJE_DESCUENTO
        );
        const pedido = crearPedidoMock(DiaSemana.MIERCOLES);
        expect(descuento.aplicable(pedido)).toBe(true);
    });

    test("no aplicar descuento cuando el pedido corresponde a otro día", () => {
        const descuento = new DescuentoEspecialDia(
            DiaSemana.MIERCOLES,
            PORCENTAJE_DESCUENTO
        );
        const pedido = crearPedidoMock(DiaSemana.JUEVES);
        expect(descuento.aplicable(pedido)).toBe(false);
    });
});