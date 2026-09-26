import Pedido from "./pedido";

export default class PedidoRetirar extends Pedido {

    private horarioRetiro: Date; // Hora para retirar el pedido

    constructor(
        numeroPedido: number,
        nombreCliente: string,
        horarioRetiro: Date
    ) {
        super(numeroPedido, nombreCliente);

        this.horarioRetiro = horarioRetiro;
    }

    public getHorarioRetiro(): Date {
        return this.horarioRetiro;
    }

    public setHorarioRetiro(
        horarioRetiro: Date
    ): void {
        this.horarioRetiro = horarioRetiro;
    }
}