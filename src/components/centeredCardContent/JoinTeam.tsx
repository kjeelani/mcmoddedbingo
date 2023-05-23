import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";
import { 
    Stack,
    Text,
} from '@chakra-ui/react'
import { GoogleSignOut, GoogleSignOutProps} from "./GoogleSignOutButton"
import { TeamData, Teams } from "../APIData";
import { TeamRow } from "../Utility/TeamRow";

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
    const [{ data, error, loading }, refetch] = useAxios({
        url: `api/teams`,
        method: "GET"
      }, {manual: true}
    );

    useEffect(() => {
        refetch();
    }, [refetch])

    return (
        <Stack>
            <Text>
            {loading && "Loading..."}
            {error && "Error!"}
            {!!data && listTeams(data)}
            </Text>
        </Stack>
    );
}