import ElementoMenu from "../componentes_del_menu/elemento_menu";
import EstadoItem from "./estado_item";
/**
 * Representa un elemento solicitado en un pedido, junto con su cantidad, estado y posibles preparaciones.
 */
export default class Item {
    private cantidad: number;
    private estado: EstadoItem = EstadoItem.PENDIENTE; // Estado inicial del item
    private elemento: ElementoMenu; // representa el elemento del menu
    private preparaciones: Item[] = []; // representa las preparaciones del item
/**
 * Inicializa la instancia con los datos necesarios.
 * @param cantidad - Parámetro de tipo number utilizado por la operación.
 * @param elemento - Parámetro de tipo ElementoMenu utilizado por la operación.
 * @param preparaciones - Parámetro de tipo Item[] utilizado por la operación.
 */
    public constructor(cantidad: number, elemento: ElementoMenu, preparaciones: Item[] = []) {
        this.cantidad = cantidad;
        this.elemento = elemento;
        this.preparaciones = preparaciones;
    }

/**
 * Devuelve cantidad.
 * @returns number con el resultado de la operación.
 */
    public getCantidad(): number {
        return this.cantidad;
    }
    //esto hay que modificarlo xq tiene que consultar el estado
    //de un combo que tiene varios productos
/**
 * Devuelve estado.
 * @returns EstadoItem con el resultado de la operación.
 */
    public getEstado(): EstadoItem {
        // Si no tiene preparaciones, funciona como antes.
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if (this.preparaciones.length === 0) {
            return this.estado;
        }

        // Comprueba si todos los productos están listos.
        const todasListas = this.preparaciones.every(
            item => item.getEstado() === EstadoItem.LISTO
        );

        if (todasListas) {
            return EstadoItem.LISTO;
        }

        // Comprueba si al menos uno comenzó a prepararse.
        const algunaIniciada = this.preparaciones.some(
            item => item.getEstado() !== EstadoItem.PENDIENTE
        );

        if (algunaIniciada) {
            return EstadoItem.EN_PREPARACION;
        }

        return EstadoItem.PENDIENTE;
    }


/**
 * Devuelve elemento.
 * @returns ElementoMenu con el resultado de la operación.
 */
    public getElemento(): ElementoMenu {
        return this.elemento;
    }

    //necesitamos relacionar los productos que se preparan con el item
    //las validaciones son para no registrar uno vacio o dos veces el mismo item
/**
 * Asocia los ítems que componen la preparación de este elemento.
 * @param preparaciones - Parámetro de tipo Item[] utilizado por la operación.
 * @throws {Error} Si no se cumplen las condiciones necesarias para realizar la operación.
 */
    public registrarPreparacion(preparaciones: Item[]): void {
        if (this.preparaciones.length) {
            throw new Error("No se puede registrar una preparación en un item que ya tiene preparaciones.");
        }
        if (this.preparaciones.length || this.preparaciones.includes(this)) {
            throw new Error("las preparaciones no son validas");
        }
        this.preparaciones = preparaciones;
    }
/**
 * Actualiza cantidad.
 * @param cantidad - Parámetro de tipo number utilizado por la operación.
 */
    public setCantidad(cantidad: number): void {
        //aca manejamos el error de que no se pueda modificar la cantidad de un item que no esta pendiente
        if (!this.esModificable()) {
            throw new Error("No se puede modificar la cantidad de un item que no está pendiente.");
        }
        this.cantidad = cantidad;
    }

/**
 * Actualiza elemento.
 * @param elemento - Parámetro de tipo ElementoMenu utilizado por la operación.
 */
    public setElemento(elemento: ElementoMenu): void {
        //aca manejamos el error de que no se pueda modificar el elemento de un item que no esta pendiente
        if (!this.esModificable()) {
            throw new Error("No se puede modificar el elemento de un item que no está pendiente.");
        }
        this.elemento = elemento;
    }

/**
 * Avanza el estado del ítem según las reglas de preparación.
 */
    public avanzarEstado(): void {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if (this.preparaciones.length > 0) {
            throw new Error("El estado del combo depende de sus preparaciones");
        }
        if (this.estado === EstadoItem.PENDIENTE) {
            this.estado = EstadoItem.EN_PREPARACION;
        } else if (this.estado === EstadoItem.EN_PREPARACION) {
            this.estado = EstadoItem.LISTO;
        }
    }
/**
 * Indica si el ítem todavía puede modificarse.
 * @returns boolean con el resultado de la operación.
 */
    public esModificable(): boolean {
        return this.getEstado() === EstadoItem.PENDIENTE;
    }
}

