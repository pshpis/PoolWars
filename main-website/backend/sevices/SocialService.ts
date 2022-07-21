import {User} from "@prisma/client";
import {UserService} from "./UserService";
import prisma from "../prisma";

export class SocialService {
    public static async updateDiscordAuthToken(auth_token: string, discord_auth_token : string) : Promise<User> {
        let user = await UserService.getByAuthToken(auth_token);
        if (user === null) throw new Error("Wrong auth token");
        await prisma.user.update({
            where: {
                auth_token: user.auth_token,
            },
            data: {
                discord_auth_token: discord_auth_token,
            }
        });
        return user;
    }
}