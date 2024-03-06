//import { LoginUserProps } from 'types/auth';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface LoginUserProps {
    email: string | null;
    displayName: string | null;
    // Add other properties as needed
}

interface AuthState {
    user: null | LoginUserProps;
    setUser: (user: LoginUserProps) => void;
    clearUser: () => void;
}

const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                setUser: (user) => set({ user }),
                clearUser: () => set({ user: null })
            }),
            {
                name: 'auth-storage'
            }
        )
    )
);

export default useAuthStore;