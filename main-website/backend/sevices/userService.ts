import prisma from "../prisma"
import { PrismaClient, Prisma } from "@prisma/client";
import {User} from "@prisma/client"
import {getRandomStringWithSmallLetters} from "../modules/random";
import {AuthService} from "./authService";


export class UserService {


    public static async createEmptyUser(wallet_address: string) : Promise<User> {
        const auth_info = AuthService.createAuthInfo(wallet_address);
        return await prisma.user.create({
            data: {
                wallet_address: wallet_address,
                auth_code: auth_info[0],
                auth_token: auth_info[1],
            }
        });
    }
    
    public static async generateUser(wallet_address: string): Promise<User> {
        let user = await this.getByWalletAddress(wallet_address);
        if (user === null) return await this.createEmptyUser(wallet_address);
        return user;
    }

    public static async getByWalletAddress(wallet_address: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: {
                wallet_address: wallet_address
            }
        });
    }

    public static async haveAccount(wallet_address: string): Promise<Boolean> {
        return await this.getByWalletAddress(wallet_address) !== null;
    }

    public static async getByAuthToken(auth_token: string): Promise<User | null>{
        return await prisma.user.findUnique({
            where: {
                auth_token: auth_token,
            }
        });
    }

    public static addTwitter(user : User, twitter_nickname: string){}

}