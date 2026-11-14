/**
 * Define el contrato común de los elementos que pueden ofrecerse en el menú.
 */
export default interface ElementoMenu {
    getPrecio(): number;
    getNombre(): string;
}