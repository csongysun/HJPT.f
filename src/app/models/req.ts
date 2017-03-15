import { Annex } from './Annex';
import { Topic } from './topic';

export class LoginReq {
    public email: string;
    public password: string;
}

export class SignUpReq {
    public nickname: string;
    public password: string;
    public email: string;
}

export class TopicsRep {
    meta: number;
    data: Array<Topic>;
}

export class TopicPublishReq {
    anonymous: boolean;
    iMDbUrl: string;
    title: string;
    subTitle: string;
    categoryId: number;
    description: string;
    torrent: string;
    nfo: string;
    cover: string;
    screenShot: string;
    lastUpdate: Date;
}

