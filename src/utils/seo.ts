import {
  GenerateDescription,
  GenerateImage,
  GenerateTitle,
  GenerateURL,
} from '@payloadcms/plugin-seo/dist/types'
import { envConfig } from '../../env.config'

export const generateTitle: GenerateTitle = (data: any) => {
  return `${data?.slug || 'lottery'} - ${data?.doc?.title.value || ''}`
}

export const generateDescription: GenerateDescription = (data: any) => {
  return `${data?.doc?.short_desc?.value || ''}`
}

export const generateImage: GenerateImage = (data: any) => {
  return `${data?.doc?.img?.value || ''}`
}

export const generateURL: GenerateURL = (data: any) => {
  return `${envConfig.SERVER_URL}/${data?.locale ? data?.locale + '/' : ''}${data?.slug || ''}`
}
