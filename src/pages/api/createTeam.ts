import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, setDoc } from "firebase/firestore";
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

async function createTeam(team: TeamData) {
    await setDoc(doc(db, "Teams", team.teamID.toString()), team)
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method == "POST") {
        try {
            await createTeam(req.body); 
            res.status(200);
        } catch(error) {
            res.status(404);
        }
    } else {
        res.status(400);
    }
    res.end();
}


