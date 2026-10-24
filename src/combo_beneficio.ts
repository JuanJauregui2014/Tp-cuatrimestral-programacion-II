
export default interface ComboBeneficio {
    //precio base es el precio total de los productos que componen el combo
    aplicarBeneficio(precioBase: number): number;
}