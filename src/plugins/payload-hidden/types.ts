export interface PluginTypes {
  hideCollectionsForRole: {
    [role: string]: string[]
  }
  hideAllCollectionsForRole: string[]
  hideCollectionsForAllRoles: string[]
}
