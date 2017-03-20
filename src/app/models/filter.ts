

export class TopicFilter {
    categoryIds: Array<number>;
}

export class Paging {
    pageIndex: number;
    pageTake: number;
    pageCount: number;
}


export class TopicListQuery {
    pageIndex: number;
    pageTake: number;
    categoryId: string;
}
