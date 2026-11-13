import Pedido from "./pedido";

/**
 * Class PedidoRetirar, utilizada en la gestión del restaurante.
 */
export default class PedidoRetirar extends Pedido {

    private horarioRetiro: number; // Hora para retirar el pedido

/**
 * Inicializa la instancia con los datos necesarios.
 * @param numeroPedido - Parámetro de tipo number utilizado por la operación.
 * @param nombreCliente - Parámetro de tipo string utilizado por la operación.
 * @param horarioRetiro - Parámetro de tipo number utilizado por la operación.
 */
    public constructor(numeroPedido: number, nombreCliente: string, horarioRetiro: number) {
        const costoEnvio = 0;
        super(numeroPedido, nombreCliente, costoEnvio); // Inicializa lo heredado

        this.horarioRetiro = horarioRetiro;
    }

/**
 * Devuelve horarioretiro.
 * @returns number con el resultado de la operación.
 */
    public getHorarioRetiro(): number {
        return this.horarioRetiro;
    }

/**
 * Actualiza horarioretiro.
 * @param horarioRetiro - Parámetro de tipo number utilizado por la operación.
 */
    public setHorarioRetiro(horarioRetiro: number): void {
        this.horarioRetiro = horarioRetiro;
    }
}