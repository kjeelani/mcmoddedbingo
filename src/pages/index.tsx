import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState, ReactNode } from 'react';
import {CenteredCard, CenteredCardProps} from './components/CenteredCard';
import {Login, LoginProps} from './components/centeredCardContent/Login';
import {NewPlayerInfoScreen, NewPlayerInfoScreenProps} from './components/centeredCardContent/NewPlayerInfoScreen';
import { JoinTeam, JoinTeamProps } from './components/centeredCardContent/JoinTeam';
import { CreateTeam, CreateTeamProps } from './components/centeredCardContent/CreateTeam';


// /*Login*/
// export default function Home() {
//     return (
//         <div className="App">
//             <CenteredCard title={'Login'}>
//                 <Login>
//                     ...
//                 </Login>
//             </CenteredCard>
//         </div>
//     )
// }



// /*NewPlayerInfoScreen*/
// export default function Home() {
//     return (
//         <div className="App">
//             <CenteredCard title={'Join/Create a Team'}>
//                 <NewPlayerInfoScreen>
//                     ...
//                 </NewPlayerInfoScreen>
//             </CenteredCard>
//         </div>
//     )
// }



// /*Join A Team*/
// export default function Home() {
//     return (
//         <div className="App">
//             <CenteredCard title={'Join Team'}>
//                 <JoinTeam>
//                     ...
//                 </JoinTeam>
//             </CenteredCard>
//         </div>
//     )
// }



/*Create A Team*/
export default function Home() {
    return (
        <div className="App">
            <CenteredCard title={'Join Team'}>
                <CreateTeam>
                    ...
                </CreateTeam>
            </CenteredCard>
        </div>
    )
}
