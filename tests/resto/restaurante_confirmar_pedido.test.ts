/* eslint-disable @typescript-eslint/naming-convention */
import Restaurante from "../../src/restaurante";
import Menu from "../../src/menu";
import Estacion from "../../src/estacion/estacion";
import Categoria from "../../src/componentes_del_menu/categoria";
import Producto from "../../src/componentes_del_menu/producto";
import Item from "../../src/items/item";
import PedidoSalon from "../../src/pedidos/pedido_salon";
import EstadoPedido from "../../src/pedidos/estado_pedido";
import DistribuidorPedidos from "../../src/distribucion_item/distribuidor_pedido";
import PrimeraCompatible from "../../src/distribucion_item/primer_estacion";

// eslint-disable-next-line max-lines-per-function
describe("Confirmacion y distribucion desde Restaurante", () => {

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const PRECIO_HAMBURGUESA = 8000;
    const PRECIO_LIMONADA = 3000;
    const PRECIO_PIZZA = 12000;
    const NUMERO_MESA = 5;
    const NUMERO_MESA_DISTRIBUCION = 3;
    const NUMERO_MESA_SIN_ESTACION = 4;
    const NUMERO_PEDIDO_INICIAL = 1;
    const NUMERO_PEDIDO_DISTRIBUCION = 2;
    const NUMERO_PEDIDO_SIN_ESTACION = 3;
    const NUMERO_PEDIDO_INEXISTENTE = 999;
    const CANTIDAD_ITEM = 1;
    const CANTIDAD_ITEMS_ESTACION_VACIA = 0;

    let restaurante: Restaurante;
    let distribuidor: DistribuidorPedidos;
    let parrilla: Estacion;
    let barra: Estacion;
    let carnes: Categoria;
    let bebidas: Categoria;

    beforeEach(() => {
        carnes = new Categoria("Carnes");
        bebidas = new Categoria("Bebidas");

        parrilla = new Estacion("Parrilla", [carnes]);
        barra = new Estacion("Barra", [bebidas]);

        restaurante = new Restaurante(
            "Fogon del Barrio",
            new Menu(),
            [parrilla, barra],
            []
        );

        distribuidor = new DistribuidorPedidos(
            new PrimeraCompatible()
        );
    });

    test("debe confirmar y distribuir un pedido", () => {
        const pedido = new PedidoSalon(NUMERO_PEDIDO_INICIAL, "Juan", NUMERO_MESA, "Pedro");
        const hamburguesa = new Producto("Hamburguesa", PRECIO_HAMBURGUESA, carnes);
        const item = new Item(CANTIDAD_ITEM, hamburguesa);

        pedido.agregarItem(item);
        restaurante.agregarPedido(pedido);

        restaurante.confirmarPedido(NUMERO_PEDIDO_INICIAL, distribuidor);

        expect(pedido.getEstado()).toBe(EstadoPedido.CONFIRMADO);
        expect(parrilla.getItems()).toContain(item);
        expect(barra.getItems()).toHaveLength(CANTIDAD_ITEMS_ESTACION_VACIA);
    });

    test("debe distribuir productos a diferentes estaciones", () => {
        const pedido = new PedidoSalon(NUMERO_PEDIDO_DISTRIBUCION, "Maria", NUMERO_MESA_DISTRIBUCION, "Pedro");

        const hamburguesa = new Producto("Hamburguesa", PRECIO_HAMBURGUESA, carnes);
        const limonada = new Producto("Limonada", PRECIO_LIMONADA, bebidas);

        const item1 = new Item(CANTIDAD_ITEM, hamburguesa);
        const item2 = new Item(CANTIDAD_ITEM, limonada);

        pedido.agregarItem(item1);
        pedido.agregarItem(item2);
        restaurante.agregarPedido(pedido);

        restaurante.confirmarPedido(NUMERO_PEDIDO_DISTRIBUCION, distribuidor);

        expect(parrilla.getItems()).toContain(item1);
        expect(barra.getItems()).toContain(item2);
    });

    test("debe lanzar error si el pedido no existe", () => {
        expect(() => {
            restaurante.confirmarPedido(
                NUMERO_PEDIDO_INEXISTENTE,
                distribuidor
            );
        }).toThrow("no se encuentra el pedido con el numero ingresado");
    });

    test("no debe confirmar un pedido sin estacion compatible", () => {
        const pedido = new PedidoSalon(NUMERO_PEDIDO_SIN_ESTACION, "Lucas", NUMERO_MESA_SIN_ESTACION, "Pedro");

        const pizzas = new Categoria("Pizzas");
        const pizza = new Producto("Pizza", PRECIO_PIZZA, pizzas);

        pedido.agregarItem(new Item(CANTIDAD_ITEM, pizza));
        restaurante.agregarPedido(pedido);

        expect(() => {
            restaurante.confirmarPedido(NUMERO_PEDIDO_SIN_ESTACION, distribuidor);
        }).toThrow("No existe una estación compatible");

        expect(pedido.getEstado()).toBe(EstadoPedido.EN_CONSTRUCCION);
        expect(parrilla.getItems()).toHaveLength(CANTIDAD_ITEMS_ESTACION_VACIA);
    });

    test("no debe confirmar dos veces el mismo pedido", () => {
        const numeroPedido = 4;
        const numeroMesa = 2;
        const pedido = new PedidoSalon(numeroPedido, "Ana", numeroMesa, "Pedro");
        const hamburguesa = new Producto("Hamburguesa", PRECIO_HAMBURGUESA, carnes);
        const cantidadEsperadaEnParrilla = 1;

        pedido.agregarItem(new Item(CANTIDAD_ITEM, hamburguesa));
        restaurante.agregarPedido(pedido);

        restaurante.confirmarPedido(numeroPedido, distribuidor);

        expect(() => {
            restaurante.confirmarPedido(numeroPedido, distribuidor);
        }).toThrow("El pedido ya fue confirmado");

        expect(parrilla.getItems()).toHaveLength(cantidadEsperadaEnParrilla);
    });

});
