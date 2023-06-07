import useAxios from "axios-hooks";
import {CenteredCard, CenteredCardProps} from '../../components/CenteredCard';
import { CreateTeam, CreateTeamProps } from '../../components/centeredCardContent/CreateTeam';
import { BingoNavbar } from '@/components/BingoNavbar';
import { useRouter } from 'next/router';
import { TeamData } from "@/components/lib/APIData";
import { 
    SimpleGrid, 
    Box, 
    Heading, 
    Text, 
    Button, 
    VStack, 
    useDisclosure 
} from "@chakra-ui/react";
import { BingoNode } from "@/components/utility/Bingo-Node";
import { useEffect } from "react";
import { useFetch } from "@/components/lib/AxiosHooks";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from '@chakra-ui/react'

import { TeamModal, TeamModalProps } from "@/components/utility/TeamModal";


function createNodes(nodes: any, team: any, userID: string) {
    if (nodes === undefined || team === undefined) {
        return <></>
    }
    return (
        Object.keys(nodes).sort((a:string, b:string) => nodes[a].order - nodes[b].order).map((chalID: string) => {
            return <BingoNode key={chalID} 
                        userID={userID}
                        teamData={team as TeamData} 
                        challengeID={chalID} 
                        status={nodes[chalID].status} 
                    />
        })
    );
}

/*Create A Team*/
export default function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const router = useRouter();
    let { username, teamID } = router.query;
    if (username === undefined) {
        username = "Username"
    }
    const [data, error, loading, refetch] = useFetch({
        url: `api/teams/${teamID as string}`,
        manual: true
    });

    useEffect(() => {
        if (!!!data) {
            refetch({url: `api/teams/${teamID as string}`});
        }
    }, [])

    return (
        <div>
            {!(!!data) && <BingoNavbar username={username as string}></BingoNavbar>}
            {!!data && <BingoNavbar teamname={data.name} username={username as string}></BingoNavbar>}
            <div className="App">
                {loading && "Loading..."}
                {!!data && 
                    <Box 
                        textAlign="center" 
                        mb="32.5vh" 
                        display={"flex"} 
                        alignItems={"center"} 
                        justifyContent={"center"} 
                        flexDirection={"column"}
                    >
                        <Heading 
                            mb="5vh"
                            bg={"rgb(247, 250, 252)"}
                            border={"2px solid rgb(136, 141, 146)"}
                            w="fit-content"
                            borderRadius={"15px"}
                            px={"20px"}
                            py={"10px"}
                            display={"flex"} 
                            alignItems={"center"} 
                            justifyContent={"center"} 
                            flexDirection={"row"}
                        >
                            <Popover trigger="hover">
                                <PopoverTrigger>
                                    <Text
                                        _hover={{
                                            cursor: "pointer"
                                        }}
                                        onClick={onOpen}
                                        bg={"rgb(20, 255, 200)"}
                                        px={"10px"}
                                        borderRadius={"15px"}
                                        border={"1px solid black"}
                                    >{`${data.teamName}`}</Text>
                                </PopoverTrigger>
                                <PopoverContent 
                                    w={"fit-content"} 
                                    bg={"rgb(253, 234, 202)"} 
                                    border={"0.5px solid rgb(50, 50, 50)"}
                                >
                                    <PopoverBody
                                        fontSize={"sm"}
                                    >Click for team list</PopoverBody>
                                </PopoverContent>   
                            </Popover>
                            &apos;s Bingo Board
                        </Heading>
                        <SimpleGrid w={"90vw"} h={"80vh"} columns={5} spacingX={10}>
                            {!!data && createNodes(data.nodes, data, router.query.userID as string)}
                        </SimpleGrid>
                        <TeamModal
                            teamName={data.teamName}
                            team={data.players}
                            isOpen={isOpen}
                            onClose={onClose}
                        ></TeamModal>
                    </Box> 
                }
            </div>
        </div>
    )
}