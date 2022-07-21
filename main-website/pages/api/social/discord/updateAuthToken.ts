import {NextApiRequest, NextApiResponse} from "next";
import SocialController from "../../../../backend/controllers/SocialController";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    return await SocialController.catchError(SocialController.updateDiscordAuthToken, req, res);
}