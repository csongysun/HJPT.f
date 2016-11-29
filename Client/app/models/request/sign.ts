
export class LoginReq {
    public Email: string;
    public Password: string;
}

export class SignUpReq {
    public UserName: string;
    public Password: string;
    public Email: string;
    public StuID: string;
    public InviteToken: string;
}
