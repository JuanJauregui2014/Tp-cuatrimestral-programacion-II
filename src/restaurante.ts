import Menu from "./menu";
import Estacion from "./estacion";
import Pedido from "./pedido";
import MedioDePago from "./medio_de_pago";

const VACIO = 0;

export default class Restaurante {
    private nombre: string;
    private menu: Menu;
    private estaciones: Estacion[];
    private pedidosActivos: Map<number, Pedido>;
    private pedidosFinalizados: Map<number, Pedido>;

    public constructor(nombre: string, menu: Menu, estaciones: Estacion[]) {
        this.nombre = nombre;
        this.menu = menu;
        this.estaciones = estaciones;
        this.pedidosActivos = new Map();
        this.pedidosFinalizados = new Map();
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getMenu(): Menu {
        return this.menu;
    }

    public getEstaciones(): Estacion[] {
        return this.estaciones;
    }

    public getPedidosActivos(): Map<number, Pedido> {
        return this.pedidosActivos;
    }

    public getPedidosFinalizados(): Map<number, Pedido> {
        return this.pedidosFinalizados;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setMenu(menu: Menu): void {
        this.menu = menu;
    }

    public setEstaciones(estaciones: Estacion[]): void {
        this.estaciones = estaciones;
    }

    public agregarPedido(pedido: Pedido): void {

        this.pedidosActivos.set(pedido.getNumeroPedido(), pedido);
    }

    public consultarHistorial(): void {

        if (this.pedidosFinalizados.size === VACIO) {
            throw new Error("No hay pedidos finalizados. No hay nada para mostrar");
        }

        this.pedidosFinalizados.forEach((pedido, nroDePedido) => {
            console.log(`Nro de pedido: ${nroDePedido} - Fecha: ${pedido.getFecha()}`);
            //Probablemente haya que cambiar esta linea más adelante
            //Porque getItems() te devuelve los objetos de tipo Item, nosé si se puedan imprimir
            //Pienso en hacer que items sea un Map en pedido y agregarle un nombre a Item para que sea la key, 
            //ya que también hay que manejar cantidad de items
            for (const item of pedido.getItems()) {
                console.log(`Elemento: ${item.getElemento().getNombre()} - Precio: ${item.getElemento().getPrecio()}`);
            }
            console.log(`Costo total del pedido: ${pedido.getTotalBruto()}`);
            console.log(`Descuento aplicado: ${pedido.getDescuento()}`);
            console.log(`Total abonado: ${pedido.getTotalCobrado()}`);
            //Total abonado falta desarrollar, ya que en pedido, al calcular el total, 
            //se deben ingresar medio de pago y dia, eso obstruye para agregarlo directamente acá
        });

    }

    public facturarPedido(nroDePedido: number, medioPago: MedioDePago): void {

        const pedido = this.pedidosActivos.get(nroDePedido);
        
        if (pedido === undefined) {
            throw new Error("No se encuentra el número de pedido ingresado");
        }

        if (!pedido.puedeFacturarse()) {
            throw new Error("No se puede facturar el pedido, sus items no estan terminados");
        }
        
        pedido.calcularTotalBruto();
        pedido.aplicarDescuento(medioPago);
        pedido.calcularTotalFinal();

        medioPago.procesarPago(pedido.getTotalCobrado()); // Procesa el pago seleccionado

        this.pedidosActivos.delete(nroDePedido); //Eliminamos el pedido de la lista de pedidos activos
        this.pedidosFinalizados.set(nroDePedido, pedido); //Y lo ingresamos a la lista de pedidos finalizados
    }

}