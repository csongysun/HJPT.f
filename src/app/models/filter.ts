

export class TopicFilter implements CateFilter, Paging {
    pageIndex: number;
    pageTake: number;
    categoryIds: Array<number>;
    toQuery() {
        return {
            pageIndex: this.pageIndex,
            pageTake: this.pageTake,
            categoryIds: this.categoryIds.join(',')
        }
    }
}
export interface CateFilter {
    categoryIds: Array<number>;
}
export interface Paging {
    pageIndex: number;
    pageTake: number;
}

export class TopicFilterQuery {
    pageIndex: number;
    pageTake: number;
    categoryId: string;
}
