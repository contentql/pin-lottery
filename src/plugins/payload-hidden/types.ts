export interface PluginTypes {
  hideForRole?: {
    collections?: {
      [role: string]: string[] | undefined
    }
    globals?: {
      [role: string]: string[] | undefined
    }
  }
  hideAllForRole?: {
    collections?: string[] | undefined
    globals?: string[] | undefined
  }
  hideForAllRoles?: {
    collections?: string[] | undefined
    globals?: string[] | undefined
  }
}
