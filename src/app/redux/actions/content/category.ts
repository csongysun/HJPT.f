import { Action } from '@ngrx/store';
import { Category } from '@app/models';
import { type } from '@app/utils';

export const ActionTypes = {
    FULFIL: type('[Cate] Fulfil'),
};

export class FulfilAction implements Action {
    type = ActionTypes.FULFIL;
    constructor(public payload: Array<Category>) { }
}


export type Actions
    = FulfilAction;

