import React, { useState } from "react";
import { 
    Flex,
    Heading,
    Spacer,
    Text,
    Box,
    Link,
} from '@chakra-ui/react'
import {    
    AddIcon,
    LockIcon,
    UnlockIcon
} from '@chakra-ui/icons'
import { TeamData } from "../ApiData";

export interface TeamRowProps {
	team: TeamData;
    key?: string;
    spacing: number;
}

export function TeamRow(trprops: TeamRowProps) {
    return (
        <Box>
            <Flex 
                bgColor='gray.100'
                rounded='md'
                mb={trprops.spacing}
                p={trprops.spacing} 
                minWidth='max-content' 
                alignItems='center' 
                gap='8'
            >
                <AddIcon />
                <Text fontSize='l'>{trprops.team.teamName}</Text>
                <Spacer />
                <Text fontSize='l'>{`${trprops.team.players.length}/4`}</Text>
                {
                    trprops.team.players.length == 4
                    ? <LockIcon />
                    : <UnlockIcon />
                }
            </Flex>
        </Box>
    );
}