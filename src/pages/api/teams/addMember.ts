//Need to take any new files uploaded by the team and upload them to storage, saving reference in DB
import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { collection, query, getDocs } from "firebase/firestore";
import {db} from '../../firebase.js';
import { TeamData, UserData } from '@/components/APIData';

async function addUserToTeam(user: UserData) {
    /*
        Adds user to Team
    */
    const docRef = doc(db, "Teams", user.teamID);
    const docSnap = await getDoc(docRef);
    const teamToUpdate : TeamData | null = docSnap.data() as TeamData;

    if (teamToUpdate === null) {
        return;
    }
    teamToUpdate.players.push(user.userID);
    await setDoc(doc(db, "Teams", teamToUpdate.teamID.toString()), teamToUpdate);
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method == "PATCH") {
        try {
            await addUserToTeam(req.body as UserData); 
        } catch(error) {
            res.status(400);
        }
    } else {
        res.status(404);
    }
    res.end();
}