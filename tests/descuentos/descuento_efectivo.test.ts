import DescuentoEfectivo from "../../src/descuentos/descuento-efectivo";
import Pedido from "../../src/pedidos/pedido";
import MedioDePago from "../../src/medios_de_pago/medio_de_pago";

const PORCENTAJE_DESCUENTO = 0.1;

const crearPedidoMock = (tipoPago: string, totalBruto: number): Pedido => {
    const medioPagoMock = {
        getTipoDePago: jest.fn().mockReturnValue(tipoPago),
        procesarPago: jest.fn(),
    } as MedioDePago;

    return {
        getMedioDePago: jest.fn().mockReturnValue(medioPagoMock),
        getTotalBruto: jest.fn().mockReturnValue(totalBruto),
    } as unknown as Pedido;
};

describe("test de la clase DescuentoEfectivo", () => {
    test("aplicar descuento cuando el medio de pago es efectivo", () => {
        const descuento = new DescuentoEfectivo(PORCENTAJE_DESCUENTO);
        const bruto = 10000;
        const pedido = crearPedidoMock("Efectivo", bruto);
        expect(descuento.aplicable(pedido)).toBe(true);
    });

    test("no aplicar descuento cuando el medio de pago no es efectivo", () => {
        const descuento = new DescuentoEfectivo(PORCENTAJE_DESCUENTO);
        const bruto = 10000;
        const pedido = crearPedidoMock("Tarjeta de crédito", bruto);
        expect(descuento.aplicable(pedido)).toBe(false);
    });
});