export class RolModel {
    constructor(id, name, permissions) {
      this.id = id; // Cadena de alfanuméricos compatible con un identificador de MongoDB
      this.name = name; // Nombre del rol
      this.permissions = permissions; // Arreglo de strings que contiene todos los permisos asociados al rol
    }

  }
  
  // Uso de la clase para crear un nuevo rol
  const newRol = new RolModel("1", "Administrador", ["WRITE", "READ", "DELETE"]);