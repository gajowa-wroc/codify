import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';

export const logout = async() => {
  await signOut(auth).then(() => {
    console.log('signout successfully')
  }).catch(err => {
    console.log('firebase error', err)
  })
}
