import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, setDoc } from "firebase/firestore";
import { collection, query, getDocs } from "firebase/firestore";
import {db} from '../../firebase.js';
import { ParsedUrlQuery } from 'querystring';
import { TeamData, Teams } from '@/components/APIData';

export async function getAllTeams() {
    let teams: TeamData[] = [];
    const querySnapshot = await getDocs(query(collection(db, "Teams")));
    querySnapshot.forEach((doc) => {
        teams.push(doc.data() as TeamData);
    });
    return {"teams": teams};
}

async function createTeam(team: TeamData) {
    await setDoc(doc(db, "Teams", team.teamID.toString()), team)
}

interface TeamQuery extends ParsedUrlQuery {
    teamID?: string,
    userID?: string
}

interface TeamRequest extends NextApiRequest {
    query: TeamQuery;
}


export default async function handler(
  req: TeamRequest,
  res: NextApiResponse
) {
    if (req.method == "POST") {
        try {
            await createTeam(req.body); 
            res.status(200);
        } catch(error) {
            res.status(400);
        }
    } else if (req.method == "GET") {
        try {
            let data = await getAllTeams();
            res.status(200).json(data);
        } catch(error) {
            res.status(400);
        }
    } else {
        res.status(404);
    }
    res.end();
}

// /teams?teamID:string?userID:string
