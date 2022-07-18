import {NextApiRequest, NextApiResponse} from "next";
import {AuthService} from "../../../backend/sevices/authService";
import {UserService} from "../../../backend/sevices/userService";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    let {
        query: { wallet_address, id },
        method,
    } = req;
    if (typeof wallet_address !== 'string') wallet_address = wallet_address[0];

    return res.status(200).json({user: JSON.stringify(await UserService.createEmptyUser(wallet_address))});
}