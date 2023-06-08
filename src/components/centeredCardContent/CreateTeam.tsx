import React, { useEffect, useState } from "react";
import { useFetch, usePost } from "../lib/AxiosHooks";
import { 
    Text,
    Stack,
    Input,
    Button,
    HStack
} from '@chakra-ui/react'
import { TeamData, hashCode } from "../lib/APIData";
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
    const [ error, loading, repost] = usePost({
        url: `XXX`,
        manual: true
    });
    const [ data, fetchError, fetchLoading, refetch] = useFetch({
        url: `XXX`,
        manual: true
    });
    const [teamName, setTeamName] = useState('');
    const [password, setPassword] = useState('');
    const [submission, setSubmission] = useState<any>(null);

    
    // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(() => {
        const getNodes = () => {
            //This GETS data.challenges, a SHUFFLED ARRAY of ChallengeData objects
            const nodes: any = {}
            const difficultyArr = [
                2,3,2,3,2,
                3,2,1,2,3,
                1,2,4,2,2,
                3,1,2,2,3,
                2,3,2,3,1
            ];
            let i = 0; let diffIndex = 0;
            for (let diff of difficultyArr) {
                while (true) {
                    let chal = data.challenges[i];
                    if (chal.difficulty === diff && !(chal.challengeID in nodes)) {
                        nodes[chal.challengeID] = {
                            "challengeID": chal.challengeID,
                            "order": diffIndex,
                            "status": 0,
                            "data": ""
                        }
                        break;
                    }
                    i = (i + 1) % data.challenges.length;
                }
                diffIndex++;
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
            await repost({
                url: `api/teams`,
                data: newTeam
            });
            await repost({
                url: "api/users",
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
                alignItems='center' 
                gap='.5vh'
            >
                <Text fontSize='md'>Create Team: </Text>
                <Input 
                    fontSize='md' 
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
                width="100%"
                alignItems='center' 
                gap='2'
            >
                <Text fontSize='md'>Enter Passcode: </Text>
                <Input 
                    fontSize='md' 
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