import type { Usuario } from "../interfaces/Usuario";

export const usuarios: Usuario[] = [
    {
        id: "USR001",
        nombres: "Juan",
        apellidos: "Pérez",
        correo: "juan.perez@example.com",
        password: "password123",
        usuarios: "juanp",
        telefono: "555-0101",
        rol: "arrendatario",
        fotoPerfil: "https://example.com/avatars/juan.jpg",
        fechaRegistro: "2024-01-15",
        ocupacion: "Desarrollador",
        empresa: "Tech Solutions",
        descripcion: "Profesional en tecnología buscando espacios de trabajo colaborativo"
    },
    {
        id: "USR002",
        nombres: "María",
        apellidos: "González",
        correo: "maria.gonzalez@example.com",
        password: "securepass",
        usuarios: "mariag",
        telefono: "555-0202",
        rol: "arrendador",
        fotoPerfil: "https://example.com/avatars/maria.jpg",
        fechaRegistro: "2024-02-20",
        ocupacion: "Empresaria",
        empresa: "Espacios Premium Ltda.",
        descripcion: "Propietaria de espacios de trabajo moderno con experiencia en el sector"
    },
    {
        id: "USR003",
        nombres: "Carlos",
        apellidos: "Ramírez",
        correo: "carlos.ramirez@example.com",
        password: "carlitos",
        usuarios: "carlosr",
        telefono: "555-0303",
        rol: "arrendatario",
        fotoPerfil: "https://example.com/avatars/carlos.jpg",
        fechaRegistro: "2024-03-10",
        ocupacion: "Diseñador Gráfico",
        empresa: "Estudio Creativo",
        descripcion: "Diseñador buscando ambientes inspiradores para trabajar"
    }
];