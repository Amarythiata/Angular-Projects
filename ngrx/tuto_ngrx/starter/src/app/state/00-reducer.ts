import { initAction, changeUsername } from './01-actions';
import { ActionReducer, createReducer, MetaReducer, on } from "@ngrx/store";
import { User } from '../models/user';


export interface State {
    root: {
        appName: string;
        user: User;
    }
};

const initialState = {
    appName: 'Ngrx',
    user: {
        username: '',
        isAdmin: false
    }
};

function log(reducer: ActionReducer<State>): ActionReducer<State> {
    return (state, action) => {
        const currentState= reducer(state, action);

        console.log("Etat precedent", state);
        console.log("Action", action);
        console.log("Etat suivant", currentState);

        return currentState;

    }
}

export const metaReducers: MetaReducer[]= [log];

export const rootReducer = createReducer(initialState,

    on(initAction, (state) => {

        return {
            ...state,
            user: {
                ...state.user,
                isAdmin: true
            }
        }
    }),
    on(changeUsername, (state, props) => {

        return {
            ...state,
            user: {
                ...state.user,
                username: props.username
            }
        }
    })
);