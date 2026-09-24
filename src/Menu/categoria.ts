export class Categoria {

    private nombre: string;

    public constructor(nombre: string) {
        this.nombre = nombre;
    }

    public getNombre(): string {
        return this.nombre;
    }

}