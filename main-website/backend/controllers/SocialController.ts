import {NextApiRequest, NextApiResponse} from "next";
import {SocialService} from "../sevices/SocialService";

type controllerMethod = (req: NextApiRequest, res:NextApiResponse) => void;

export default class SocialController {
    public static async updateDiscordAuthToken(req: NextApiRequest, res: NextApiResponse) : Promise<void>{
        let {query: {auth_token, discord_auth_token}, method} = req;
        if (method !== 'POST') return res.status(404).json({});

        if (typeof auth_token !== 'string') auth_token = auth_token[0];
        if (typeof discord_auth_token !== 'string') discord_auth_token = discord_auth_token[0];

        await SocialService.updateDiscordAuthToken(auth_token, discord_auth_token);
        return res.status(200).json(discord_auth_token);
    }

    public static async catchError(func: controllerMethod, req: NextApiRequest, res: NextApiResponse) : Promise<void>{
        try {
            await func(req, res);
            return;
        }
        catch (err){
            return res.status(500).json({error: err.message})
        }
    }
}