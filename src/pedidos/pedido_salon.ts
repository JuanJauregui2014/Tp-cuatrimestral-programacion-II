import Pedido from "./pedido";

/**
 * Class PedidoSalon, utilizada en la gestión del restaurante.
 */
export default class PedidoSalon extends Pedido {

    private numeroMesa: number; // Mesa donde está sentado el cliente
    private mozo: string; // Mozo responsable del pedido

/**
 * Inicializa la instancia con los datos necesarios.
 * @param numeroPedido - Parámetro de tipo number utilizado por la operación.
 * @param nombreCliente - Parámetro de tipo string utilizado por la operación.
 * @param numeroMesa - Parámetro de tipo number utilizado por la operación.
 * @param mozo - Parámetro de tipo string utilizado por la operación.
 */
    public constructor(numeroPedido: number, nombreCliente: string, numeroMesa: number, mozo: string) {
        const costoEnvio = 0;
        super(numeroPedido, nombreCliente, costoEnvio); // Inicializa lo heredado

        this.numeroMesa = numeroMesa;
        this.mozo = mozo;
    }

/**
 * Devuelve numeromesa.
 * @returns number con el resultado de la operación.
 */
    public getNumeroMesa(): number {
        return this.numeroMesa;
    }

/**
 * Devuelve mozo.
 * @returns string con el resultado de la operación.
 */
    public getMozo(): string {
        return this.mozo;
    }

/**
 * Actualiza numeromesa.
 * @param numeroMesa - Parámetro de tipo number utilizado por la operación.
 */
    public setNumeroMesa(numeroMesa: number): void {
        this.numeroMesa = numeroMesa;
    }

/**
 * Actualiza mozo.
 * @param mozo - Parámetro de tipo string utilizado por la operación.
 */
    public setMozo(mozo: string): void {
        this.mozo = mozo;
    }

}