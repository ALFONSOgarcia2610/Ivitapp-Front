
interface RegisterData {
  username: string;
  password: string;
  correo: string;
  nombre?: string;
  apellido?: string;
  provincia?: string;
  canton?: string;
  telefono?: Telefono;
  fechaNacimiento?: string; // o Date en formato ISO string
  aceptoTerminos: boolean;
  
}


interface EditInvitadoInput {
  idInvitado: string;
  nombre?: string;
  apellido?: string;
  mesa?: string;
  admision?: string;
  telefono?: Telefono;
  estado?: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_DATABASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al registrar usuario');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en registerUser:', error);
    throw error;
  }
};


export const loginUser = async ({ username, password }: { username: string; password: string }) => {
  const response = await fetch(`${import.meta.env.VITE_DATABASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al iniciar sesión');
  }

  return await response.json();
};
export const changePassword = async ({
  username,
  currentPassword,
  newPassword,
}: {
  username: string;
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_DATABASE_URL}/changePassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, currentPassword, newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al cambiar la contraseña');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en changePassword:', error);
    throw error;
  }
};

export const editUserData = async ({
  username,
  currentPassword,
  newNombre,
  newApellido,
  newProvincia,
  newCanton,
}: {
  username: string
  currentPassword: string
  newNombre: string
  newApellido: string
  newProvincia: string
  newCanton: string
}) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_DATABASE_URL}/edituser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        currentPassword,
        newNombre,
        newApellido,
        newProvincia,
        newCanton,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al editar datos del usuario')
    }

    return await response.json()
  } catch (error) {
    console.error('Error en editUserData:', error)
    throw error
  }
}
type Telefono = {
  prefijo?: string;
  numero: string;
};

type GuardarInvitadoParams = {
  username: string;
  nombre: string;
  apellido: string;
  mesa?: number;
  admision?: number;
  telefono: Telefono;
};

export const guardarInvitado = async ({
  username,
  nombre,
  apellido,
  mesa,
  admision,
  telefono,
}: GuardarInvitadoParams) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_DATABASE_URL}/invitados`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        nombre,
        apellido,
        mesa,
        admision,
        telefono,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al guardar invitado');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en guardarInvitado:', error);
    throw error;
  }
};

type Invitado = {
  _id: string;
  nombre: string;
  estado: string;
  apellido: string;
  mesa?: number;
  admision?: number;
  telefono: {
    prefijo?: string;
    numero: string;
  };
  createdAt: string;
  updatedAt: string;
};

export const obtenerInvitadosPorUsuario = async (username: string): Promise<{ message: string; invitados: Invitado[] }> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_DATABASE_URL}/invitados/listar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener invitados');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en obtenerInvitadosPorUsuario:', error);
    throw error;
  }
};



export const obtenerInvitacionPorInvitado = async (invitadoId: string) => {
  console.log('Llamando a obtenerInvitacionPorInvitado con ID invitado:', invitadoId);

  const response = await fetch(`${import.meta.env.VITE_DATABASE_URL}/invitacion/${invitadoId}`);

  console.log('Respuesta status:', response.status);

  const json = await response.json();

  console.log('JSON recibido:', json);

  if (!response.ok) {
    throw new Error(json.message || 'Error al obtener la invitación');
  }

  return json;
};

export async function editarInvitado(datos: EditInvitadoInput) {
  const response = await fetch(`${import.meta.env.VITE_DATABASE_URL}/invitado/editar`, {
    method: 'PUT', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al editar invitado');
  }
  return response.json();
}
