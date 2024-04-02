export interface PluginTypes {
  /**
   * This assumes your have a roles filed in users collection with saveToJWT and hasMany true
   * e.g:  
   * {
      name: 'roles',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Manager', value: 'manager' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
      defaultValue: ['user'],
      hasMany: true,
      saveToJWT: true,
      access: {
        update: isAdmin,
      },
    },
   */
  displayToRoles?: string[]
}
