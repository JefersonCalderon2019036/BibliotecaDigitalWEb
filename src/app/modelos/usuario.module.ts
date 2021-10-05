export class Usuario { 
  constructor(
    public _id: String,
    public imagen: String,
    public carnet: Number,
    public nombre: String,
    public apellido: String,
    public usuario: String,
    public correoelectronico: String,
    public contrasena: String,
    public rol: String,
    public librosprestados: Number,
    public cantidaddedocuentosprestados: Number
  ){}
}
