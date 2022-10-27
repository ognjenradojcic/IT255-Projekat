
import { createAction, props } from '@ngrx/store';
import { CartItem } from 'src/app/shared/models/cart-item.model';

export const addItem = createAction('[Cart] Add item', props<{cartItem: CartItem}>());
export const removeItem = createAction('[Cart] Remove item', props<{cartItem: any}>());
export const removeAllItems = createAction('[Cart] Remove all items');