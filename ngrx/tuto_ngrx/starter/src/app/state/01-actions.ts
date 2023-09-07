import { createAction, props } from "@ngrx/store";

export const initAction = createAction('init app');
export const changeUsername = createAction('change username', props<{username: string}>());