
import Categoria from "../componentes_del_menu/categoria";
import Estacion from "../estacion/estacion";

/**
 * Define el contrato para seleccionar una estación.
 * Cada estrategia implementará su propio criterio.
 */
export default interface EstrategiaSeleccion {
    seleccionarEstacion(
        categoria: Categoria,// la categoria del producto que se quiere preparar
        estaciones: Estacion[]//estaciones disponibles para preparar el producto
    ): Estacion;//devuelve una estacion
}