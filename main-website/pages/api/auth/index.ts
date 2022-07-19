import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const {
        query: { id, name },
        method,
    } = req
    return res.status(200).json({method: method, id: id, name: name});
}