import { User } from './user';

export class Topic {
    id: string;
    title: string;
    subtitle: string;
    IMDbUrl: string;
    promotion: Promotion;
    torrent: Torrent;
    owner: User;
    category: Category;
    addDate: Date;
    editDate: Date;
    tags: Array<Tag>;
}

export class TempTopic {
    title: string;
    subTitle: string;
    categoryId: number;
    description: string;
    torrent: string;
    NFO: string;
    cover: string;
    screenShot: string;
    anonymous: boolean;
    IMDbUrl: string;
}

export class Torrent {
    id: number;
    leecher: number;
    seeder: number;
    saver: number;
}

export class Promotion {
    id: number;
    name: string;
    downFold: number;
    upFold: number;

    hover: boolean;
}

export class Category {
    id: number;
    orderId: number;
    icon: string;

    name: string;
    hover: boolean;
}

export class Tag {
    id: number;
    name: string;
}
