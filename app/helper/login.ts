import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

export const login = async(props) => {
    console.log("propsprops",props)
    await signInWithEmailAndPassword(auth, props[0], props[1])
        .then(({ user }) => {
            console.log("login successfully", user);
        })
        .catch(err => {
            console.log("login_firebase_err:", err)
        });
}
