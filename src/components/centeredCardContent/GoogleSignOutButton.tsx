import React, { useEffect } from "react";
import { 
    Button
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import {initFirebaseApp} from '../../firebase.js';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";


export interface GoogleSignOutProps {
	children?: React.ReactNode;
}

export function GoogleSignOut(gsoprops: GoogleSignOutProps) {
    initFirebaseApp();
    const router = useRouter();
    const auth = getAuth();
    const [user] = useAuthState(auth);



    useEffect(() => {
        if (!user) {
            if (typeof window !== undefined) {
                router.push("/");
            }
        }
    }, [user])

    return (
        <Button
            bg={'red.400'}
            color={'white'}
            _hover={{
                bg: 'red.500',
            }}
            onClick={() => auth.signOut()}
            >
                Sign Out
        </Button>
    );
}
