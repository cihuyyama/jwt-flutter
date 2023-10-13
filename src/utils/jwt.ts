import jwt from 'jsonwebtoken'

export function signJwt(
    object: Object,
    options?: jwt.SignOptions | undefined,
) {
    const key = process.env.ACCESS_TOKEN_PRIVATE_KEY
    const signingKey = Buffer.from(
        String(key),
        "base64"
    ).toString("ascii")

    return jwt.sign(object, signingKey, {
        ...(options && options),
        algorithm: "RS256",
    });
}

export function verifyJwt<T>(
    token: string,
): T | null {
    const key = process.env.ACCESS_TOKEN_PUBLIC_KEY
    const publicKey = Buffer.from(String(key), 'base64').toString('ascii')

    try {
        const decode = jwt.verify(token, publicKey) as T
        return decode
    } catch (error) {
        return null
    }
}