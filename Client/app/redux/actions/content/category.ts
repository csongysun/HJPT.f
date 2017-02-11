
import { Action } from '@ngrx/store';
import { type } from 'app-utils';

import { Category } from 'app-models';

export const ActionTypes = {
    FULFIL: type('[Cate] Fulfil'),
    ADD: type('[Cate] Add'),
    UPDATE: type('[Cate] Update'),
    DROP: type('[Cate] DROP')
};

export class FulfilAction implements Action {
    type = ActionTypes.FULFIL;
    constructor(public payload: Array<Category>) { }
}
export class AddAction implements Action {
    type = ActionTypes.ADD;
    constructor(public payload: Category) { }
}
export class UpdateAction implements Action {
    type = ActionTypes.UPDATE;
    constructor(public payload: Category) { }
}
export class DropAction implements Action {
    type = ActionTypes.DROP;
    constructor(public payload: number) { }
}

export type Actions
    = FulfilAction
    | AddAction
    | UpdateAction
    | DropAction;

