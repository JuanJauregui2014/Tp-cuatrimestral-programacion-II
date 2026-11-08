
import DistribuidorPedidos from "../../src/distribucion_item/distribuidor_pedido";
import PrimeraCompatible from "../../src/distribucion_item/primer_estacion";
import Estacion from "../../src/estacion/estacion";
import Categoria from "../../src/componentes_del_menu/categoria";
import Producto from "../../src/componentes_del_menu/producto";
import Combo from "../../src/componentes_del_menu/combo";
import ComboPrecioFijo from "../../src/combos/combo_preciofijo";
import Item from "../../src/items/item";
import EstadoItem from "../../src/items/estado_item";
import PedidoSalon from "../../src/pedidos/pedido_salon";
import EstadoPedido from "../../src/pedidos/estado_pedido";

const SIN_ITEMS = 0;
const PRECIO_HAMBURGUESA = 8000;
const PRECIO_LIMONADA = 3000;
const PRECIO_COMBO = 9000;
const PRECIO_PIZZA = 12000;
const UNA_UNIDAD = 1;
const DOS_UNIDADES = 2;
const ID_PEDIDO = UNA_UNIDAD;
const CANTIDAD_MESAS = 5;

// eslint-disable-next-line max-lines-per-function
describe("Test de DistribuidorPedidos", () => {

    let carnes: Categoria;
    let bebidas: Categoria;

    let parrilla: Estacion;
    let barra: Estacion;

    let hamburguesa: Producto;
    let limonada: Producto;

    let pedido: PedidoSalon;
    let distribuidor: DistribuidorPedidos;

    beforeEach(() => {
        carnes = new Categoria("Carnes");
        bebidas = new Categoria("Bebidas");

        parrilla = new Estacion("Parrilla", [carnes]);
        barra = new Estacion("Barra", [bebidas]);

        hamburguesa = new Producto("Hamburguesa", PRECIO_HAMBURGUESA, carnes);
        limonada = new Producto("Limonada", PRECIO_LIMONADA, bebidas);

        pedido = new PedidoSalon(ID_PEDIDO, "Juan", CANTIDAD_MESAS, "Pedro");

        distribuidor = new DistribuidorPedidos(
            new PrimeraCompatible()
        );
    });

    test("debe distribuir un producto individual a su estacion", () => {
        const item = new Item(UNA_UNIDAD, hamburguesa);
        pedido.agregarItem(item);

        distribuidor.distribuirPedido(pedido, [parrilla, barra]);

        expect(parrilla.getItems()).toContain(item);
        expect(barra.getItems()).toEqual([]);
        expect(pedido.getEstado()).toBe(EstadoPedido.CONFIRMADO);
    });

    test("debe distribuir distintos productos a sus estaciones", () => {
        const itemHamburguesa = new Item(UNA_UNIDAD, hamburguesa);
        const itemLimonada = new Item(UNA_UNIDAD, limonada);

        pedido.agregarItem(itemHamburguesa);
        pedido.agregarItem(itemLimonada);

        distribuidor.distribuirPedido(pedido, [parrilla, barra]);

        expect(parrilla.getItems()).toContain(itemHamburguesa);
        expect(barra.getItems()).toContain(itemLimonada);
    });

    test("debe distribuir los productos de un combo por separado", () => {
        const combo = new Combo(
            "Combo Almuerzo",
            [hamburguesa, limonada],
            new ComboPrecioFijo(PRECIO_COMBO)
        );

        const itemCombo = new Item(UNA_UNIDAD, combo);
        pedido.agregarItem(itemCombo);

        distribuidor.distribuirPedido(pedido, [parrilla, barra]);

        expect(parrilla.getItems()).toHaveLength(UNA_UNIDAD);
        expect(barra.getItems()).toHaveLength(UNA_UNIDAD);

        expect(parrilla.getItems()[0].getElemento()).toBe(hamburguesa);
        expect(barra.getItems()[0].getElemento()).toBe(limonada);

        // El pedido conserva el combo original.
        expect(pedido.getItems()[0]).toBe(itemCombo);
    });

    test("un combo debe estar listo solo cuando terminan todas sus preparaciones", () => {
        const combo = new Combo(
            "Combo Almuerzo",
            [hamburguesa, limonada],
            new ComboPrecioFijo(PRECIO_COMBO)
        );

        const itemCombo = new Item(UNA_UNIDAD, combo);
        pedido.agregarItem(itemCombo);

        distribuidor.distribuirPedido(pedido, [parrilla, barra]);

        const preparacionHamburguesa = parrilla.getItems()[0];
        const preparacionLimonada = barra.getItems()[0];

        parrilla.avanzarItem(preparacionHamburguesa);
        parrilla.avanzarItem(preparacionHamburguesa);

        expect(itemCombo.getEstado()).toBe(EstadoItem.EN_PREPARACION);
        expect(pedido.puedeFacturarse()).toBe(false);

        barra.avanzarItem(preparacionLimonada);
        barra.avanzarItem(preparacionLimonada);

        expect(itemCombo.getEstado()).toBe(EstadoItem.LISTO);
        expect(pedido.puedeFacturarse()).toBe(true);
    });

    test("debe respetar la cantidad solicitada de un combo", () => {
        const combo = new Combo(
            "Combo Almuerzo",
            [hamburguesa, limonada],
            new ComboPrecioFijo(PRECIO_COMBO)
        );

        const itemCombo = new Item(DOS_UNIDADES, combo);
        pedido.agregarItem(itemCombo);

        distribuidor.distribuirPedido(pedido, [parrilla, barra]);

        expect(parrilla.getItems()[0].getCantidad()).toBe(DOS_UNIDADES);
        expect(barra.getItems()[0].getCantidad()).toBe(DOS_UNIDADES);
    });

    test("debe rechazar un producto sin estacion compatible", () => {
        const pizzas = new Categoria("Pizzas");
        const pizza = new Producto("Pizza", PRECIO_PIZZA, pizzas);

        pedido.agregarItem(new Item(UNA_UNIDAD, pizza));

        expect(() =>
            distribuidor.distribuirPedido(pedido, [parrilla, barra])
        ).toThrow("No existe una estación compatible");

        expect(pedido.getEstado()).toBe(EstadoPedido.EN_CONSTRUCCION);
    });

    test("no debe distribuir parcialmente un pedido", () => {
        const pizzas = new Categoria("Pizzas");
        const pizza = new Producto("Pizza", PRECIO_PIZZA, pizzas);

        pedido.agregarItem(new Item(UNA_UNIDAD, hamburguesa));
        pedido.agregarItem(new Item(UNA_UNIDAD, pizza));

        expect(() =>
            distribuidor.distribuirPedido(pedido, [parrilla, barra])
        ).toThrow();

        expect(parrilla.getItems()).toHaveLength(SIN_ITEMS);
        expect(barra.getItems()).toHaveLength(SIN_ITEMS);
        expect(pedido.getEstado()).toBe(EstadoPedido.EN_CONSTRUCCION);
    });

    test("no debe confirmar un pedido vacio", () => {
        expect(() =>
            distribuidor.distribuirPedido(pedido, [parrilla, barra])
        ).toThrow("No se puede confirmar un pedido vacío");

        expect(pedido.getEstado()).toBe(EstadoPedido.EN_CONSTRUCCION);
    });

    test("no debe distribuir nuevamente un pedido confirmado", () => {
        const cantidadHamburguesas = UNA_UNIDAD;
        const unaPreparacion = UNA_UNIDAD;
        pedido.agregarItem(new Item(cantidadHamburguesas, hamburguesa));

        distribuidor.distribuirPedido(pedido, [parrilla, barra]);

        expect(() =>
            distribuidor.distribuirPedido(pedido, [parrilla, barra])
        ).toThrow("El pedido ya fue confirmado");

        expect(parrilla.getItems()).toHaveLength(unaPreparacion);
    });

});
