import Pedido from "./pedido";

export default class PedidoSalon extends Pedido {

    private numeroMesa: number; // Mesa donde está sentado el cliente
    private mozo: string; // Mozo responsable del pedido

    constructor(
        numeroPedido: number,
        nombreCliente: string,
        numeroMesa: number,
        mozo: string
    ) {
        super(numeroPedido, nombreCliente); // Inicializa lo heredado

        this.numeroMesa = numeroMesa;
        this.mozo = mozo;
    }

    public getNumeroMesa(): number {
        return this.numeroMesa;
    }

    public getMozo(): string {
        return this.mozo;
    }

    public setNumeroMesa(numeroMesa: number): void {
        this.numeroMesa = numeroMesa;
    }

    public setMozo(mozo: string): void {
        this.mozo = mozo;
    }
}