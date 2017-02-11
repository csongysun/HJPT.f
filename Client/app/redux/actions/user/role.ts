
import { Action } from '@ngrx/store';
import { type } from 'app-utils';

import { Role } from 'app-models';

export const ActionTypes = {
    FULFIL: type('[Role] Fulfil'),
    ADD: type('[Role] Add'),
    UPDATE: type('[Role] Update'),
    DROP: type('[Role] DROP')
};

export class FulfilAction implements Action {
    type = ActionTypes.FULFIL;
    constructor(public payload: Array<Role>) { }
}
export class AddAction implements Action {
    type = ActionTypes.ADD;
    constructor(public payload: Role) { }
}
export class UpdateAction implements Action {
    type = ActionTypes.UPDATE;
    constructor(public payload: Role) { }
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

