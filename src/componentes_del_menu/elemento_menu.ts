import DistribuidorPedidos from "../distribucion_item/distribuidor_pedido";
import Estacion from "../estacion/estacion";
import Item from "../items/item";
/**
 * Define el contrato común de los elementos que pueden ofrecerse en el menú.
 */
export default interface ElementoMenu {
    getPrecio(): number;
    getNombre(): string;
    procesarElemento(distribuidor: DistribuidorPedidos, estaciones: Estacion[], item: Item): void;
    validarProcesamiento(distribuidor: DistribuidorPedidos, estaciones: Estacion[]): void;
}