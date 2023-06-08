import {CenteredCard, CenteredCardProps} from '../../components/CenteredCard';
import { JoinTeam, JoinTeamProps } from '../../components/centeredCardContent/JoinTeam';
import { BingoNavbar } from '@/components/BingoNavbar';
import { useRouter } from 'next/router';

/*Join A Team*/
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
                <CenteredCard goBackParams={router.query} goBackURL="/newPlayer" title={'Join a Team'}>
                    <JoinTeam>
                        ...
                    </JoinTeam>
                </CenteredCard>
            </div>
        </div>
    )
}
