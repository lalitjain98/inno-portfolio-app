import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import feedbacks, { getFeedbacks, createFeedback, } from '../store/feedbacks';
import { Feedback } from './Feedback';
import AddFeedbackModal from './AddFeedbackModal';

export const FeedbacksContainer = (props) => {

    const [openAddFeedbackModal, setOpenAddFeedbackModal] = useState(false);

    useEffect(() => {
        props.getFeedbacks();
    }, []); 

    return (
        <div className="feedbacks-wrapper">
            <div className="row justify-content-end add-feedback-button-wrapper">
                <button className="add-feedback-button" onClick={() => setOpenAddFeedbackModal(true)}>
                    Add a Comment
                </button>
                <AddFeedbackModal open={openAddFeedbackModal} setOpen={setOpenAddFeedbackModal} />
            </div>
            <div className="feedback-list-wrapper">
                <div className="feedback-list">
                    {
                        (props.feedbacks||[]).map((item, index, arr) => <Feedback key={item.id} data={item} isLast={index+1 === arr.length}/>)
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    ...state.feedbacks,
})

const mapDispatchToProps = dispatch => ({
    getFeedbacks: () => dispatch(getFeedbacks()),
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedbacksContainer)
