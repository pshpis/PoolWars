import {NextApiRequest, NextApiResponse} from "next";
import AuthController from "../../../backend/controllers/AuthController";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    return await AuthController.catchError(AuthController.getMessage, req, res);
}