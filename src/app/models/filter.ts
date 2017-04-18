

export class TopicFilter {
    categoryIds: Array<number>;
    searchKey: string;
}

export class Paging {
    pageIndex: number;
    pageSize: number;
    count: number;
}


export class TopicListQuery {
    pageIndex: number;
    pageTake: number;
    categoryId: string;
}
