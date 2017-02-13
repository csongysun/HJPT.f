import { Action } from '@ngrx/store';
import { Role } from 'app-models';
import { type } from 'app-utils';

export const ActionTypes = {
    FULFIL: type('[Role] Fulfil'),
};

export class FulfilAction implements Action {
    type = ActionTypes.FULFIL;
    constructor(public payload: Array<Role>) { }
}


export type Actions
    = FulfilAction;
