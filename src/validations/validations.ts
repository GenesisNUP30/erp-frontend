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
      labels: {
        name: "Nombre completo",
        username: "Nombre de usuario",
        email: "Correo electrónico",
        dni: "DNI / NIE",
        telefono: "Teléfono de contacto",
        rol: "Rol en la empresa",
        fecha_alta: "Fecha de alta",
        password: "Contraseña",
      },
      status: {
        active: "Activo",
        inactive: "Inactivo"
      },
      // Mensajes de éxito estándar
      createdSuccess: "¡El trabajador ha sido creado exitosamente!",
      updatedSuccess: "¡El trabajador ha sido actualizado exitosamente!",
      deletedSuccess: "¡El trabajador ha sido eliminado exitosamente!",
    },
    // Aquí irás añadiendo: campaigns, plots, etc.
  },
  tableList: {
    headers: {
      fullName: "Nombre completo",
      username: "Usuario",
      role: "Rol",
      status: "Estado",
    }
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
    // Errores específicos (Basados en tu Backend Laravel)
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
  details: {
    // Títulos
    title: "Detalles de {item}",
    subtitle: "Información detallada",
    fields: {
      fecha_baja: "Fecha de baja",
    }
  }
};

export default validations;
