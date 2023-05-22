import {
    Box,
    Heading,
    Text,
    Flex,
    HStack,
    Spacer,
    Avatar,
} from '@chakra-ui/react';
import { GoogleSignOut } from './centeredCardContent/GoogleSignOutButton';

export interface BingoNavbarProps {
	username: string;
    teamname?: string;
}

export function BingoNavbar(bnProps: BingoNavbarProps) {
    let title = bnProps.teamname !== undefined ? `${bnProps.teamname}'s Bingo Board` : `Welcome ${bnProps.username}`
    return (
        <Box p="1vh" as="nav" bg="orange.100" boxShadow="sm">
            <HStack spacing="10" justify="space-between">
            <Flex justify="space-between" flex="1">
                <Avatar name={bnProps.username} />
                <Text fontSize='lg' ml="2vh" mt="1vh">{title}</Text>
                <Spacer></Spacer>
                <GoogleSignOut></GoogleSignOut>
            </Flex>
            </HStack>
        </Box>
    );
}