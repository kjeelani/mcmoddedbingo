import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, query, getDocs } from "firebase/firestore";
import {db} from '../../../firebase.js';
import { ChallengeData } from '@/components/APIData.js';

function shuffleArray(array: ChallengeData[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array
}

export async function getAllChallengesShuffled() {
    let challenges: ChallengeData[] = [];
    const querySnapshot = await getDocs(query(collection(db, "Challenges")));
    querySnapshot.forEach((doc) => {
        challenges.push(doc.data() as ChallengeData);
    });
    return {"challenges": shuffleArray(challenges)};
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method == "GET") {
        try {
            let data = await getAllChallengesShuffled();
            res.status(200).json(data);
        } catch(error) {
            res.status(400);
        }
    } else {
        res.status(404);
    }
    res.end();
}

