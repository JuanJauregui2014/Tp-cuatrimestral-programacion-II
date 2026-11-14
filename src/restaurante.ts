import Menu from "./menu";
import Estacion from "./estacion/estacion";
import Pedido from "./pedidos/pedido";
import MedioDePago from "./medios_de_pago/medio_de_pago";
import Descuento from "./descuentos/descuento";
import DistribuidorPedidos from "./distribucion_item/distribuidor_pedido";
const VACIO = 0;

/**
 * Representa el restaurante y centraliza la administración del menú, las estaciones, los pedidos y los descuentos.
 */
export default class Restaurante {
    private nombre: string;
    private menu: Menu;
    private estaciones: Estacion[];
    private pedidosActivos: Map<number, Pedido>;
    private pedidosFinalizados: Map<number, Pedido>;
    private descuentos: Descuento[];

/**
 * Inicializa la instancia con los datos necesarios.
 * @param nombre - Parámetro de tipo string utilizado por la operación.
 * @param menu - Parámetro de tipo Menu utilizado por la operación.
 * @param estaciones - Parámetro de tipo Estacion[] utilizado por la operación.
 * @param descuentos - Parámetro de tipo Descuento[] utilizado por la operación.
 */
    public constructor(nombre: string, menu: Menu, estaciones: Estacion[], descuentos: Descuento[]) {
        this.nombre = nombre;
        this.menu = menu;
        this.estaciones = estaciones;
        this.pedidosActivos = new Map();
        this.pedidosFinalizados = new Map();
        this.descuentos = descuentos;
    }

/**
 * Devuelve nombre.
 * @returns string con el resultado de la operación.
 */
    public getNombre(): string {
        return this.nombre;
    }

/**
 * Devuelve menu.
 * @returns Menu con el resultado de la operación.
 */
    public getMenu(): Menu {
        return this.menu;
    }

/**
 * Devuelve estaciones.
 * @returns Estacion[] con el resultado de la operación.
 */
    public getEstaciones(): Estacion[] {
        return this.estaciones;
    }

/**
 * Devuelve pedidosactivos.
 * @returns Map<number, con el resultado de la operación.
 */
    public getPedidosActivos(): Map<number, Pedido> {
        return this.pedidosActivos;
    }

/**
 * Devuelve pedidosfinalizados.
 * @returns Map<number, con el resultado de la operación.
 */
    public getPedidosFinalizados(): Map<number, Pedido> {
        return this.pedidosFinalizados;
    }

/**
 * Devuelve descuentos.
 * @returns Descuento[] con el resultado de la operación.
 */
    public getDescuentos(): Descuento[] {
        return this.descuentos;
    }

/**
 * Actualiza nombre.
 * @param nombre - Parámetro de tipo string utilizado por la operación.
 */
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

/**
 * Actualiza menu.
 * @param menu - Parámetro de tipo Menu utilizado por la operación.
 */
    public setMenu(menu: Menu): void {
        this.menu = menu;
    }

/**
 * Actualiza estaciones.
 * @param estaciones - Parámetro de tipo Estacion[] utilizado por la operación.
 */
    public setEstaciones(estaciones: Estacion[]): void {
        this.estaciones = estaciones;
    }

/**
 * Registra un nuevo pedido entre los pedidos activos del restaurante.
 * @param pedido - Parámetro de tipo Pedido utilizado por la operación.
 */
    public agregarPedido(pedido: Pedido): void {

        this.pedidosActivos.set(pedido.getNumeroPedido(), pedido);
    }

/**
 * Confirma el pedido e inicia su proceso de preparación.
 * @param nroDePedido - Parámetro de tipo number utilizado por la operación.
 * @param distribuidor - Parámetro de tipo DistribuidorPedidos utilizado por la operación.
 * @throws {Error} Si no se cumplen las condiciones necesarias para realizar la operación.
 */
    public confirmarPedido(nroDePedido: number, distribuidor: DistribuidorPedidos): void {
        //buscamos el pedido entre los activos
        const pedido = this.pedidosActivos.get(nroDePedido);
        //si no lo encontramos lanzamos un error
        if (!pedido) {
            throw new Error("no se encuentra el pedido con el numero ingresado");
        }
        //llamamos al distribuidor para confirmar el pedido
        distribuidor.distribuirPedido(pedido, this.estaciones);
    }

/**
 * Devuelve el historial de pedidos finalizados.
 * @returns Map<number, con el resultado de la operación.
 */
    public consultarHistorial(): Map<number, Pedido> {

        if (this.pedidosFinalizados.size === VACIO) {
            throw new Error("No hay pedidos finalizados. No hay nada para mostrar");
        }

        return this.getPedidosFinalizados();

    }

/**
 * Calcula los importes, procesa el pago y mueve el pedido al historial de finalizados.
 * @param nroDePedido - Parámetro de tipo number utilizado por la operación.
 * @param medioPago - Parámetro de tipo MedioDePago utilizado por la operación.
 * @throws {Error} Si no se cumplen las condiciones necesarias para realizar la operación.
 */
    public facturarPedido(nroDePedido: number, medioPago: MedioDePago): void {

        const pedido = this.pedidosActivos.get(nroDePedido);
        
        if (pedido === undefined) {
            throw new Error("No se encuentra el número de pedido ingresado");
        }

        if (!pedido.puedeFacturarse()) {
            throw new Error("No se puede facturar el pedido, sus items no estan terminados");
        }
        
        pedido.calcularTotalBruto();
        pedido.setMedioDePago(medioPago);
        pedido.aplicarDescuento(this.descuentos);
        pedido.calcularTotalFinal();

        medioPago.procesarPago(pedido.getTotalCobrado()); // Procesa el pago seleccionado

        this.pedidosActivos.delete(nroDePedido); //Eliminamos el pedido de la lista de pedidos activos
        this.pedidosFinalizados.set(nroDePedido, pedido); //Y lo ingresamos a la lista de pedidos finalizados
    }

}