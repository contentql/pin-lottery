import {
  GenerateDescription,
  GenerateImage,
  GenerateTitle,
  GenerateURL,
} from '@payloadcms/plugin-seo/dist/types'
import { envConfig } from '../../env.config'

export const generateTitle: GenerateTitle = (data: any) => {
  const title = `${data?.slug || 'lottery'} - ${data?.doc?.title.value || ''}`

  return title
}

export const generateDescription: GenerateDescription = (data: any) => {
  const description = `${data?.doc?.short_desc?.value || ''}`

  return description
}

export const generateImage: GenerateImage = (data: any) => {
  const image = `${data?.doc?.img?.value || ''}`

  return image
}

export const generateURL: GenerateURL = (data: any) => {
  const url = `${envConfig.SERVER_URL}/${data?.locale ? data?.locale + '/' : ''}${data?.slug || ''}/${data?.id || ''}`

  return url
}
