import { MdSnackBarConfig } from '@angular/material';

import { Category } from './topic';
import { TopicFilter } from './filter';

export class Metadata {
    categories: Array<Category>;
    pages: Map<string, Page>;
}

export class Page {
    title: string;
    link: string;
    icon: string;
}

export class Toast {
    constructor(public massage: string, public config: MdSnackBarConfig) { }
}

export class Setting {
    filter: TopicFilter;
}

