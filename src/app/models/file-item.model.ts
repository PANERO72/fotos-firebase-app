export class FileItem {
    public file: File;
    public name: string; //Antes era this.nombreArchivo
    public url: string;
    public estadoSubida: boolean;
    public progreso: number;

    constructor(file: File){
        this.file = file;
        this.name = file.name; //Antes era this.nombreArchivo
        this.estadoSubida = false;
        this.progreso = 0;
    }
}