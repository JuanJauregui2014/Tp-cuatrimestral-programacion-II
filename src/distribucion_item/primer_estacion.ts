//aca vamos a recibir una categoria y las estaciones
//y buscaremos la primer estacion que pueda prepararlo
import EstrategiaSeleccion from "./strategy_seleccion";
import Estacion from "../estacion/estacion";
import Categoria from "../componentes_del_menu/categoria";

/**
 * Estrategia que selecciona la primera estación
 * compatible con la categoría solicitada.
 */
/**
 * Implementa una estrategia que selecciona la primera estación compatible con una categoría.
 */
export default class PrimeraCompatible implements EstrategiaSeleccion {

/**
 * Selecciona una estación adecuada para preparar la categoría solicitada.
 * @param categoria - Parámetro de tipo Categoria utilizado por la operación.
 * @param estaciones - Parámetro de tipo Estacion[] utilizado por la operación.
 * @returns Estacion con el resultado de la operación.
 */
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public seleccionarEstacion(
        categoria: Categoria,
        estaciones: Estacion[]
    ): Estacion {

        const estacionEncontrada = estaciones.find(
            estacion => estacion.puedePreparar(categoria)
        );

        if (!estacionEncontrada) {
            throw new Error("No existe una estación compatible");
        }

        return estacionEncontrada;
    }
}