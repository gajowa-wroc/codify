import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'

export const signup = async(props) => {

    await createUserWithEmailAndPassword(auth, props[0], props[1])
        .then(({ user }) => {
            console.log("signup successfully", user);
        })
        .catch(err => {
            console.log("signup_firebase_err:", err)
        });
}
