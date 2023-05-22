import React from "react";
import styles from "./CenteredCard.module.css";
import { 
    Button,
    Stack,
    Text,
} from '@chakra-ui/react'

export interface NewPlayerInfoScreenProps {
	children: React.ReactNode;
}

export function NewPlayerInfoScreen(npisprops: NewPlayerInfoScreenProps) {
    return (
    <Stack spacing={4}>
            <Button
            bg={'yellow.400'}
            color={'white'}
            _hover={{
                bg: 'yellow.500',
            }}>
                <Text fontSize={'2xl'}>Join a Team</Text>
            </Button>
            <Button
            bg={'green.400'}
            color={'white'}
            _hover={{
                bg: 'green.500',
            }}>
                <Text fontSize={'2xl'}>Create a Team</Text>
            </Button>
        </Stack>
    );
}