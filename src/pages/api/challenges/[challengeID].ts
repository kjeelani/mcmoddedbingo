import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, getDoc } from "firebase/firestore";
import {db} from '../../../firebase.js';
import { ParsedUrlQuery } from 'querystring';
import { ChallengeData } from '@/components/lib/APIData.js';

async function getTeamFromDB(challengeID: string) {
    const docRef = doc(db, "Challenges", challengeID);
    const docSnap = await getDoc(docRef);    

    if (docSnap.exists()) {
        return docSnap.data() as ChallengeData;
    } else {
        return null;
    }
}

interface ChallengeQuery extends ParsedUrlQuery {
    challengeID?: string
}

interface ChallengeRequest extends NextApiRequest {
    query: ChallengeQuery;
}

// If the userID is -1, then this route will return an empty object
export default async function handler(
  req: ChallengeRequest,
  res: NextApiResponse<ChallengeData>
) {
    if (req.method == "GET") {
        try {
            if (req.query.challengeID !== undefined) {
                const chalData: ChallengeData | null  = await getTeamFromDB(req.query.challengeID); 
                res.status(200).json(chalData as ChallengeData);
            } else {
                res.status(400);
            }  
        } catch(error) {
            res.status(400);
        }
    } else {
        res.status(404);
    }
    res.end();
}


