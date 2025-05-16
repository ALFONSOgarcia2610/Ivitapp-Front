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