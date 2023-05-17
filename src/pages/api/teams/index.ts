import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, setDoc } from "firebase/firestore";
import { collection, query, getDocs } from "firebase/firestore";
import {db} from '../../firebase.js';
import { ParsedUrlQuery } from 'querystring';
import { TeamData, Teams } from '@/pages/components/ApiData.js';

async function getAllTeams() {
    let teams: TeamData[] = [];
    const querySnapshot = await getDocs(query(collection(db, "Teams")));
    querySnapshot.forEach((doc) => {
        teams.push(doc.data() as TeamData);
    });
    return {"teams": teams};
}

async function getTeamByTeamID(teamID: string) {
    let teams: TeamData[] = (await getAllTeams()).teams;
    for (let team of teams) {
        if (team.teamID == teamID) {
            return team;
        }
    }
    return {};
}


async function getTeamByUserID(userID: string) {
    let teams: TeamData[] = (await getAllTeams()).teams;
    for (let team of teams) {
        if (userID in team.players) {
            return team;
        }
    }
    return {};
}

async function createTeam(team: TeamData) {
    await setDoc(doc(db, "Teams", team.teamID.toString()), team)
}

async function processTeamGetRequest(req: TeamRequest) {
    if (typeof req.query.teamID !== "undefined") {
        return await getTeamByTeamID(req!.query!.teamID!);
    } else if (typeof req.query.userID !== "undefined") {
        return await getTeamByUserID(req!.query!.userID!);
    } else {
        return await getAllTeams();
    }
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
            let data = await processTeamGetRequest(req);
            console.log(data)
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
