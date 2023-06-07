import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState, ReactNode } from 'react';
import {CenteredCard, CenteredCardProps} from '../components/CenteredCard';
import {Login} from '../components/centeredCardContent/Login';



/*Login*/
export default function Home() {
    return (
        <div className="App">
            <CenteredCard title={'Login'}>
                <Login>...</Login>
            </CenteredCard>
        </div>
    )
}
