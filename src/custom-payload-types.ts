/**
 * Represents a user object extracted from a JWT token.
 * Used for defining the structure of user data obtained from JWT tokens.
 */
export interface JWTUser {
  id: string
  collection: string
  email: string
  roles?: ('admin' | 'manager' | 'editor' | 'user')[] | null
}
