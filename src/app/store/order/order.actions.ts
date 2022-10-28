
import { createAction, props } from '@ngrx/store';
import { Order } from 'src/app/shared/models/order.model';

export const addItem = createAction('[Order] Add item', props<{order: Order}>());
export const removeItem = createAction('[Order] Remove item', props<{order: any}>());
export const removeAllItems = createAction('[Order] Remove all items');