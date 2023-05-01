import type { NextApiRequest, NextApiResponse } from 'next'
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

interface Node {
    challengeID: string,
    completed: boolean,
    data: string 
}

async function getAllTeamsFromDB() {
    let teams: TeamData[] = [];
    const querySnapshot = await getDocs(query(collection(db, "Teams")));
    querySnapshot.forEach((doc) => {
        teams.push(doc.data() as TeamData);
    });
    return teams;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TeamData[]>
) {
    if (req.method == "GET") {
        try {
            const teamsData: TeamData[]  = await getAllTeamsFromDB(); 
            res.status(200).json(teamsData);
        } catch(error) {
            res.status(400);
        }
    } else {
        res.status(404);
    }
    res.end();
}


