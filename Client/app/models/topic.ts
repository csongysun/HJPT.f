
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
}

export class Category {
    id: number;
    icon: string;
    name: string;
}

export class Tag {
    id: number;
    name: string;
}
