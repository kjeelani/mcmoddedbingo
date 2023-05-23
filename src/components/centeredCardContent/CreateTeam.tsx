import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";
import { 
    Flex,
    Spacer,
    Text,
    Stack,
    Input,
    Link,
    Button,
    HStack
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

interface SubmissionData {
    teamName: string,
    password: string
}

export function CreateTeam(ctprops: CreateTeamProps) {
    const router = useRouter();
    const [{ data, error, loading}, refetch] = useAxios({
        url: `api/teams`,
        method: "POST"
      }
    );
    const [teamName, setTeamName] = useState('');
    const [password, setPassword] = useState('');
    const [submission, setSubmission] = useState<any>(null);

    
    // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(() => {
        const getNodes = () => {
            //This GETS data.challenges, a SHUFFLED ARRAY of ChallengeData objects
           const nodes: any = {}
           for (let chal of data.challenges) {
               nodes[chal.challengeID] = {
                   "challengeID": chal.challengeID,
                   "status": 0,
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
                "teamID": hashCode(submission.teamName).toString(),
                "teamName": submission.teamName,
                "password": submission.password,
                "players": [router.query.userID as string],
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
        if (submission !== null &&
            submission.teamName.length > 0
            && submission.password.length > 0
            && !!data) {
            createTeam();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submission, data])

    return (
        <Stack>
            <HStack 
                bgColor='gray.100'
                rounded='md'
                mb="1vh"
                p={3} 
                minWidth='max-content' 
                alignItems='center' 
                gap='2'
            >
                <Text fontSize='l'>Create Team: </Text>
                <Input 
                    fontSize='l' 
                    value={teamName} 
                    onChange={(e: any) => {
                        setTeamName(e.target?.value);
                    }}
                ></Input>
            </HStack>
            <HStack 
                bgColor='gray.100'
                rounded='md'
                mb="2vh"
                p={3} 
                minWidth='max-content' 
                alignItems='center' 
                gap='2'
            >
                <Text fontSize='l'>Enter Passcode: </Text>
                <Input 
                    fontSize='l' 
                    value={password} 
                    onChange={(e: any) => {
                        setPassword(e.target?.value);
                    }}
                ></Input>
            </HStack>
            <Button 
                    colorScheme='blue' 
                    mr={3} 
                    onClick={(e) => {
                        e.preventDefault()
                        if (!!!data) {
                            refetch({
                                url: 'api/challenges',
                                method: "GET",
                            });
                        }
                        setSubmission({
                            teamName: teamName,
                            password: password
                        });
                    }}
                >
                Continue
                </Button>
        </Stack>
    );
}