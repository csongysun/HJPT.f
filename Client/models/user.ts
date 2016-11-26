
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

    roles: Array<UserRole>;

}

export class UserClaim {
    id: number;
    userId: string;
    claimType: string;
    claimValue: string;
}

export class Role {
    id: number;
    name: string;
}

export class UserRole {
    userId: string;
    roleId: number;
}
