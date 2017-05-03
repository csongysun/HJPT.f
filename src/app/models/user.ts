
export class User {
    id: string;
    nickname: string;
    email: string;
    stuId: string;
    passKey?: string;
    token: string;
    tokenExpires: Date;
    refreshToken: string;
    refreshTokenExpires: Date;

    role: string[] = [];

    

}

export class UserMeta {
    id: string;
    email: string;
}
