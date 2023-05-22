import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, getDoc } from "firebase/firestore";
import { ParsedUrlQuery } from 'querystring';
import {db} from '../../firebase.js';
import { UserData } from '@/components/APIData';

async function getUser(userID: string) {
    const docRef = doc(db, "UserAuth", userID);
    const docSnap = await getDoc(docRef);
    const user : UserData | null = docSnap.data() as UserData;

    if (user === null) {
        return {};
    }
    return user;
}

interface UserQuery extends ParsedUrlQuery {
    userID?: string
}

interface UserRequest extends NextApiRequest {
    query: UserQuery;
}


export default async function handler(
  req: UserRequest,
  res: NextApiResponse
) {
    if (req.method == "GET") {
        try {
            if (req.query.userID !== undefined) {
                let data = getUser(req.query.userID);
                res.status(200).json(data);
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

