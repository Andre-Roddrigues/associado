import * as jose from "jose";
import { cookies } from "next/headers";

export async function openSessionToken(token: string){
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);    
    const { payload } = await jose.jwtVerify(token, secret);
    
    return payload  
}

export async function createSessionToken(payload = {}){
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const session = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }).setProtectedHeader({
        alg: "HS256",
    })
    .setExpirationTime("45d")
    .sign(secret);

    const { exp  } = await openSessionToken(session);
    
    cookies().set('session', session, {
        expires: (exp as number) * 1000,
        path: '/',
        httpOnly: false,
    });

}

export async function isValidSession(){
    const sessionToken = cookies().get('session');

    if(sessionToken){
        const { value } = sessionToken;
        const { exp } = await openSessionToken(value); 
        const currentDate = new Date().getTime();
       
        return ((exp as number) * 1000) > currentDate
    }
    
    return false
}

export function destroySession(){
    cookies().delete("session")
}

const AuthServices = {
    createSessionToken,
    openSessionToken,
    isValidSession
}
export default AuthServices