//aca vamos a recibir una categoria y las estaciones
//y buscaremos la primer estacion que pueda prepararlo
import EstrategiaSeleccion from "./strategy_seleccion";
import Estacion from "../estacion/estacion";
import Categoria from "../componentes_del_menu/categoria";

/**
 * Estrategia que selecciona la primera estación
 * compatible con la categoría solicitada.
 */
export default class PrimeraCompatible implements EstrategiaSeleccion {

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