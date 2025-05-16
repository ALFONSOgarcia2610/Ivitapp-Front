export const registerUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_DATABASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
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
