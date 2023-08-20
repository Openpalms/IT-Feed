import { User } from 'app/entities/User'

export interface IComment {
  id: string
  user: User
  text: string
}
