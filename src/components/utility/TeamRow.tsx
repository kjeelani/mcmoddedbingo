import React, { useState, useEffect, ReactNode } from "react";
import { 
    Flex,
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
import { TeamData } from "../lib/APIData";
import { TeamPasswordModal, TeamPasswordModalProps} from "./TeamPasswordModal";
import { TeamModal, TeamModalProps } from '@/components/utility/TeamModal';
import { useRouter } from 'next/router';
import { usePost } from "../lib/AxiosHooks";

export interface TeamRowProps {
	team: TeamData;
    key?: string;
    spacing: number;
}

interface TextLinkProps {
    team: TeamData,
    children: ReactNode
}

function TextLink(tlprops: TextLinkProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Link
                onClick={onOpen}
                _hover={{
                    textDecoration: "none"
                }}
            >
                <Text fontSize='l' w="150px">{tlprops.children}</Text>
            </Link>
            <TeamModal
                teamName={tlprops.team.teamName}
                team={tlprops.team.players}
                isOpen={isOpen}
                onClose={onClose}
            ></TeamModal>
        </>
    )
}

export function TeamRow(trprops: TeamRowProps) {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [shouldJoinTeam, setShouldJoinTeam] = useState(false);
    const [ error, loading, repost] = usePost({
        url: `XXX`,
        manual: true
    });
    
    useEffect(() => {
        const joinTeam = async () => {
            const user = router.query;
            user.teamID = trprops.team.teamID;
    
            await repost({
                url: "api/teams/addMember",
                data: user,
            });
            await repost({
                url: "api/users",
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

    function truncate(teamName: string) {
        if(teamName.length > 12) {
            return teamName.substring(0, 7) + "...";
        }
        return teamName;
    }

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
                <TextLink team={trprops.team}>{truncate(trprops.team.teamName)}</TextLink>
                {/* <Spacer /> */}
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