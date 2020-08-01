function checkUserTags({ roles, role }: { roles: [string]; role: string }) {
  return {
    success: roles.includes(role),
  }
}

export { checkUserTags }
