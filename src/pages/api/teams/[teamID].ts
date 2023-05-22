import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, setDoc } from "firebase/firestore";
import { collection, query, getDocs } from "firebase/firestore";
import {db} from '../../firebase.js';
import { ParsedUrlQuery } from 'querystring';
import { TeamData, Teams } from '@/components/APIData.js';
import { getAllTeams } from './index';

async function getTeamByTeamID(teamID: string) {
    let teams: TeamData[] = (await getAllTeams()).teams;
    for (let team of teams) {
        if (team.teamID == teamID) {
            return team;
        }
    }
    return {};
}

async function createTeam(team: TeamData) {
    await setDoc(doc(db, "Teams", team.teamID.toString()), team)
}

interface TeamQuery extends ParsedUrlQuery {
    teamID: string,
}

interface TeamRequest extends NextApiRequest {
    query: TeamQuery;
}


export default async function handler(
  req: TeamRequest,
  res: NextApiResponse
) {
    if (req.method == "GET") {
        try {
            let data = await getTeamByTeamID(req.query.teamID);
            res.status(200).json(data);
        } catch(error) {
            res.status(400);
        }
    } else {
        res.status(404);
    }
    res.end();
}

