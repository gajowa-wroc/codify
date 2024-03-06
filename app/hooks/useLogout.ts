import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import useAuthStore from '../store/authStore';

const useLogout = () => {
    const { clearUser } = useAuthStore();

    const logout = async () => {

        await signOut(auth).then(() => {
            console.log('signout successfully')
            clearUser()
        }).catch(err => {
            console.log('firebase error', err)
        })
    }

    return { logout }
}

export default useLogout;
