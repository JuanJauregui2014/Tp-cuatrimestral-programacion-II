import DescuentoEfectivo from "../../src/descuentos/descuento_efectivo";
import Pedido from "../../src/pedidos/pedido";
import MedioDePago from "../../src/medios_de_pago/medio_de_pago";

const PORCENTAJE_DESCUENTO = 0.1;

const crearPedidoMock = (tipoPago: string): Pedido => {
    const medioPagoMock = {
        getTipoDePago: jest.fn().mockReturnValue(tipoPago),
        procesarPago: jest.fn(),
    } as MedioDePago;

    return {
        getMedioDePago: jest.fn().mockReturnValue(medioPagoMock),
    } as unknown as Pedido;
};

describe("test de la clase DescuentoEfectivo", () => {
    test("crear un descuento con un porcentaje determinado", () => {
        const descuento = new DescuentoEfectivo(PORCENTAJE_DESCUENTO);
        expect(descuento.getPorcentaje()).toBe(PORCENTAJE_DESCUENTO);
    });

    test("aplicar descuento cuando el medio de pago es efectivo", () => {
        const descuento = new DescuentoEfectivo(PORCENTAJE_DESCUENTO);
        const pedido = crearPedidoMock("Efectivo");
        expect(descuento.aplicable(pedido)).toBe(true);
    });

    test("no aplicar descuento cuando el medio de pago no es efectivo", () => {
        const descuento = new DescuentoEfectivo(PORCENTAJE_DESCUENTO);
        const pedido = crearPedidoMock("Tarjeta de crédito");
        expect(descuento.aplicable(pedido)).toBe(false);
    });
});