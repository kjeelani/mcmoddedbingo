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
    Link as ChakraLink
} from '@chakra-ui/react'


export interface LoginProps {
	children: React.ReactNode;
}

export function Login(lgprops: LoginProps) {
    const router = useRouter();

    return (
    <Stack spacing={4}>
        <FormControl id="email">
            <FormLabel>Email Address</FormLabel>
            <Input bg="white" type="email" />
        </FormControl>
        <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input bg="white" type="password" />
        </FormControl>
        <Stack spacing={10}>
            <Stack
            direction={{ base: 'column', sm: 'row' }}
            align={'start'}
            justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <GoogleSignIn></GoogleSignIn>
            </Stack>
            <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
                bg: 'blue.500',
            }}
            onClick={() => router.push("/newPlayer")}
            >
                Sign in
            </Button>
        </Stack>
    </Stack>
    );
}