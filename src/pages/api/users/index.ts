import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ParsedUrlQuery } from 'querystring';
import {db} from '../../../firebase.js';
import { UserData } from '@/components/APIData';

async function createUser(user: UserData) {
    await setDoc(doc(db, "UserAuth", user.userID.toString()), user)
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
    if(req.method == "POST" || req.method == "PATCH") {
        try {
            await createUser(req.body); 
            res.status(200);
        } catch(error) {
            res.status(400);
        }
    } else {
        res.status(404);
    }
    res.end();
}

