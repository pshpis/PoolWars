import {NextApiRequest, NextApiResponse} from "next";
import {AuthService} from "../sevices/AuthService";
import base58 from "bs58";
import {UserService} from "../sevices/UserService";

type controllerMethod = (req: NextApiRequest, res:NextApiResponse) => void;

export default class AuthController {
    public static async getMessage(req: NextApiRequest, res: NextApiResponse) : Promise<void>{
        let { query: { wallet_address}, method} = req;
        if (method !== 'GET') return res.status(404).json({});

        if (typeof wallet_address !== 'string') wallet_address = wallet_address[0];

        const messageText = await AuthService.generateAuthMessageText(wallet_address);
        return res.status(200).json({text: messageText});
    }

    public static async getToken(req: NextApiRequest, res: NextApiResponse): Promise<void>{
        let {query: {wallet_address, signature}, method} = req;
        if (method !== 'GET') return res.status(404).json({});

        if (typeof wallet_address !== 'string') wallet_address = wallet_address[0];
        if (typeof signature !== "string") signature = signature[0];

        const token = await AuthService.generateAuthToken(wallet_address, signature);
        const time = await AuthService.getAuthTokenTime(wallet_address);
        return res.status(200).json({token: token, time: time});
    }

    public static async getUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        let {query: {auth_token}, method} = req;
        if (method !== 'GET') return res.status(404).json({});

        if (typeof auth_token !== 'string') auth_token = auth_token[0];
        const user = await UserService.getByAuthToken(auth_token);
        if (user !== null){
            return res.status(200).json(user);
        }
        else {
            return res.status(500).json({error: "Invalid auth token"});
        }
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