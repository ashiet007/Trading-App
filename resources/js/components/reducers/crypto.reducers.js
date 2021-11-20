import { cryptoConstants } from "../actions/constant";

const initialState = {
    cryptocurrencies: {},
    isCryptoFetching: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case cryptoConstants.GET_CRYPTO_REQUEST:
            state = {
                ...state,
                isCryptoFetching: true,
            };
            break;
        case cryptoConstants.GET_CRYPTO_SUCCESS:
            const data = action.payload.cryptocurrencies;
            let cryptocurrencies = {};
            data.forEach((item) => {
                cryptocurrencies[item.type] = {
                    type: item.type,
                    name: item.name,
                    precision: item.precision,
                    logo: item.logo,
                    quote_precisions: item.quote_precisions,
                };
            });
            state = {
                ...state,
                cryptocurrencies: cryptocurrencies,
                isCryptoFetching: false,
            };
            break;
        case cryptoConstants.GET_STOCKS_ERROR:
            state = {
                ...state,
                isCryptoFetching: false,
            };
            break;
    }
    return state;
};
