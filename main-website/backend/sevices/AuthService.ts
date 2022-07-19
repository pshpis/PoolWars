import prisma from "../prisma";
import {User} from "@prisma/client";
import {getRandomStringWithSmallLetters} from "../modules/random";
import {UserService} from "./UserService";
import {sign} from "tweetnacl";
import base58 from "bs58";

const crypto = require("crypto");

const authMessageDefaultText : string = "Sign in";

const sha256 = x => crypto.createHash('sha256').update(x, 'utf8').digest('hex');

export class AuthService {
    private static config = {
        authCodeLength: 11,
    }

    private static async createAuthToken(user: User) : Promise<string> {
        const auth_token : string = sha256(user.wallet_address + user.auth_code + Date.now());
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                auth_token: auth_token,
                auth_token_created: new Date(Date.now()),
            }
        });
        return auth_token;
    }

    private static isAuthCodeOld(user: User) : boolean{
        return Date.now() - Date.parse(user.auth_token_created.toDateString()) > 24 * 60 * 60 * 1000;
    }

    public static async generateAuthMessageText(wallet_address: string): Promise<string> {
        const user: User = await UserService.generateUser(wallet_address);
        if (base58.decode(wallet_address))
        return authMessageDefaultText + '\n uniqueCode: ' + user.auth_code;
    }

    public static createAuthInfo(wallet_address: string){
        const auth_code = getRandomStringWithSmallLetters(this.config.authCodeLength);
        const auth_token = sha256(wallet_address + auth_code + Date.now());
        return [auth_code, auth_token];
    }

    public static async generateAuthToken(wallet_address: string, signature: string) {
        const message: Uint8Array = new TextEncoder().encode(await this.generateAuthMessageText(wallet_address));
        const user: User = await UserService.getByWalletAddress(wallet_address);
        if (sign.detached.verify(message, base58.decode(signature), base58.decode(wallet_address))){
            if (this.isAuthCodeOld(user)){
                return await this.createAuthToken(user);
            }
            else {
                return user.auth_token;
            }
        }
        else {
            throw new Error("Invalid signature");
        }
    }
}