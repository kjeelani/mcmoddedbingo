import React, { useState } from "react";
import useAxios from "axios-hooks";
import { 
    Flex,
    Spacer,
    Text,
    Box,
    Input,
    Link,
    Button
} from '@chakra-ui/react'
import {    
    AddIcon,
} from '@chakra-ui/icons'
import { TeamData } from "../ApiData";

export interface CreateTeamProps {
	children: React.ReactNode;
}

const path = `api/teams`;

export function CreateTeam(ctprops: CreateTeamProps) {
    const [{ data, loading, error}, refetch] = useAxios({
        url: path,
        method: "POST"
      }, {manual: true}
    );
    const [input, setInput] = useState('');
    const handleInputChange = (e: any) => setInput(e.target?.value)



    const hashCode = (s: string) => {
        var h = 0, l = s.length, i = 0;
        if ( l > 0 )
          while (i < l)
            h = (h << 5) - h + s.charCodeAt(i++) | 0;
        return h;
    };

    const createTeam = async () => {
        const newTeam: TeamData = {
            "teamID": hashCode(input).toString(),
            "teamName": input,
            "players": ["exampleUser"], 
            "challengesCompleted": 0,
            "nodes": {}
        }
        refetch({
            url: path,
            method: "POST",
            data: newTeam
          })
    }

    return (
        <Box>
            <Flex 
                bgColor='gray.100'
                rounded='md'
                mb={3}
                p={3} 
                minWidth='max-content' 
                alignItems='center' 
                gap='8'
            >
                <Text fontSize='l'>Create Team: </Text>
                <Input fontSize='l' value={input} onChange={handleInputChange}></Input>
                <Spacer />
                <Button onClick={createTeam}>
                    <AddIcon />
                </Button>
            </Flex>
        </Box>
    );
}