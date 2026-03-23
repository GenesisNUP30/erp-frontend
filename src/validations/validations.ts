const validations = {
  generic: {
    required: "Este campo es obligatorio",
    error: "Ha ocurrido un error inesperado",
    noItems: "No hay elementos para mostrar",
  },
  entities: {
    workers: {
      singular: "trabajador",
      plural: "trabajadores",
      // Mensajes de éxito estándar
      createdSuccess: "¡El trabajador ha sido creado exitosamente!",
      updatedSuccess: "¡El trabajador ha sido actualizado exitosamente!",
      deletedSuccess: "¡El trabajador ha sido eliminado exitosamente!",
    },

  },
  createForm: {
    // Estándares de Títulos
    title: "Crear nuevo {item}",
    editTitle: "Editar {item}",
    subtitle: "Información básica",
    // Botones
    buttons: {
      create: "Crear",
      edit: "Guardar cambios",
      cancel: "Cancelar",
    },
    // Errores específicos 
    errors: {
      nameRequired: "El nombre es obligatorio",
      nameMaxLength: "El nombre no puede superar los 60 caracteres",
      nameInvalid: "El nombre contiene caracteres no válidos",
      dniRequired: "El DNI es obligatorio",
      dniInvalid: "Formato de DNI no válido (ej: 12345678Z)",
      phoneRequired: "El teléfono es obligatorio",
      phoneInvalid: "El teléfono debe empezar por 6 o 7 y tener 9 dígitos",
      emailInvalid: "El correo electrónico no es válido",
      passwordMin: "La contraseña debe tener al menos 8 caracteres",
      roleRequired: "Debes seleccionar un rol",
      dateRequired: "La fecha de alta es obligatoria",
      dateMax: "La fecha de alta no puede ser posterior a hoy",
    },
  },
};

export default validations;