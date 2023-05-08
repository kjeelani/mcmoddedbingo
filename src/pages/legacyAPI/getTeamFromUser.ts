import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, getDoc } from "firebase/firestore";
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

interface Node {
    challengeID: string,
    completed: boolean,
    data: string 
}

async function getTeamFromDB(teamID: string) {
    const docRef = doc(db, "Teams", teamID);
    const docSnap = await getDoc(docRef);    

    if (docSnap.exists()) {
        return docSnap.data() as TeamData;
    } else {
        return null;
    }
}

// If the userID is -1, then this route will return an empty object
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TeamData>
) {
    if (req.method == "GET") {
        try {
            const teamData: TeamData | null  = await getTeamFromDB(req.body.teamID); 
            res.status(200).json(teamData as TeamData);
        } catch(error) {
            res.status(400);
        }
    } else {
        res.status(404);
    }
    
    res.end();
}


