import type PocketBase from 'pocketbase';

export interface ISignupFormValues {
  username: string,
  email: string,
  emailVisibility: true,
  password: string,
  passwordConfirm: string,
  name: string
}

export class AuthService {

  pb: PocketBase

  constructor(pb: PocketBase) {
    this.pb = pb
  }

  logout = () => this.pb.authStore.clear()

  login = async (usernameOrEmail: string, password: string) => await this.pb.collection('users').authWithPassword(usernameOrEmail, password)

  signup = async (values: ISignupFormValues) => await this.pb.collection('users').create(values)

  requestVerification = async (email: string) => await this.pb.collection('users').requestVerification(email)
}