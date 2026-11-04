import Pedido from "./pedido";

export default class PedidoRetirar extends Pedido {

    private horarioRetiro: number; // Hora para retirar el pedido

    public constructor(numeroPedido: number, nombreCliente: string, horarioRetiro: number) {
        const costoEnvio = 0;
        super(numeroPedido, nombreCliente, costoEnvio); // Inicializa lo heredado

        this.horarioRetiro = horarioRetiro;
    }

    public getHorarioRetiro(): number {
        return this.horarioRetiro;
    }

    public setHorarioRetiro(horarioRetiro: number): void {
        this.horarioRetiro = horarioRetiro;
    }
}