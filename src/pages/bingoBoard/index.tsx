import useAxios from "axios-hooks";
import {CenteredCard, CenteredCardProps} from '../../components/CenteredCard';
import { CreateTeam, CreateTeamProps } from '../../components/centeredCardContent/CreateTeam';
import { BingoNavbar } from '@/components/BingoNavbar';
import { useRouter } from 'next/router';
import { TeamData } from "@/components/APIData";
import { SimpleGrid, Box, Heading } from "@chakra-ui/react";
import { BingoNode } from "@/components/Team/BingoNode";
import { useEffect } from "react";


function createNodes(nodes: any, team: any) {
    return (
        Object.keys(nodes).map((chalID: string) => {
            return <BingoNode key={chalID} 
                        teamData={team as TeamData} 
                        challengeID={chalID} 
                        completed={nodes[chalID].completed} 
                    />
        })
    );
}

/*Create A Team*/
export default function Home() {
    const router = useRouter();
    let { username, teamID } = router.query;
    if (username === undefined) {
        username = "Username"
    }
    const [{ data, loading }, refetch] = useAxios({
        url: `api/teams/${teamID as string}`,
        method: "GET",
    }, {manual: true});

    useEffect(() => {
        refetch();
    }, [refetch])

    return (
        <div>
            {!(!!data) && <BingoNavbar username={username as string}></BingoNavbar>}
            {!!data && <BingoNavbar teamname={data.name} username={username as string}></BingoNavbar>}
            <div className="App">
                {loading && "Loading..."}
                {!!data && 
                    <Box textAlign="center" mb="6vh">
                        <Heading mb="3vh">{`${data.teamName}'s Bingo Board`}</Heading>
                        <SimpleGrid columns={5} spacing={3}>
                            {!!data && createNodes(data.nodes, data)}
                        </SimpleGrid>
                    </Box> 
                }
            </div>
        </div>
    )
}