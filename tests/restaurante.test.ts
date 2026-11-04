import PedidoSalon from "../src/#pedido_salon";
import Categoria from "../src/categoria";
import Efectivo from "../src/efectivo";
import Estacion from "../src/estacion";
import Menu from "../src/menu";
import Restaurante from "../src/restaurante";
import { pedidoCompletoMock } from "./mocks";

// eslint-disable-next-line max-lines-per-function
describe("Test de la clase restaurante", () => {

    const categoriaPostres = new Categoria("Postres");
    const categoriaCarnes = new Categoria("Carnes");
    const categoriasParaCocinar = [categoriaPostres, categoriaCarnes];
    const menu = new Menu();
    const estacionCocina = new Estacion("Cocina", categoriasParaCocinar);
    const estaciones = [estacionCocina];
    let restaurante: Restaurante;

    beforeEach(() => {
        restaurante = new Restaurante("Parrilla lo de Pepe", menu, estaciones);
    });

    test("Verifico que sea instancia de Restaurante", () => {
        expect(restaurante).toBeInstanceOf(Restaurante);
    });

    test("Verifico que se haya creado el restaurante con su nombre, menú y estaciones", () => {
        expect(restaurante.getNombre()).toEqual("Parrilla lo de Pepe");
        expect(restaurante.getMenu()).toEqual(menu);
        expect(restaurante.getEstaciones()).toEqual(estaciones);
    });

    test("Verifico que un pedido se haya agregado a la lista de pedidos activos", () => {
        const nroMesa = 5;
        const nroPedido = 1;
        const pedido = new PedidoSalon(nroPedido, "Juan", nroMesa, "Pedro");

        restaurante.agregarPedido(pedido);

        const listaVacia = 0;
        //Primero que no esté vacío el map
        expect(restaurante.getPedidosActivos().size).toBeGreaterThan(listaVacia);

        //Segundo verificamos que se haya guardado el primer pedido cargado
        expect(restaurante.getPedidosActivos().get(nroPedido)).toEqual(pedido);
    });

    test("No hay pedidos finalizados por lo que no se puede mostrar el historial", () => {
        //Si no hay ningún pedido facturado y cargado en la lista de finalizados, debería lanzar un mensaje de error
        expect(() => restaurante.consultarHistorial()).toThrow("No hay pedidos finalizados. No hay nada para mostrar");
    });

    test("El pedido que se desea facturar no existe", () => {
        const nroMesa = 2;
        const nroPedido = 3;
        const pedido = new PedidoSalon(nroPedido, "Pablo", nroMesa, "Gustavo");

        restaurante.agregarPedido(pedido);

        const metodoPago: Efectivo = new Efectivo();
        const nroPedidoFactura = 6;
        // eslint-disable-next-line @stylistic/max-len
        expect(() => restaurante.facturarPedido(nroPedidoFactura, metodoPago)).toThrow("No se encuentra el número de pedido ingresado");
    });

    test("El pedido que se desea facturar no tiene sus items listos", () => {
       
        restaurante.agregarPedido(pedidoCompletoMock);

        pedidoCompletoMock.puedeFacturarse.mockReturnValue(false);

        const metodoPago: Efectivo = new Efectivo();
        const nroPedidoFactura = pedidoCompletoMock.getNumeroPedido();
        // eslint-disable-next-line @stylistic/max-len
        expect(() => restaurante.facturarPedido(nroPedidoFactura, metodoPago)).toThrow("No se puede facturar el pedido, sus items no estan terminados");
    });

});