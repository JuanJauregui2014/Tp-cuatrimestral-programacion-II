import Menu from "./menu";
import Estacion from ./estacion;
import Pedido from "./#pedido";

export default class Restaurante {
    private nombre: string;
    private menu: Menu;
    private estaciones: Map<string, Estacion>;
    private pedidosActivos: Map<number, Pedido>;
    private pedidosFinalizados: Map<number, Pedido>;

    constructor(nombre: string, menu: Menu, estaciones: Map<string, Estacion>) {
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

    public getEstaciones(): Map<string, Estacion> {
        return this.estaciones;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setMenu(menu: Menu): void {
        this.menu = menu;
    }

    public setEstaciones(estaciones: Map<string, Estacion>): void {
        this.estaciones = estaciones;
    }

    public agregarPedido(pedido: Pedido): void {
        let ultimoNroDePedido = 0;

        this.pedidosActivos.forEach((_pedidoCargado, nroDePedidoCargado) => {
            ultimoNroDePedido = nroDePedidoCargado;
        });

        this.pedidosActivos.set(ultimoNroDePedido + 1, pedido);
    }

    public consultarHistorial(): void {
        //Nro de pedido y fecha
        //Lista de items "con precio" (ver si agregamos o no el precio individual)
        //Coste total del pedido
        
        this.pedidosFinalizados.forEach((pedido, nroDePedido) => {
            console.log(`Nro de pedido: ${nroDePedido} - Fecha: ${pedido.getFecha()}`);
            console.log(`${pedido.getItems()}`);
            //Probablemente haya que cambiar esta linea más adelante
            //Porque getItems() te devuelve los objetos de tipo Item, nosé si se puedan imprimir
            //Pienso en hacer que items sea un Map en pedido y agregarle un nombre a Item para que sea la key, 
            //ya que también hay que manejar cantidad de items
            console.log(`Costo total del pedido: ${pedido.calcularTotalBruto()}`);
            console.log(`Descuento aplicado: ${pedido.aplicarDescuento()}`);
            console.log(`Total abonado: `);
            //Total abonado falta desarrollar
            //Ya que en pedido, al calcular el total, se deben ingresar medio de pago y dia, eso obstruye para agregarlo directamente acá
        });

    }

    public facturarPedido(pedido: Pedido): void {

        //Falta la lógica de facturacion

    }

}