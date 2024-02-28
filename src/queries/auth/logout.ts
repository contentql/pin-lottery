export const logout = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await res.json();

    if (data.errors && data.errors[0].message === 'No User') {
      throw new Error('CONFLICT');
    }

    if (data.message !== 'You have been logged out successfully.') {
      throw new Error('Logout failed');
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
