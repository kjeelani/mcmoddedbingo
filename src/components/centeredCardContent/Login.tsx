import React from "react";
import { useRouter } from 'next/router';
import { GoogleSignIn, GoogleSignInProps} from "./GoogleSignIn"
import { 
    Button,
    FormControl,
    Stack,
    FormLabel,
    Input,
    Checkbox,
    Link as ChakraLink,
    Spacer
} from '@chakra-ui/react'


// export interface LoginProps {
// 	children: React.ReactNode;
// }

export function Login(/*lgprops: LoginProps*/) {
    const router = useRouter();

    return (
    <Stack spacing={10}>
        <Stack spacing={5}>
            <div 
                style={{
                    width: "312px",
                    height: "2px",
                    backgroundColor: "rgb(223, 262, 240)",
                }}
            ></div>
            <Stack>
                <GoogleSignIn></GoogleSignIn>
            </Stack>
            <Spacer></Spacer>
        </Stack>
    </Stack>
    );
}