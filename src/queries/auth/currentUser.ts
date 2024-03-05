export const currentUser = async (token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      },
    )

    const data = await res.json()

    return data
  } catch (err) {
    console.log(err)
    throw err
  }
}
