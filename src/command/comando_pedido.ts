//vamos a usar un command para manejar lo de agregar item,quitar y deshacer
//asi no tenemos un historial por cada pedido, sino que tenemos un historial global de comandos ejecutados
//como queremos tratar a todos igual hacemos un interface
export default interface ComandoPedido {
    ejecutar(): void;
    deshacer(): void;
}
