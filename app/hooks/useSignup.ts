import useAuthStore from '../store/authStore';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'

const useSignup = () => {
    const { setUser, clearUser } = useAuthStore();

    const signup = async(props) => {
        await createUserWithEmailAndPassword(auth, props[0], props[1])
            .then(({ user }) => {
                console.log("signup successfully", user);
                setUser({ email: user.email, displayName: user.displayName })
            })
            .catch(err => {
                console.log("signup_firebase_err:", err)
                clearUser()
            });
    }
    return { signup }
}

export default useSignup;
