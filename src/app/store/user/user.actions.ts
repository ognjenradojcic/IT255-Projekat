import { createAction, props } from "@ngrx/store";
import { UserData } from "./user.reducer";

export const userLogin = createAction('[User] Login', props<{user: UserData}>());
export const userLogout = createAction('[User] Logout');
