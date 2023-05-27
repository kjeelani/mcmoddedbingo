import React, { useState, useEffect, useCallback } from "react";
import { 
    Flex,
    Heading,
    Spacer,
    Text,
    Box,
    Link,
    useDisclosure,
} from '@chakra-ui/react'
import {    
    AddIcon,
    LockIcon,
    UnlockIcon
} from '@chakra-ui/icons'
import { TeamData } from "../APIData";
import { TeamPasswordModal, TeamPasswordModalProps} from "./TeamPasswordModal";
import useAxios from "axios-hooks";
import { useRouter } from 'next/router';
import axios from "axios";

export interface TeamRowProps {
	team: TeamData;
    key?: string;
    spacing: number;
}

export function TeamRow(trprops: TeamRowProps) {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [shouldJoinTeam, setShouldJoinTeam] = useState(false);
    const [{ data, loading, error }, refetch] = useAxios({
        url: "api/teams/addMember",
        method: "PATCH"
      }, {manual: true}
    );

    useEffect(() => {
        let name = trprops.team.teamName;
        if(name.length > 12) {
            trprops.team.teamName = name.substring(0, 7) + "...";
            console.log(trprops.team.teamName)
        }
    }, [])
    

    useEffect(() => {
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
        if(shouldJoinTeam) {
            joinTeam();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldJoinTeam])

    return (
        <Box>
            {error && "Error"}
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
                    ? <Link onClick={onOpen}><AddIcon /></Link>
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
            <TeamPasswordModal 
                password={trprops.team.password}
                isOpen={isOpen}
                onCloseWithSubmit={() => {
                    setShouldJoinTeam(true);
                    onClose();
                }}
                onCloseWithOutSubmit={onClose}
            />
        </Box>
    );
}