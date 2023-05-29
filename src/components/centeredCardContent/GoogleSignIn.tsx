import React, { useEffect, useState } from "react";
import { useFetch } from "../lib/AxiosHooks";
import { 
    Link as ChakraLink,
    Box,
    Flex,
    Button
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import {initFirebaseApp} from '../../firebase.js';


export interface GoogleSignInProps {
	children?: React.ReactNode;
}

export function GoogleSignIn(gsiprops: GoogleSignInProps) {
    initFirebaseApp();
    const router = useRouter();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [user] = useAuthState(auth);
    const [data, error, loading, refetch] = useFetch({
        url: `XXX`,
        manual: true
    });


    if (user && !!data) {
        let pathName: string = "/newPlayer";
        let queryObj = {};
        if (data.teamID == "-1") {
            queryObj = {
                "username": user.displayName as string,
                "userID": user.email as string,
                "email": user.email as string,
                "teamID": "-1"
            };
        } else {
            queryObj = data;
            pathName = "/bingoBoard"
        }
        if (typeof window !== undefined) {
            router.push({
                pathname: pathName,
                query: queryObj
            });
        }
    }

    const signIn = async () => {
        const result = await signInWithPopup(auth, provider);

        await refetch({
            url: `api/users/${result.user.email}`      
        });
    }

    return (
        <Button
            w="100%"
            h="50px"
            alignItems="center"
            justifyContent="center"
            onClick={signIn}
            bg={'rgb(48, 151, 149)'}
            color={'white'}
            _hover={{
                bg: 'rgb(28, 131, 129)',
                boxShadow: "5px 5px rgb(8, 111, 109)"
            }}
            _focus={{
                bg: 'blue.700',
                boxShadow: "5px 5px rgb(23, 62, 109)"
            }}
            
        >
            Sign in with Google
        </Button>
    );
}