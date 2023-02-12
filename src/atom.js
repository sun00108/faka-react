import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const isLoginAtom = atomWithStorage( 'isLogin', false)
export const isAdminAtom = atomWithStorage( 'isAdmin', false)
export const jwtTokenAtom = atomWithStorage( 'jwtToken', '')
export const usernameAtom = atomWithStorage( 'username', '')