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
        const descuento = new DescuentoEfectivo();
        const pedido = crearPedidoMock("Efectivo", 10000);
        expect(descuento.aplicable(pedido)).toBe(true);
    });

    test("no aplicar descuento cuando el medio de pago no es efectivo", () => {
        const descuento = new DescuentoEfectivo();
        const pedido = crearPedidoMock("Tarjeta de crédito", 10000);
        expect(descuento.aplicable(pedido)).toBe(false);
    });

    test("calcular el descuento del 10 por ciento sobre el total bruto", () => {
        const descuento = new DescuentoEfectivo();
        const pedido = crearPedidoMock("Efectivo", 10000);
        expect(descuento.calcularMontoDescuento(pedido)).toBe(1000);
    });

    test("calcular el descuento sobre un total bruto diferente", () => {
        const descuento = new DescuentoEfectivo();
        const pedido = crearPedidoMock("Efectivo", 20000);
        expect(descuento.calcularMontoDescuento(pedido)).toBe(2000);
    });

    test("calcular descuento cero cuando el total bruto es cero", () => {
        const descuento = new DescuentoEfectivo();
        const pedido = crearPedidoMock("Efectivo", 0);
        expect(descuento.calcularMontoDescuento(pedido)).toBe(0);
    });
});