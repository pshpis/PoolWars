import prisma from "../prisma";
import {User} from "@prisma/client";
import {getRandomStringWithSmallLetters} from "../modules/random";
import {UserService} from "./userService";
import {sign} from "tweetnacl";
import base58 from "bs58";

const crypto = require("crypto");

const authMessageDefaultText : string = "Sign in";

const sha256 = x => crypto.createHash('sha256').update(x, 'utf8').digest('hex');

export class AuthService {
    private static config = {
        authCodeLength: 11,
    }

    public static async generateAuthMessageText(wallet_address: string): Promise<string> {
        const user: User = await UserService.generateUser(wallet_address);
        return authMessageDefaultText + '\n uniqueCode: ' + user.auth_code;
    }

    public static createAuthInfo(wallet_address: string){
        const auth_code = getRandomStringWithSmallLetters(this.config.authCodeLength);
        const auth_token = sha256(wallet_address + auth_code);
        return [auth_code, auth_token];
    }

    public static async generateAuthToken(wallet_address: string, signature: Uint8Array) {
        const message: Uint8Array = new TextEncoder().encode(await this.generateAuthMessageText(wallet_address));
        const user: User = await UserService.getByWalletAddress(wallet_address);
        if (sign.detached.verify(message, signature, base58.decode(wallet_address))){
            const auth_token = sha256(wallet_address + user.auth_code);
            await prisma.user.update({
                where: {
                   wallet_address: wallet_address,
                },
                data: {
                   auth_token: auth_token,
                }
            });
            return auth_token;
        }
    }
}