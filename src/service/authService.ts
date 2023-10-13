import { DocumentType } from "@typegoose/typegoose";
import { User, privateFields } from "../model/userModel";
import { signJwt } from "../utils/jwt";
import SessionModel from "../model/sessionModel";
import { omit } from "lodash";

export async function createSession({ userId }: { userId: string }) {
    return SessionModel.create({ user: userId })
}

export async function signRefreshToken({ userId }: { userId: string }) {
    const session = await createSession({
        userId,
    })

    const refreshToken = signJwt(
        {session: session.id},
        {
            expiresIn: '5h',
        }
    )

    return refreshToken
}

export function signAccessToken(user: DocumentType<User>) {

    const payload = omit(user.toJSON(), privateFields)

    const accessToken = signJwt(payload, {
        expiresIn: '15m'
    })

    return accessToken
}

export function signExpiredAccessToken(user: DocumentType<User>) {

    const payload = omit(user.toJSON(), privateFields)

    const accessToken = signJwt(payload, {
        expiresIn: '1s'
    })

    return accessToken
}

export async function findSessionById(id: string) {
    return SessionModel.findById(id)
}

