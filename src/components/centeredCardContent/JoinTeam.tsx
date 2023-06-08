import React, { useEffect, useState } from "react";
import { useFetch } from "../lib/AxiosHooks"
import { 
    Stack,
    Text,
    useDisclosure,
    Link
} from '@chakra-ui/react'
import { GoogleSignOut, GoogleSignOutProps} from "./GoogleSignOutButton"
import { TeamData, Teams } from "../lib/APIData";
import { TeamRow, TeamRowProps } from "../utility/TeamRow";
import { TeamModal, TeamModalProps } from '@/components/utility/TeamModal';

export interface JoinTeamProps {
	children: React.ReactNode;
}

interface TeamRowModalProps {
    team: TeamData
}

function TeamRowModal(props: TeamRowModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Link 
                onClick={onOpen}
                _hover={{
                    textDecoration: "none"
                }}
            >
                <TeamRow spacing={3} key={props.team.teamID} team={props.team} />
            </Link>
            <TeamModal
                teamName={props.team.teamName}
                team={props.team.players}
                isOpen={isOpen}
                onClose={onClose}
            ></TeamModal>
        </>
    )
}

function listTeams(data: Teams) {
    return (
        data.teams.map((team: TeamData) => {
            return <TeamRowModal team={team}></TeamRowModal>
        })
    );
}

export function JoinTeam(jtprops: JoinTeamProps) {
    const [data, error, loading, refetch] = useFetch({
        url: `api/teams`,
        manual: true
    });

    
    
    useEffect(() => {
        if (!data) {
            refetch({url: `api/teams`});
        }
    }, [])

    return (
        <Stack>
            <Text>
            {loading && "Loading..."}
            {error && "Error!"}
            {data && listTeams(data)}
            </Text>
        </Stack>
    );
}