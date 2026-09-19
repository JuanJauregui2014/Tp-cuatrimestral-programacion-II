import  Producto from "./producto";
export default interface ComboBeneficio {
    aplicarBeneficio(productos: Producto[]): number;
}