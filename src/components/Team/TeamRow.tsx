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
import { TeamData } from "../APIData";
import useAxios from "axios-hooks";
import { useRouter } from 'next/router';

export interface TeamRowProps {
	team: TeamData;
    key?: string;
    spacing: number;
}

export function TeamRow(trprops: TeamRowProps) {
    const router = useRouter();
    const [{ data }, refetch] = useAxios({
        url: "api/teams/addMember",
        method: "PATCH"
      }, {manual: true}
    );

    const joinTeam = async () => {
        const user = router.query;
        user.teamID = trprops.team.teamID;

        await refetch({
            url: "api/teams/addMember",
            method: "PATCH",
            data: user,
        });
        await refetch({
            url: "api/users",
            method: "POST",
            data: user,
        });
        router.push({
            pathname: "/bingoBoard",
            query: user
        });
    }

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
                {
                    trprops.team.players.length < 4
                    ? <Link onClick={joinTeam}><AddIcon /></Link>
                    : <Link><AddIcon /></Link>
                }
                <Text fontSize='l'>{trprops.team.teamName}</Text>
                <Spacer />
                <Text fontSize='l'>{`${trprops.team.players.length}/4`}</Text>
                {
                    trprops.team.players.length == 4
                    ? <LockIcon color="red.700"/>
                    : <UnlockIcon color="green.700"/>
                }
            </Flex>
        </Box>
    );
}