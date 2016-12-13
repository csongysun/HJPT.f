
export class LoginReq {
    public email: string;
    public password: string;
}

export class SignUpReq {
    public nickname: string;
    public password: string;
    public email: string;
    public stuId: string;
    public inviteToken: string;
}
