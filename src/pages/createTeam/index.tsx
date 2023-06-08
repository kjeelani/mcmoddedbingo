import {CenteredCard, CenteredCardProps} from '../../components/CenteredCard';
import { CreateTeam, CreateTeamProps } from '../../components/centeredCardContent/CreateTeam';
import { BingoNavbar } from '@/components/BingoNavbar';
import { useRouter } from 'next/router';


/*Create A Team*/
export default function Home() {
    const router = useRouter();
    let { username } = router.query;
    if (username === undefined) {
        username = "Username"
    }

    return (
        <div>
            <BingoNavbar username={username as string}></BingoNavbar>
            <div className="App">
                <CenteredCard goBackParams={router.query} goBackURL="/newPlayer" title={'Create a Team'}>
                    <CreateTeam>
                        ...
                    </CreateTeam>
                </CenteredCard>
            </div>
        </div>
    )
}