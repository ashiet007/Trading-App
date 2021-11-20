import { authConstant } from "../actions/constant";

const initialState = {
    token: null,
    user: {
        name: "",
        email: "",
    },
    authenticated: false,
    loading: false,
    errors: null,
    message: "",
};
export default (state = initialState, action) => {
    switch (action.type) {
        case authConstant.LOGIN_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case authConstant.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.access_token,
                authenticated: true,
                loading: false,
                errors: null,
                message: "",
            };
            break;
        case authConstant.LOGIN_FAILURE:
            state = {
                ...initialState,
                loading: false,
                errors: action.payload.errors,
                message: action.payload.message,
            };
            break;
        case authConstant.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case authConstant.LOGOUT_SUCCESS:
            state = {
                ...initialState,
            };
            break;
        case authConstant.LOGOUT_FAILURE:
            state = {
                ...state,
                errors: action.payload.errors,
                message: action.payload.message,
            };
            break;
    }
    return state;
};
