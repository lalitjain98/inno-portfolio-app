import React, { Component } from 'react'
import { connect } from 'react-redux'

export const Feedback = (props) => {

    const { data = {} } = props;
    const { name, email, title, content } = data;


    return (
        <>
            <div className={`feedback-item-wrapper ${!props.isLast && 'bottom-border'}`}>
                <div className="feedback-title">{title}</div>
                <div className="row">
                    <div className="name">
                        {`- ${name || 'Anonymous'}`}
                    </div>
                    
                    <div className="email">
                        {`| ${email || 'anonymous'}`}
                    </div>
                </div>
                <div className="feedback-content">{content}</div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    ...state,
})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Feedback)
