import { Action } from '@ngrx/store';
import { Promotion } from '@app/models';
import { type } from '@app/utils';

export const ActionTypes = {
    FULFIL: type('[Prom] Fulfil'),

};

export class FulfilAction implements Action {
    type = ActionTypes.FULFIL;
    constructor(public payload: Array<Promotion>) { }
}


export type Actions
    = FulfilAction;

