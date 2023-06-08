import React from "react";
import { useRouter } from 'next/router';
import styles from "./CenteredCard.module.css";
import { 
    Button,
    Stack,
    Text,
} from '@chakra-ui/react';


export interface NewPlayerInfoScreenProps {
	children: React.ReactNode;
}

export function NewPlayerInfoScreen(npisprops: NewPlayerInfoScreenProps) {
    const router = useRouter();

    return (
    <Stack spacing={4}>
            <Button
            bg={'yellow.400'}
            color={'white'}
            _hover={{
                bg: 'yellow.500',
                boxShadow: "5px 5px rgb(177, 141, 26)"
            }}
            onClick={() => router.push({
                pathname: "/joinTeam",
                query: router.query
            })}
            >
                <Text fontSize={'xl'}>Join a Team</Text>
            </Button>
            <Button
            bg={'green.400'}
            color={'white'}
            _hover={{
                bg: 'green.500',
                boxShadow: "5px 5px rgb(38, 146, 92)"
            }}
            onClick={() => router.push({
                pathname: "/createTeam",
                query: router.query
            })}>
                <Text fontSize={'xl'}>Create a Team</Text>
            </Button>
        </Stack>
    );
}