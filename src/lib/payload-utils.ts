import { currentUser } from '@/queries/auth/currentUser'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { NextRequest } from 'next/server'
import { User } from '../payload-types'

export const getServerSideUser = async (
  cookies: NextRequest['cookies'] | ReadonlyRequestCookies,
) => {
  const token = cookies.get('payload-token')?.value

  const meRes = await currentUser(token as string)

  const { user } = meRes as {
    user: User | null
  }

  return { user }
}
