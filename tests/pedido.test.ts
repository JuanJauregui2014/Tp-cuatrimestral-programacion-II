//import { mock, MockProxy } from "jest-mock-extended";
import Pedido from "../src/pedido";
import PedidoEnvioPropio from "../src/pedido_envio_propio";
import PedidoRetirar from "../src/pedido_retirar";
import PedidoSalon from "../src/pedido_salon";
import ElementoMenu from "../src/elemento_menu";
import Item from "../src/item";

const PRECIO_ELEMENTO = 300;

const crearElementoMock = (): ElementoMenu => ({
    getPrecio: jest.fn().mockReturnValue(PRECIO_ELEMENTO),
    getNombre: jest.fn().mockReturnValue("Elemento de prueba"),
});

// eslint-disable-next-line max-lines-per-function
describe("Test de la clase Pedido", () => {

    const nroPedidoSalon = 5;
    const nombreClienteSalon = "Pepe";
    const nroMesa = 2;
    const mozo = "Juan Manuel";

    const nroPedidoEnvio = 8;
    const nombreClienteEnvio = "Francisco";
    const costoEnvio = 6000;
    const direccion = "Carlos Villate 4480, Munro";

    const nroPedidoRetirar = 12;
    const nombreClienteRetirar = "Mateo";
    const horarioARetirar = 22;

    let pedidoSalon: Pedido;
    let pedidoEnvio: Pedido;
    let pedidoRetirar: Pedido;

    //let pedidoCompletoMock: MockProxy<Pedido>;

    beforeEach(() => {
        pedidoSalon = new PedidoSalon(nroPedidoSalon, nombreClienteSalon, nroMesa, mozo);
        pedidoEnvio = new PedidoEnvioPropio(nroPedidoEnvio, nombreClienteEnvio, costoEnvio, direccion);
        pedidoRetirar = new PedidoRetirar(nroPedidoRetirar, nombreClienteRetirar, horarioARetirar);
        //pedidoCompletoMock = mock<Pedido>();
    });

    test("Verifico que sea instancia de Pedido", () => {
        expect(pedidoSalon).toBeInstanceOf(Pedido);
        expect(pedidoEnvio).toBeInstanceOf(Pedido);
        expect(pedidoRetirar).toBeInstanceOf(Pedido);
    });

    test("Verifico que cada tipo de pedido se haya creado con sus respectivos datos correctamente", () => {
        const costoEnvioSalonYRetiro = 0;
        expect(pedidoSalon.getNumeroPedido()).toEqual(nroPedidoSalon);
        expect(pedidoSalon.getNombreCliente()).toEqual(nombreClienteSalon);
        expect(pedidoSalon.getCostoEnvio()).toEqual(costoEnvioSalonYRetiro);

        expect(pedidoEnvio.getNumeroPedido()).toEqual(nroPedidoEnvio);
        expect(pedidoEnvio.getNombreCliente()).toEqual(nombreClienteEnvio);
        expect(pedidoEnvio.getCostoEnvio()).toEqual(costoEnvio);

        expect(pedidoRetirar.getNumeroPedido()).toEqual(nroPedidoRetirar);
        expect(pedidoRetirar.getNombreCliente()).toEqual(nombreClienteRetirar);
        expect(pedidoRetirar.getCostoEnvio()).toEqual(costoEnvioSalonYRetiro);
    });

    test("El pedido se encuentra en construcción, por lo que no se pueden agregar más items", () => {
        const cantidadItemsItem1 = 4;
        const elemento1 = crearElementoMock();
        const itemNuevo1: Item = new Item(cantidadItemsItem1, elemento1);
        pedidoSalon.agregarItem(itemNuevo1);
        pedidoSalon.confirmarPedido();

        const cantidadItemsItem2 = 12;
        const elemento2 = crearElementoMock();
        const itemNuevo2: Item = new Item(cantidadItemsItem2, elemento2);
        expect(() =>
            pedidoSalon.agregarItem(itemNuevo2)
        ).toThrow("Pedido no se encuentra en construcción. No se puede agregar el item");
    });

    test("Verifico que, al agregar un item, se guarde en la lista de items", () => {
        const cantidadItems = 4;
        const elemento = crearElementoMock();
        const itemNuevo: Item = new Item(cantidadItems, elemento);
        pedidoSalon.agregarItem(itemNuevo);
        expect(pedidoSalon.getItems()[0]).toEqual(itemNuevo);
    })

    test("Verifico que, al agregar un item, se guarde en la lista de agregaciones por si se quiere deshacer", () => {
        const cantidadItems = 4;
        const elemento = crearElementoMock();
        const itemNuevo: Item = new Item(cantidadItems, elemento);
        pedidoEnvio.agregarItem(itemNuevo);
        expect(pedidoEnvio.getHistorialAgregaciones()[0]).toEqual(itemNuevo);
    })

    test("El pedido se encuentra en construcción, por lo que no se pueden eliminar más items", () => {
        const cantidadItemsItem1 = 4;
        const elemento1 = crearElementoMock();
        const itemNuevo1: Item = new Item(cantidadItemsItem1, elemento1);
        pedidoSalon.agregarItem(itemNuevo1);
        pedidoSalon.confirmarPedido();

        const itemAEliminar = itemNuevo1;
        expect(() =>
            pedidoSalon.quitarItem(itemAEliminar)
        ).toThrow("Pedido no se encuentra en construcción. No se puede eliminar el item");
    });

    test("El item ya pasó a preparación, por lo que no se puede eliminar", () => {
        const cantidadItemsItem1 = 4;
        const elemento1 = crearElementoMock();
        const itemNuevo1: Item = new Item(cantidadItemsItem1, elemento1);
        pedidoSalon.agregarItem(itemNuevo1);

        pedidoSalon.confirmarPedido();
        itemNuevo1.avanzarEstado();

        const itemAEliminar = itemNuevo1;
        expect(() =>
            pedidoSalon.quitarItem(itemAEliminar)
        ).toThrow("Item ya pasó a preparación. No se puede modificar");
    });

    test("Verifico que, al eliminar un item, se borre de la lista de items sin perder los demás", () => {
        const cantidadItems1 = 4;
        const elemento1 = crearElementoMock();
        const itemNuevo1: Item = new Item(cantidadItems1, elemento1);
        pedidoSalon.agregarItem(itemNuevo1)

        const cantidadItems2 = 2;
        const elemento2 = crearElementoMock();
        const itemNuevo2: Item = new Item(cantidadItems2, elemento2);
        pedidoSalon.agregarItem(itemNuevo2);

        const itemAEliminar = itemNuevo1;
        pedidoSalon.quitarItem(itemAEliminar);

        expect(pedidoSalon.getItems()[0]).toEqual(itemNuevo2);
        // De esta forma verifico que se eliminó el primer item cargado y el segundo ocupó su lugar en la lista
    })

    test("Verifico que, al eliminar un item, se guarde el mismo y su poisición actual por si se quiere deshacer", () =>{
        const cantidadItems1 = 4;
        const elemento1 = crearElementoMock();
        const itemNuevo1: Item = new Item(cantidadItems1, elemento1);
        pedidoEnvio.agregarItem(itemNuevo1)

        const cantidadItems2 = 2;
        const elemento2 = crearElementoMock();
        const itemNuevo2: Item = new Item(cantidadItems2, elemento2);
        pedidoEnvio.agregarItem(itemNuevo2);

        const itemAEliminar = itemNuevo1;
        const posicionDeItemEsperada = 0;
        pedidoEnvio.quitarItem(itemAEliminar);

        pedidoEnvio.quitarItem(itemAEliminar);
        expect(pedidoEnvio.getHistorialEliminaciones()[0]).toEqual(itemNuevo1);
        expect(pedidoEnvio.getPosicionesDeEliminaciones()[0]).toEqual(posicionDeItemEsperada);
    })

});