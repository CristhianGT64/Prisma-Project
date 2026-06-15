export interface Usuario{
    id: string;
    nombres : string
    apellidos : string
    correo : string
    password : string
    usuarios : string
    telefono : string
    rol: "arrendador" | "arrendatario"
    fotoPerfil?: string
    fechaRegistro?: string
    ocupacion?: string
    empresa?: string
    descripcion?: string
}