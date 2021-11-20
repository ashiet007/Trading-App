import { dealConstants } from "../actions/constant";

const initialState = {
    deals: [],
    loading: false,
    form_loading: false,
    close_loading: false,
    errors: null,
    message: "",
};

export default (state = initialState, action) => {
    switch (action.type) {
        case dealConstants.GET_ALL_DEAL_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case dealConstants.GET_ALL_DEAL_SUCCESS:
            state = {
                ...state,
                deals: action.payload.deals,
                loading: false,
                errors: null,
                message: "",
            };
            break;
        case dealConstants.GET_ALL_DEAL_ERROR:
            state = {
                ...initialState,
                loading: false,
                errors: action.payload.errors,
                message: action.payload.message,
            };
            break;
        case dealConstants.OPEN_DEAL_REQUEST:
            state = {
                ...state,
                form_loading: true,
            };
            break;
        case dealConstants.OPEN_DEAL_SUCCESS:
            state = {
                ...state,
                deals: action.payload.deals,
                form_loading: false,
                errors: null,
                message: "",
            };
            break;
        case dealConstants.OPEN_DEAL_ERROR:
            state = {
                ...state,
                form_loading: false,
                errors: action.payload.errors,
                message: action.payload.message,
            };
            break;
        case dealConstants.CLOSE_DEAL_REQUEST:
            state = {
                ...state,
                close_loading: true,
            };
            break;
        case dealConstants.CLOSE_DEAL_SUCCESS:
            state = {
                ...state,
                deals: action.payload.deals,
                close_loading: false,
                errors: null,
                message: "",
            };
            break;
        case dealConstants.CLOSE_DEAL_ERROR:
            state = {
                ...state,
                close_loading: false,
                errors: action.payload.errors,
                message: action.payload.message,
            };
            break;
    }
    return state;
};
