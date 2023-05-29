import useAxios from "axios-hooks";
import {CenteredCard, CenteredCardProps} from '../../components/CenteredCard';
import { CreateTeam, CreateTeamProps } from '../../components/centeredCardContent/CreateTeam';
import { BingoNavbar } from '@/components/BingoNavbar';
import { useRouter } from 'next/router';
import { TeamData } from "@/components/lib/APIData";
import { SimpleGrid, Box, Heading } from "@chakra-ui/react";
import { BingoNode } from "@/components/utility/BingoNode";
import { useEffect } from "react";
import { useFetch } from "@/components/lib/AxiosHooks";


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
                    <Box textAlign="center" mb="6vh">
                        <Heading mb="3vh">{`${data.teamName}'s Bingo Board`}</Heading>
                        <SimpleGrid columns={5} spacing={3}>
                            {!!data && createNodes(data.nodes, data, router.query.userID as string)}
                        </SimpleGrid>
                    </Box> 
                }
            </div>
        </div>
    )
}