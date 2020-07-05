import api from '../api';

export const GET_PORTFOLIO_DATA = 'GET_PORTFOLIO_DATA';
export const GET_PORTFOLIO_DATA_SUCCESS = 'GET_PORTFOLIO_DATA_SUCCESS';
export const GET_PORTFOLIO_DATA_ERROR = 'GET_PORTFOLIO_DATA_ERROR';

const initialState = {
    
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case GET_PORTFOLIO_DATA:
        return {
            ...state, 
            getPortfolioDataLoading: true,
            portfolioData: false,
            getPortfolioDataError: null,
        }
        case GET_PORTFOLIO_DATA_SUCCESS:
            return {
                ...state, 
                getPortfolioDataLoading: false,
                portfolioData: payload,
                getPortfolioDataError: null,
            }
        case GET_PORTFOLIO_DATA_ERROR:
            return {
                ...state, 
                getPortfolioDataLoading: false,
                portfolioData: null,
                getPortfolioDataError: payload,
            }
        default:
            return state
    }
}

export const getPortfolioData = () => async dispatch => {
    try {
        dispatch({ 
            type: GET_PORTFOLIO_DATA, 
        });

        const res = await api('portfolio');
        console.log(res);

        dispatch({ 
            type: GET_PORTFOLIO_DATA_SUCCESS,
            payload: res,
        });

    } catch(e) {
        dispatch({ 
            type: GET_PORTFOLIO_DATA_ERROR, 
            payload: e.message 
        })
        console.log("Error:", e);
    }
}