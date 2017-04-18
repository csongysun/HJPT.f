import { Topic } from './topic';

export class TopicListRes {
    nextCursor: string;
    list: TopicListItemRes[]
}

export class TopicListItemRes{
    id: number;
    title: string;
    subtitle: string;
    IMDbUrl: string;
    promotionId: number;
    owner: string;
    categoryId: number;
    addDate: Date;
    tags: string;
    cover: string;

    size: number;
    seeder: number;
    leecher: number;
    completedCount:number;
    infoHash: string;
}

export class TopicRes{
    id: string;
    title: string;
    subtitle: string;
    IMDbUrl: string;
    promotionId: number;
    owner: string;
    categoryId: number;
    addDate: Date;
    tags: string;
    cover: string;

    description: string;
    screenShot: string;
    files: string;
    lastAction: string;

    size: number;
    seeder: number;
    leecher: number;
    completedCount:number;
}
