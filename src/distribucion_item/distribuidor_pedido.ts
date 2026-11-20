
import EstrategiaSeleccion from "./strategy_seleccion";
import Categoria from "../componentes_del_menu/categoria";
import Estacion from "../estacion/estacion";
import Pedido from "../pedidos/pedido";
import EstadoPedido from "../pedidos/estado_pedido";
import Item from "../items/item";

/**
 * Coordina la distribución de los ítems de un pedido entre las estaciones disponibles.
 */
export default class DistribuidorPedidos {
    private estrategia: EstrategiaSeleccion;

/**
 * Inicializa la instancia con los datos necesarios.
 * @param estrategia - Parámetro de tipo EstrategiaSeleccion utilizado por la operación.
 */
    public constructor(estrategia: EstrategiaSeleccion) {
        //al hacer esto usamos strategy
        //ya que no decide el distribuidor de pedidos que estacion es la correcta
        //delega esa tarea
        this.estrategia = estrategia;
    }

    
     //Busca una estación que acepte la categoría.
     ///La elección se delega a la estrategia.
     
/**
 * Realiza la operación buscarEstacion dentro del modelo del restaurante.
 * @param categoria - Parámetro de tipo Categoria utilizado por la operación.
 * @param estaciones - Parámetro de tipo Estacion[] utilizado por la operación.
 * @returns Estacion con el resultado de la operación.
 */
    public buscarEstacion(
        categoria: Categoria,
        estaciones: Estacion[]
    ): Estacion {
        return this.estrategia.seleccionarEstacion(
            categoria, estaciones
        );
    }

   //realiza la distribucion de un pedido en las estaciones
/**
 * Distribuye los ítems del pedido entre las estaciones compatibles.
 * @param pedido - Parámetro de tipo Pedido utilizado por la operación.
 * @param estaciones - Parámetro de tipo Estacion[] utilizado por la operación.
 * @throws {Error} Si no se cumplen las condiciones necesarias para realizar la operación.
 */
    // eslint-disable-next-line max-lines-per-function
    public distribuirPedido(
        pedido: Pedido,
        estaciones: Estacion[]
    ): void {

        // Solo distribuimos pedidos en construcción.
        if (pedido.getEstado() !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error("El pedido ya fue confirmado");
        }

        const items: Item[] = pedido.getItems();
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if (items.length === 0) {
            throw new Error("No se puede confirmar un pedido vacío");
        }

        //validamos y procesamos los elementos
        for (const item of items) {
            const elemento = item.getElemento();
            elemento.procesarElemento(this, estaciones, item);
            
        }
    
        // Confirmamos después de realizar la distribución.
        pedido.confirmarPedido();
    }
}