import api from '../api';

export const GET_FEEDBACKS = 'GET_FEEDBACKS';
export const GET_FEEDBACKS_SUCCESS = 'GET_FEEDBACKS_SUCCESS';
export const GET_FEEDBACKS_ERROR = 'GET_FEEDBACKS_ERROR';

export const CREATE_FEEDBACK = 'CREATE_FEEDBACK';
export const CREATE_FEEDBACK_SUCCESS = 'CREATE_FEEDBACK_SUCCESS';
export const CREATE_FEEDBACK_ERROR = 'CREATE_FEEDBACK_ERROR';

const initialState = { }

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case GET_FEEDBACKS:
        return {
            ...state, 
            getFeedbacksLoading: true,
            feedbacks: null,
            getFeedbacksError: null,
        }
        case GET_FEEDBACKS_SUCCESS:
            return {
                ...state, 
                getFeedbacksLoading: false,
                feedbacks: payload,
                getFeedbacksError: null,
            }
        case GET_FEEDBACKS_ERROR:
            return {
                ...state, 
                getFeedbacksLoading: false,
                feedbacks: null,
                getFeedbacksError: payload,
            }
        case CREATE_FEEDBACK:
            return {
                ...state, 
                createFeedbackLoading: true,
                createFeedbackError: null,
            }
        case CREATE_FEEDBACK_SUCCESS:
            return {
                ...state, 
                createFeedbackLoading: false,
                feedbacks: [payload, ...(state.feedbacks || [])],
                createFeedbackError: null,
            }
        case CREATE_FEEDBACK_ERROR:
            return {
                ...state, 
                createFeedbackLoading: false,
                createFeedbackError: payload,
            }
            

        default:
            return state
    }
}

export const getFeedbacks = () => async dispatch => {
    try {

        dispatch({ 
            type: GET_FEEDBACKS, 
        });

        const res = await api('feedbacks');
        console.log(res);

        dispatch({ 
            type: GET_FEEDBACKS_SUCCESS,
            payload: res,
        });

    } catch(e) {
        dispatch({ 
            type: GET_FEEDBACKS_ERROR, 
            payload: e.message 
        })
        console.log("Error:", e);
    }
}

export const createFeedback = (data) => async dispatch => {
    try {

        dispatch({ 
            type: CREATE_FEEDBACK, 
        });

        const res = await api('feedbacks/', 'POST', data);
        console.log(res);

        dispatch({ 
            type: CREATE_FEEDBACK_SUCCESS,
            payload: res,
        });

    } catch(e) {
        dispatch({ 
            type: CREATE_FEEDBACK_ERROR, 
            payload: e.message 
        })
        console.log("Error:", e);
    }
}