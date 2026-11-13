import Pedido from "./pedido";

/**
 * Class PedidoEnvioPropio, utilizada en la gestión del restaurante.
 */
export default class PedidoEnvioPropio extends Pedido {

    private direccion: string; // Dirección de entrega

/**
 * Inicializa la instancia con los datos necesarios.
 * @param numeroPedido - Parámetro de tipo number utilizado por la operación.
 * @param nombreCliente - Parámetro de tipo string utilizado por la operación.
 * @param costoEnvio - Parámetro de tipo number utilizado por la operación.
 * @param direccion - Parámetro de tipo string utilizado por la operación.
 */
    public constructor(numeroPedido: number, nombreCliente: string, costoEnvio: number, direccion: string) {
        super(numeroPedido, nombreCliente, costoEnvio);

        this.direccion = direccion;
    }

/**
 * Devuelve direccion.
 * @returns string con el resultado de la operación.
 */
    public getDireccion(): string {
        return this.direccion;
    }

/**
 * Actualiza direccion.
 * @param direccion - Parámetro de tipo string utilizado por la operación.
 */
    public setDireccion(direccion: string): void {
        this.direccion = direccion;
    }

}