export const refreshToken = async () => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/refresh-token`,
      {
        method: 'POST',
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
