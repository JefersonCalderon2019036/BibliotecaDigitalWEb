export class Prestamos{
    constructor(
        public _id: String,
        public iduser: String,
        public idlibro: String,
        public imagen: String,
        public autor: String,
        public nombre: String,
        public edicion: String,
        public tipo: String,
        public estado: String,
        public fechadesolicitud: String,
        public fechadeentrega: String
    ){}
}