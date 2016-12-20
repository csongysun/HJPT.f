
import { Action } from '@ngrx/store';
import { type } from 'app-utils';
import { Observable } from 'rxjs/Observable';

import { Promotion } from 'app-models';

export const ActionTypes = {
    FULFIL: type('[Prom] Fulfil'),
    ADD: type('[Prom] Add'),
    UPDATE: type('[Prom] Update'),
    DROP: type('[Prom] DROP')
};

export class FulfilAction implements Action {
    type = ActionTypes.FULFIL;
    constructor(public payload: Array<Promotion>) { }
}
export class AddAction implements Action {
    type = ActionTypes.ADD;
    constructor(public payload: Promotion) { }
}
export class UpdateAction implements Action {
    type = ActionTypes.UPDATE;
    constructor(public payload: { oldId: number, promotion: Promotion }) { }
}
export class DropAction implements Action {
    type = ActionTypes.DROP;
    constructor(public payload: number) { }
}

export type Actions
    = FulfilAction
    | AddAction
    | UpdateAction
    | DropAction

