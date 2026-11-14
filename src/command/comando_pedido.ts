//vamos a usar un command para manejar lo de agregar item,quitar y deshacer
//asi no tenemos un historial por cada pedido, sino que tenemos un historial global de comandos ejecutados
//como queremos tratar a todos igual hacemos un interface
/**
 * Define las operaciones que puede ejecutar y deshacer un comando asociado a un pedido.
 */
export default interface ComandoPedido {
    ejecutar(): void;
    deshacer(): void;
}
