import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import useAuthStore from '../store/authStore';

const useLogin = () => {
  const { setUser, clearUser } = useAuthStore();

  const login = async (props) => {
    console.log("EXAMPLE__inside_func")


    await signInWithEmailAndPassword(auth, props[0], props[1])
      .then((res) => {
        setUser({ email: res.user?.email, displayName: res.user?.displayName })
        console.log("USER_logged successfully", res.user);
        console.log("EXAMPLE__inside_func_FireBase")
      })
      .catch(err => {
        console.log("login_firebase_err:", err)
        clearUser()
      });
  }

  return { login }
}

export default useLogin;

