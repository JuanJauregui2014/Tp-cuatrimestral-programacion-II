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
        const cantidadItem1 = 4;
        const elemento1 = crearElementoMock();
        const itemNuevo1: Item = new Item(cantidadItem1, elemento1);
        pedidoSalon.agregarItem(itemNuevo1);
        pedidoSalon.confirmarPedido();

        const cantidadItem2 = 12;
        const elemento2 = crearElementoMock();
        const itemNuevo2: Item = new Item(cantidadItem2, elemento2);
        expect(() =>
            pedidoSalon.agregarItem(itemNuevo2)
        ).toThrow("Pedido no se encuentra en construcción. No se puede agregar el item");
    });

    test("Verifico que, al agregar un item, se guarde en la lista de items", () => {
        const cantidadItem = 4;
        const elemento = crearElementoMock();
        const itemNuevo: Item = new Item(cantidadItem, elemento);
        pedidoSalon.agregarItem(itemNuevo);
        expect(pedidoSalon.getItems()[0]).toEqual(itemNuevo);
    })

    test("Verifico que, al agregar un item, se guarde en la lista de agregaciones por si se quiere deshacer", () => {
        const cantidadItem = 4;
        const elemento = crearElementoMock();
        const itemNuevo: Item = new Item(cantidadItem, elemento);
        pedidoEnvio.agregarItem(itemNuevo);
        expect(pedidoEnvio.getHistorialAgregaciones()[0]).toEqual(itemNuevo);
    })

    test("El pedido se encuentra en construcción, por lo que no se pueden eliminar más items", () => {
        const cantidadItem1 = 4;
        const elemento1 = crearElementoMock();
        const itemNuevo1: Item = new Item(cantidadItem1, elemento1);
        pedidoSalon.agregarItem(itemNuevo1);
        pedidoSalon.confirmarPedido();

        const itemAEliminar = itemNuevo1;
        expect(() =>
            pedidoSalon.quitarItem(itemAEliminar)
        ).toThrow("Pedido no se encuentra en construcción. No se puede eliminar el item");
    });

    test("El item ya pasó a preparación, por lo que no se puede eliminar", () => {
        const cantidadItem1 = 4;
        const elemento1 = crearElementoMock();
        const itemNuevo1: Item = new Item(cantidadItem1, elemento1);
        pedidoSalon.agregarItem(itemNuevo1);

        pedidoSalon.confirmarPedido();
        itemNuevo1.avanzarEstado();

        const itemAEliminar = itemNuevo1;
        expect(() =>
            pedidoSalon.quitarItem(itemAEliminar)
        ).toThrow("Item ya pasó a preparación. No se puede modificar");
    });

    test("Verifico que, al eliminar un item, se borre de la lista de items sin perder los demás", () => {
        const cantidadItem1 = 4;
        const elemento1 = crearElementoMock();
        const itemNuevo1: Item = new Item(cantidadItem1, elemento1);
        pedidoSalon.agregarItem(itemNuevo1)

        const cantidadItem2 = 2;
        const elemento2 = crearElementoMock();
        const itemNuevo2: Item = new Item(cantidadItem2, elemento2);
        pedidoSalon.agregarItem(itemNuevo2);

        const itemAEliminar = itemNuevo1;
        pedidoSalon.quitarItem(itemAEliminar);

        expect(pedidoSalon.getItems()[0]).toEqual(itemNuevo2);
        // De esta forma verifico que se eliminó el primer item cargado y el segundo ocupó su lugar en la lista
    })

    test("Verifico que, al eliminar un item, se guarde el mismo y su poisición actual por si se quiere deshacer", () =>{
        const cantidadItem1 = 4;
        const elemento1 = crearElementoMock();
        const itemNuevo1: Item = new Item(cantidadItem1, elemento1);
        pedidoEnvio.agregarItem(itemNuevo1)

        const cantidadItems2 = 2;
        const elemento2 = crearElementoMock();
        const itemNuevo2: Item = new Item(cantidadItems2, elemento2);
        pedidoEnvio.agregarItem(itemNuevo2);

        const itemAEliminar = itemNuevo2;
        const posicionDeItemEsperada = 1;
        pedidoEnvio.quitarItem(itemAEliminar);

        expect(pedidoEnvio.getHistorialEliminaciones()[0]).toEqual(itemNuevo2);
        expect(pedidoEnvio.getPosicionesDeEliminaciones()[0]).toEqual(posicionDeItemEsperada);
    })

    test("No se puede deshacer una agregación si el pedido ya no está en construcción", () => {
        const cantidadItem1 = 4;
        const elemento1 = crearElementoMock();
        const itemNuevo1: Item = new Item(cantidadItem1, elemento1);
        pedidoEnvio.agregarItem(itemNuevo1)

        const cantidadItem2 = 2;
        const elemento2 = crearElementoMock();
        const itemNuevo2: Item = new Item(cantidadItem2, elemento2);
        pedidoEnvio.agregarItem(itemNuevo2);

        pedidoEnvio.confirmarPedido();

        expect(() => 
            pedidoEnvio.deshacerAgregacion()
        ).toThrow("Pedido no se encuentra en construcción. No se puede deshacer las modificaciones")
    });

    test("No se puede deshacer una agregación si todavía no se agregó nada al pedido", () => {
        expect(() => pedidoEnvio.deshacerAgregacion()).toThrow("No se realizo ninguna modificación para deshacer");
    });

    test("Verifico que, al deshacer una agregación, el ultimo item desaparezca. Incluso si son dos seguidos", () => {
        const cantidadItem1 = 4;
        const elemento1 = crearElementoMock();
        const itemNuevo1: Item = new Item(cantidadItem1, elemento1);
        pedidoRetirar.agregarItem(itemNuevo1);

        const cantidadItem2 = 2;
        const elemento2 = crearElementoMock();
        const itemNuevo2: Item = new Item(cantidadItem2, elemento2);
        pedidoRetirar.agregarItem(itemNuevo2);

        const cantidadItem3 = 2;
        const elemento3 = crearElementoMock();
        const itemNuevo3: Item = new Item(cantidadItem3, elemento3);
        pedidoRetirar.agregarItem(itemNuevo3);

        pedidoRetirar.deshacerAgregacion();
        pedidoRetirar.deshacerAgregacion();
        // Al deshacer las ultimas dos agregaciones, solo nos queda el primer item en la lista.
        // Esto demuestra el correcto funcionamiento del historial de agregaciones.
        expect(pedidoRetirar.getItems()).toEqual([itemNuevo1]);
    });

    test("No se puede deshacer una eliminación si el pedido ya no está en construcción", () => {
        const cantidadItem1 = 4;
        const elemento1 = crearElementoMock();
        const itemNuevo1: Item = new Item(cantidadItem1, elemento1);
        pedidoRetirar.agregarItem(itemNuevo1)

        const cantidadItem2 = 2;
        const elemento2 = crearElementoMock();
        const itemNuevo2: Item = new Item(cantidadItem2, elemento2);
        pedidoRetirar.agregarItem(itemNuevo2);

        pedidoRetirar.quitarItem(itemNuevo1);

        pedidoRetirar.confirmarPedido();

        expect(() => 
            pedidoRetirar.deshacerEliminacion()
        ).toThrow("Pedido no se encuentra en construcción. No se puede deshacer las modificaciones")
    });

    test("No se puede deshacer una eliminación si todavía no se eliminó nada del pedido", () => {
        expect(() => pedidoRetirar.deshacerEliminacion()).toThrow("No se realizo ninguna modificación para deshacer");
    });

    test("Verifico que, al deshacer una eliminación, se reinserte el item eliminado. Incluso si son dos seguidos",
         () => {
        const cantidadItem1 = 4;
        const elemento1 = crearElementoMock();
        const itemNuevo1: Item = new Item(cantidadItem1, elemento1);
        pedidoRetirar.agregarItem(itemNuevo1);

        const cantidadItem2 = 2;
        const elemento2 = crearElementoMock();
        const itemNuevo2: Item = new Item(cantidadItem2, elemento2);
        pedidoRetirar.agregarItem(itemNuevo2);

        const cantidadItem3 = 2;
        const elemento3 = crearElementoMock();
        const itemNuevo3: Item = new Item(cantidadItem3, elemento3);
        pedidoRetirar.agregarItem(itemNuevo3);

        pedidoRetirar.quitarItem(itemNuevo1);
        pedidoRetirar.quitarItem(itemNuevo3);

        pedidoRetirar.deshacerEliminacion();
        pedidoRetirar.deshacerEliminacion();

        expect(pedidoRetirar.getItems()).toEqual([itemNuevo1, itemNuevo2, itemNuevo3]);
        /*  
            Al deshacer las ultimas dos eliminaciones, se reinsertan ambos items previamente eliminados
            y mantienen la ubicación que tenían anteriormente. Esto deja en visto el correcto funcionamiento 
            del historial de eliminaciones y de las posiciones en la que se encontraban los items previamente
            eliminados. 
        */
        
    });

    test("Verifico que un pedido se pueda facturar si sus items están listos", () => {
        const cantidadItem1 = 3;
        const elemento1 = crearElementoMock();
        const itemNuevo1: Item = new Item(cantidadItem1, elemento1);
        pedidoRetirar.agregarItem(itemNuevo1);

        const cantidadItem2 = 6;
        const elemento2 = crearElementoMock();
        const itemNuevo2: Item = new Item(cantidadItem2, elemento2);
        pedidoRetirar.agregarItem(itemNuevo2);

        expect(pedidoRetirar.puedeFacturarse()).toEqual(false);
        // Verificamos que si los items no están listos, retorna false.

        itemNuevo1.avanzarEstado();
        itemNuevo1.avanzarEstado();

        itemNuevo2.avanzarEstado();
        itemNuevo2.avanzarEstado();
        //Avanzo dos veces el estado de los items para que estén LISTOS.

        expect(pedidoRetirar.puedeFacturarse()).toEqual(true);
        // Verificamos que si los items están listos, retorna true.
    });

    test("Verifico el calculo correcto del total bruto del pedido", () => {
        const cantidadItem1 = 3;
        const elemento1 = crearElementoMock();
        const itemNuevo1: Item = new Item(cantidadItem1, elemento1);
        pedidoEnvio.agregarItem(itemNuevo1);

        const cantidadItem2 = 6;
        const elemento2 = crearElementoMock();
        const itemNuevo2: Item = new Item(cantidadItem2, elemento2);
        pedidoEnvio.agregarItem(itemNuevo2);

        /* Calculamos el resultado directamente, porque ya se verifica si se puede facturar en
           la clase restaurante. */
        
        const totalBrutoEsperado = elemento1.getPrecio() * cantidadItem1 + elemento2.getPrecio() * cantidadItem2;
        pedidoEnvio.calcularTotalBruto();

        expect(pedidoEnvio.getTotalBruto()).toEqual(totalBrutoEsperado + costoEnvio);
        //Como estamos probando un pedido con envío, le sumamos eso al valor esperado.
        //A su vez verificamos que se diferencia el total bruto dependiendo el tipo de pedido.
    });

});