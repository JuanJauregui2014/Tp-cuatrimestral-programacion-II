import Pedido from "./pedido";

export default class PedidoEnvioPropio extends Pedido {

    private direccion: string; // Dirección de entrega

    public constructor(numeroPedido: number, nombreCliente: string, costoEnvio: number, direccion: string) {
        super(numeroPedido, nombreCliente, costoEnvio);

        this.direccion = direccion;
    }

    public getDireccion(): string {
        return this.direccion;
    }

    public setDireccion(direccion: string): void {
        this.direccion = direccion;
    }

}