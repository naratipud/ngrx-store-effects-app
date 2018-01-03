import { Action } from '@ngrx/store';

import { Topping } from '../../models/topping.model';

export const LOAD_TOPPINS = '[Products] Load Toppings';
export const LOAD_TOPPINS_FAIL = '[Products] Load Toppings Fail';
export const LOAD_TOPPINS_SUCCESS = '[Products] Load Toppings Success';

export class LoadToppings implements Action {
  readonly type = LOAD_TOPPINS;
}

export class LoadToppingsFails implements Action {
  readonly type = LOAD_TOPPINS_FAIL;
  constructor(public payload: any) {}
}

export class LoadToppingsSuccess implements Action {
  readonly type = LOAD_TOPPINS_SUCCESS;
  constructor(public payload: Topping[]) {}
}

export type ToppingsAction =
  | LoadToppings
  | LoadToppingsFails
  | LoadToppingsSuccess;
