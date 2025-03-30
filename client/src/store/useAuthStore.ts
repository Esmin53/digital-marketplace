import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type authUserState = {
    currentUser: {
        user: {
            username: string,
            id: string,
            role: string
        },
        token: string
    } | null,
    signIn: (user: {id: string, username: string, token: string, role: string}) => void,
    updateUser: (user: {id: string, username: string, role: string}) => void,
    signOut: () => void
}

export const useAuthStore = create<authUserState>()(
    persist(
        (set) => ({
            currentUser: null,
            signIn: (user) => 
                set(() => {
                    return { currentUser: {
                        user: {
                            username: user.username,
                            id: user.id,
                            role: user.role
                        },
                        token: user.token
                    }}
                }),
            updateUser: (data) => 
                set((state) => ({
                   currentUser: {
                    user: {
                        username: data.username,
                        id: data.id,
                        role: data.role
                    },
                    token: state?.currentUser?.token as string
                   }
                  })),
                signOut: () => set({ currentUser: null})
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
)