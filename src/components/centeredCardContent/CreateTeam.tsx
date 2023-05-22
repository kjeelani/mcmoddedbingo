import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";
import { 
    Flex,
    Spacer,
    Text,
    Stack,
    Input,
    Link,
    Button
} from '@chakra-ui/react'
import {    
    AddIcon,
} from '@chakra-ui/icons'
import { TeamData, hashCode } from "../APIData";
import { GoogleSignOut, GoogleSignOutProps} from "./GoogleSignOutButton"
import { useRouter } from "next/router";


export interface CreateTeamProps {
	children: React.ReactNode;
}

export function CreateTeam(ctprops: CreateTeamProps) {
    const router = useRouter();
    const [{ data, loading, error}, refetch] = useAxios({
        url: `api/teams`,
        method: "POST"
      }, {manual: true}
    );
    const [input, setInput] = useState('');
    const [finalInput, setFinalInput] = useState('');
    const handleInputChange = (e: any) => setInput(e.target?.value);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(() => {
        const getNodes = () => {
            //This GETS data.challenges, a SHUFFLED ARRAY of ChallengeData objects
           const nodes: any = {}
           for (let chal of data.challenges) {
               nodes[chal.challengeID] = {
                   "challengeID": chal.challengeID,
                   "completed": false,
                   "data": ""
               }
               if (Object.keys(nodes).length === 25) {
                   break;
               }
           }
           return nodes;
        }
        const createTeam = async () => {
            const newTeam: TeamData = {
                "teamID": hashCode(finalInput).toString(),
                "teamName": finalInput,
                "players": [router.query.userID as string], 
                "challengesCompleted": 0,
                "nodes": getNodes()
            }
            const user = router.query;
            user.teamID = newTeam.teamID;
            await refetch({
                url: `api/teams`,
                method: "POST",
                data: newTeam
            });
            await refetch({
                url: "api/users",
                method: "POST",
                data: user,
            });
            router.push({
                pathname: "/bingoBoard",
                query: user
            })
        }
        if (finalInput.length > 0 && !!data) {
            createTeam();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finalInput, data])

    return (
        <Stack>
            <Flex 
                bgColor='gray.100'
                rounded='md'
                mb={3}
                p={3} 
                minWidth='max-content' 
                alignItems='center' 
                gap='2'
            >
                <Text fontSize='l'>Create Team: </Text>
                <Input fontSize='l' value={input} onChange={handleInputChange}></Input>
                <Spacer />
                <Button onClick={() => {
                        refetch({
                            url: 'api/challenges',
                            method: "GET",
                        });
                        setFinalInput(input);
                    }}>
                    <AddIcon />
                </Button>
            </Flex>
        </Stack>
    );
}