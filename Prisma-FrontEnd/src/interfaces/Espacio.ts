import type { Imagenes } from "./Imagenes";
import type { ServicioIncluido } from "./ServiciosIncluidos";

export interface Espacios{
    imagenes : Imagenes []
    nombre : string
    direccion : string
    ciudad : string
    descripcion : string
    serviciosIncluidos : ServicioIncluido []
}