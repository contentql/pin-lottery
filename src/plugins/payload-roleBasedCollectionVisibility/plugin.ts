import type { Config, Plugin } from 'payload/config'
import { PluginTypes } from './types'

export const roleBasedCollectionVisibility =
  (pluginOptions: PluginTypes): Plugin =>
  (incomingConfig: Config): Config => {
    return incomingConfig
  }
