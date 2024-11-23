export interface Material {
  idMaterial?: string;  // Se recibe después de la creación
  nombre: string;
  descripcion: string;
  stock: number;
  esCompleto: boolean;
  esSoporte: boolean;
  estado: string;  // Tipo enumerado que debe coincidir con el backend (MaterialStatus)
  fechaAlta?: string;  // Se autogenera en el backend
}
