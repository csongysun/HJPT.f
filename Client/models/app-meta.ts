
import { Category } from './topic';

export class Metadata{
    categories: Array<Category>;
    pages: Map<string, Page>;
}

export class Page {
    title: string;
    link: string;
    icon: string;
}