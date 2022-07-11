import prisma from "../prisma"
import { PrismaClient, Prisma } from "@prisma/client";
import {User} from "@prisma/client"
import {getRandomStringWithSmallLetters} from "../modules/random";

function getRandomCode(){

}
export class UserService {
    private static config = {
        authCodeLength: 11,
    }

    public static async createEmptyAccount(wallet_address: string) : Promise<User> {
        return await prisma.user.create({
            data: {
                wallet_address: wallet_address,
                auth_code: getRandomStringWithSmallLetters(this.config.authCodeLength),
            }
        });
    }

    public static async getByWalletAddress(wallet_address: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: {
                wallet_address: wallet_address
            }
        })
    }

    public static async haveAccount(wallet_address: string): Promise<Boolean> {
        return await this.getByWalletAddress(wallet_address) !== null;
    }

    public static addTwitter(user : User, twitter_nickname: string){}

}