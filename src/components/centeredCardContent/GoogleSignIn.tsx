import React, { useState } from "react";
import useAxios from "axios-hooks";
import { 
    Link as ChakraLink
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import {initFirebaseApp} from '../../pages/firebase.js';


export interface GoogleSignInProps {
	children?: React.ReactNode;
}

export function GoogleSignIn(gsiprops: GoogleSignInProps) {
    initFirebaseApp();
    const router = useRouter();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [user] = useAuthState(auth);

    const [{ data, loading, error }, refetch] = useAxios({
        url: "api/users",
        method: "GET"
      }, {manual: true}
    );

    if (user && data) {
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
        router.push({
            pathname: pathName,
            query: queryObj
        });
    }

    const signIn = async () => {
        const result = await signInWithPopup(auth, provider);
        await refetch({
            url: `api/users/${result.user.email}`,
            method: "GET",
        });
    }

    return (
        <ChakraLink onClick={signIn} color={'blue.400'}>Sign in with Google!</ChakraLink>
    );
}