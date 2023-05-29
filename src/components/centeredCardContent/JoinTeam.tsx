import React, { useEffect, useState } from "react";
import { useFetch } from "../lib/AxiosHooks"
import { 
    Stack,
    Text,
} from '@chakra-ui/react'
import { GoogleSignOut, GoogleSignOutProps} from "./GoogleSignOutButton"
import { TeamData, Teams } from "../lib/APIData";
import { TeamRow, TeamRowProps } from "../utility/TeamRow";

export interface JoinTeamProps {
	children: React.ReactNode;
}

function listTeams(data: Teams) {
    return (
        data.teams.map((team: TeamData) => {
            return <TeamRow spacing={3} key={team.teamID} team={team} />
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