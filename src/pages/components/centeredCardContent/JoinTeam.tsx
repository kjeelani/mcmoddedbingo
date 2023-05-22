import React, { useState } from "react";
import useAxios from "axios-hooks";
import { 
    useColorModeValue, 
    Flex,
    Card, 
    CardHeader, 
    CardBody, 
    Heading,
    Button,
    FormControl,
    Stack,
    Text,
    Box,
    FormLabel,
    Input,
    Link,
    Checkbox
} from '@chakra-ui/react'
import { TeamData, Teams } from "../ApiData";
import { TeamRow } from "../Team/TeamRow";

export interface JoinTeamProps {
	children: React.ReactNode;
}

const path = `api/teams`;

function listTeams(data: Teams) {
    return (
        data.teams.map((team: TeamData) => {
            return <TeamRow spacing={3} key={team.teamID} team={team} />
        })
    );
}

export function JoinTeam(jtprops: JoinTeamProps) {
    const [{ data, loading, error, response }] = useAxios({
        url: path,
        method: "GET"
      }
    );

    return (
        <Text>
            {loading && "Loading..."}
            {!!error && error.message}
            {!!data && listTeams(data)}
        </Text>
    );
}