export class Libros{
    constructor(
        public _id: String,
        public imagen: String,
        public autor: String,
        public nombre: String,
        public edicion: String,
        public descripcion: String,
        public copias: Number,
        public Dispobles: Number,
        public Temas: [],
        public palabrasclaves: [],
        public tipo: String,
        public frecuenciaactual: String,
        public ejemplares: String,
        public vecesvisto: Number,
        public cantidaddedocuentosprestados: Number
    ){}
}