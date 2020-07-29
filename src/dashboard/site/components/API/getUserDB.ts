async function getUserDB(cookie: string) {
  const res = await fetch(`http://localhost:5000/api/user/getUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //These two are needed for server side calls
      credentials: 'include',
      cookie: cookie ?? null,
    },
  })

  const data = await res.json()
  return data.data.user
}

export { getUserDB }
