import React from "react";
import styles from "./CenteredCard.module.css";
import { 
    useColorModeValue, 
    Flex,
    Card, 
    CardHeader, 
    CardBody, 
    Heading,
    Button,
    FormControl,
    Stack,
    Text,
    Box,
    FormLabel,
    Input,
    Link,
    Checkbox
} from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

export interface LoginProps {
	children: React.ReactNode;
}

export function Login(lgprops: LoginProps) {
    return (
    <Stack spacing={4}>
        <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
        </FormControl>
        <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
        </FormControl>
        <Stack spacing={10}>
            <Stack
            direction={{ base: 'column', sm: 'row' }}
            align={'start'}
            justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
            </Stack>
            <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
                bg: 'blue.500',
            }}>
                Sign in
            </Button>
        </Stack>
    </Stack>
    );
}