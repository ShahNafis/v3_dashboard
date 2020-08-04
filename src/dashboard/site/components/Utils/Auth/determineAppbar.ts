function determineAppbar(user) {
  if (user?.data?.roles?.includes('admin')) {
    return 'admin'
  }

  return 'basic'
}

export { determineAppbar }
