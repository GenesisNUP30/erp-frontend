export default {
  generic: {
    required: "Este campo es obligatorio",
    error: "Ha ocurrido un error inesperado",
  },
  entities: {
    workers: {
      singular: "trabajador",
      plural: "trabajadores",
      created: "¡El trabajador ha sido creado exitosamente!",
      updated: "¡El trabajador ha sido actualizado exitosamente!",
      deleted: "¡El trabajador ha sido eliminado exitosamente!",
    }
  },
  createForm: {
    title: "Crear nuevo {item}",
    editTitle: "Editar {item}",
    subtitle: "Información básica",
    buttons: {
      create: "Crear",
      edit: "Guardar cambios",
      cancel: "Cancelar"
    },
    errors: {
      nameRequired: "El nombre es obligatorio",
      dniInvalid: "Formato de DNI no válido (00000000X)",
      phoneInvalid: "El teléfono debe empezar por 6 o 7",
      passwordMin: "La contraseña debe tener al menos 8 caracteres"
    }
  }
};