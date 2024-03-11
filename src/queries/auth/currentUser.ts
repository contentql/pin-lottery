export const currentUser = async (token?: string) => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers.Authorization = `JWT ${token}`
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
      {
        method: 'GET',
        credentials: 'include',
        headers,
      },
    )

    const data = await res.json()

    return data
  } catch (err) {
    console.log(err)
    throw err
  }
}
