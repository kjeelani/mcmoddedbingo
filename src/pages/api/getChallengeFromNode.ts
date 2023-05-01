import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, getDoc } from "firebase/firestore";
import {db} from '../firebase.js';

interface ChallengeData {
    challengeID: string,
    title: string,
    instructions: string,
    teamsCompleted: string[]
}

interface Node {
    challengeID: string,
    completed: boolean,
    data: string 
}

async function getTeamFromDB(challengeID: string) {
    const docRef = doc(db, "Challenges", challengeID);
    const docSnap = await getDoc(docRef);    

    if (docSnap.exists()) {
        return docSnap.data() as ChallengeData;
    } else {
        return null;
    }
}

// If the userID is -1, then this route will return an empty object
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChallengeData>
) {
    if (req.method == "GET") {
        try {
            const teamData: ChallengeData | null  = await getTeamFromDB(req.body.challengeID); 
            res.status(200).json(teamData as ChallengeData);
        } catch(error) {
            res.status(400);
        }
    } else {
        res.status(404);
    }
    res.end();
}

