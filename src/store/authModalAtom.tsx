import { atom } from 'jotai'

export enum AuthModalView {
  logIn = 'logIn',
  signUp = 'signUp',
  resetPassword = 'resetPassword',
}

export interface AuthModalState {
  open: boolean
  view: AuthModalView
}

const defaultModalState: AuthModalState = {
  open: false,
  view: AuthModalView.logIn,
}

export const authModalState = atom<AuthModalState>(defaultModalState)
