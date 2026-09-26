import Pedido from "./pedido";

export default class PedidoEnvioPropio extends Pedido {

    private direccion: string; // Dirección de entrega
    private costoEnvio: number; // Cargo adicional por reparto, era así?

    constructor(
        numeroPedido: number,
        nombreCliente: string,
        direccion: string,
        costoEnvio: number
    ) {
        super(numeroPedido, nombreCliente);

        this.direccion = direccion;
        this.costoEnvio = costoEnvio;
    }

    public getDireccion(): string {
        return this.direccion;
    }

    public getCostoEnvio(): number {
        return this.costoEnvio;
    }

    public setDireccion(
        direccion: string
    ): void {
        this.direccion = direccion;
    }

    public setCostoEnvio(
        costoEnvio: number
    ): void {
        this.costoEnvio = costoEnvio;
    }


}