
import EstrategiaSeleccion from "./strategy_seleccion";
import Categoria from "../componentes_del_menu/categoria";
import Estacion from "../estacion/estacion";
import Pedido from "../pedidos/pedido";
import EstadoPedido from "../pedidos/estado_pedido";
import Producto from "../componentes_del_menu/producto";
import Combo from "../componentes_del_menu/combo";
import Item from "../items/item";

export default class DistribuidorPedidos {
    private estrategia: EstrategiaSeleccion;

    public constructor(estrategia: EstrategiaSeleccion) {
        //al hacer esto usamos strategy
        //ya que no decide el distribuidor de pedidos que estacion es la correcta
        //delega esa tarea
        this.estrategia = estrategia;
    }

    
     //Busca una estación que acepte la categoría.
     ///La elección se delega a la estrategia.
     
    public buscarEstacion(
        categoria: Categoria,
        estaciones: Estacion[]
    ): Estacion {
        return this.estrategia.seleccionarEstacion(
            categoria, estaciones
        );
    }

   //realiza la distribucion de un pedido en las estaciones
    // eslint-disable-next-line max-lines-per-function
    public distribuirPedido(
        pedido: Pedido,
        estaciones: Estacion[]
    ): void {

        // Solo distribuimos pedidos en construcción.
        if (pedido.getEstado() !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error("El pedido ya fue confirmado");
        }

        const items = pedido.getItems();
        //ODIO MAGIC NUMBERS
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if (items.length === 0) {
            throw new Error("No se puede confirmar un pedido vacío");
        }

        // Guardamos temporalmente las asignaciones,que serian enviadas a las estaciones.
        const asignaciones: {
            estacion: Estacion;
            item: Item;
        }[] = [];

        // Guardamos las preparaciones que corresponden a cada combo.
        const combos: {
            original: Item;
            preparaciones: Item[];
        }[] = [];

        //validamos y prepararamos las asignaciones.
        for (const item of items) {

            const elemento = item.getElemento();
            //nos aseguramos que el elemento del menu sea un producto o un combo
            if (elemento instanceof Producto) {
                //aca buscamos la estacion que pueda preparar el producto
                const estacion = this.buscarEstacion(
                    elemento.getCategoria(),
                    estaciones
                );
                //lo guardamos en el array de asignaciones para luego enviarlo a la estacion
                asignaciones.push({
                    estacion: estacion,
                    item: item
                });

            } else if (elemento instanceof Combo) {
                //aca buscamos la estacion que pueda preparar cada producto del combo
                const preparaciones: Item[] = [];

                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                if (elemento.getProductos().length === 0) {
                    throw new Error("No se puede distribuir un combo vacío");
                }

                for (const producto of elemento.getProductos()) {
                    //aca buscamos la estacion que pueda preparar el producto
                    const estacion = this.buscarEstacion(
                        producto.getCategoria(),
                        estaciones
                    );
                    //lo guardamos en el array de preparaciones para luego enviarlo a la estacion
                    const preparacion = new Item(
                        item.getCantidad(),
                        producto
                    );

                    preparaciones.push(preparacion);

                    asignaciones.push({
                        estacion: estacion,
                        item: preparacion
                    });
                }

                combos.push({
                    original: item,
                    preparaciones: preparaciones
                });

            } else {
                //si ponen un elemento del menu que no es ni producto ni combo, lanzamos un error
                //esto lo pense por si ponene pizza y no existe pizza en el menu, o algo asi, para que no rompa todo
                throw new Error("Elemento del menú no reconocido");
            }
        }

        //registramos las preparaciones de los combos.
        //recorremos el array de combos y registramos las preparaciones en el combo original
        //para que el combo original tenga las preparaciones de los productos que lo componen
        for (const combo of combos) {
            combo.original.registrarPreparacion(
                combo.preparaciones
            );
        }

        // Enviamos cada preparación a su estación.
        for (const asignacion of asignaciones) {
            asignacion.estacion.agregarItem(asignacion.item);
        }

        // Confirmamos después de realizar la distribución.
        pedido.confirmarPedido();
    }
}
