import {CenteredCard, CenteredCardProps} from '../../components/CenteredCard';
import {NewPlayerInfoScreen, NewPlayerInfoScreenProps} from '../../components/centeredCardContent/NewPlayerInfoScreen';
import { BingoNavbar } from '@/components/BingoNavbar';
import { useRouter } from 'next/router';


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
                <CenteredCard title={'Join/Create a Team'}>
                    <NewPlayerInfoScreen>
                        ...
                    </NewPlayerInfoScreen>
                </CenteredCard>
            </div>
        </div>
    )
}



