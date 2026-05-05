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
        inactive: "Inactivo",
      },
      // Mensajes de éxito estándar
      createdSuccess: "¡El trabajador ha sido creado exitosamente!",
      updatedSuccess: "¡El trabajador ha sido actualizado exitosamente!",
      deletedSuccess: "¡El trabajador ha sido eliminado exitosamente!",
    },
    parcelas: {
      singular: "parcela",
      plural: "parcelas",
      labels: {
        nombre: "Nombre",
        superficie_hectareas: "Superficie (ha)",
        ubicacion: "Ubicación",
        estado: "Estado",
      },
      status: {
        activa: "Activa",
        inactiva: "Inactiva",
        en_mantenimiento: "En mantenimiento",
      },
      createdSuccess: "¡La parcela ha sido creada exitosamente!",
      updatedSuccess: "¡La parcela ha sido actualizada exitosamente!",
      deletedSuccess: "¡La parcela ha sido eliminada exitosamente!",
    },
    campanias: {
      singular: "campaña",
      plural: "campañas",
      labels: {
        nombre: "Nombre",
        fecha_inicio: "Fecha de inicio",
        fecha_fin: "Fecha de fin",
        descripcion: "Descripción",
        estado: "Estado",
      },
      status: {
        activa: "Activa",
        finalizada: "Finalizada",
        planificada: "Planificada",
      },
      createdSuccess: "¡La campaña ha sido creada exitosamente!",
      updatedSuccess: "¡La campaña ha sido actualizada exitosamente!",
      deletedSuccess: "¡La campaña ha sido eliminada exitosamente!",
    },
  },
  tableList: {
    headers: {
      fullName: "Nombre completo",
      username: "Usuario",
      role: "Rol",
      status: "Estado",
      nombre: "Nombre",
      superficie: "Superficie (ha)",
      ubicacion: "Ubicación",
      fecha_inicio: "Fecha de inicio",
      fecha_fin: "Fecha de fin",
      descripcion: "Descripción",
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
    // Errores específicos (Basados en tu Backend Laravel)
    errors: {
      nameRequired: "El nombre es obligatorio",
      nameMaxLength: "El nombre no puede superar los 60 caracteres",
      nameInvalid: "El nombre contiene caracteres no válidos",
      usernameEmailRequired: "Debes introducir el nombre de usuario o el email",
      dniRequired: "El DNI es obligatorio",
      dniInvalid: "Formato de DNI no válido (ej: 12345678Z)",
      phoneRequired: "El teléfono es obligatorio",
      phoneInvalid: "El teléfono debe empezar por 6 o 7 y tener 9 dígitos",
      emailInvalid: "El correo electrónico no es válido",
      passwordRequired: "La contraseña es obligatoria",
      passwordMin: "La contraseña debe tener al menos 8 caracteres",
      roleRequired: "Debes seleccionar un rol",
      dateRequired: "La fecha de alta es obligatoria",
      dateMax: "La fecha de alta no puede ser posterior a hoy",
    },
  },
  details: {
    // Títulos
    subtitle: "Información detallada",
    fields: {
      fecha_baja: "Fecha de baja",
    },
  },
};

export default validations;
