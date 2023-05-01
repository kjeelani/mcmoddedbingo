//Need to take any new files uploaded by the team and upload them to storage, saving reference in DB
import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { collection, query, getDocs } from "firebase/firestore";
import {db} from '../firebase.js';

interface TeamData {
    teamID: string,
    teamName: string,
    players: string[], 
    isFull: boolean,
    challengesCompleted: number,
    nodes: {
        [challengeID: string]: Node
    }
}

interface UserData {
    username: string,
    userID: string,
    teamID: string
}

async function addUserToTeam(user: UserData) {
    /*
        Uploads image submission to server and updates database with saved image
    */
    const docRef = doc(db, "Teams", user.teamID);
    const docSnap = await getDoc(docRef);
    let isFull: boolean = false;  
    const teamToUpdate : TeamData | null = docSnap.data() as TeamData;
    if (teamToUpdate == null) {
        return isFull;
    } else if (teamToUpdate.players.length > 3) {
        teamToUpdate.isFull = true;
        isFull = true;
    } else {
        teamToUpdate.players.push(user.userID);
        await setDoc(doc(db, "Teams", teamToUpdate.teamID.toString()), teamToUpdate);
    }
    return isFull;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method == "POST") {
        try {
            const isFull = await addUserToTeam(req.body as UserData); 
            if (isFull) {
                res.status(401);
            } else {
                res.status(200);
            }
        } catch(error) {
            res.status(400);
        }
    } else {
        res.status(404);
    }
    res.end();
}