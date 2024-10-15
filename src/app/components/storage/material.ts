export interface Material {
    idMaterial: string;
    nombre: string;
    descripcion: string;
    stock: number;
    esCompleto: boolean;
    esSoporte: boolean;
    estado?: string; // MaterialStatus, optional as it's set on the backend
    fechaAlta?: string; // Date, also optional as it's set on the backend
  }
  