import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment';

export const Experience = ({ data = {} }) => {

    const { title, subtitle, start_date, end_date, is_present, has_definite_start_date, description } =  data;

    return (
        <div className="card experience-card">
            <div className="row justify-content-space-between title-date-row">
                <div className="title">
                    {title}
                </div>
                <div className="date">
                    {(() => {
                        let formatted_start_date = moment(start_date).format('MMM, YYYY');
                        let formatted_end_date = moment(end_date).format('MMM, YYYY');
                        if(is_present) {
                            return `${formatted_end_date} - Present`;
                        }    
                        if(has_definite_start_date) {
                            return `${formatted_start_date} - ${formatted_end_date}`;
                        }
                        return formatted_end_date;
                    })()}
                </div>
            </div>
            <div className="subtitle">
                {subtitle}
            </div>
            <div className="card-content description">
                {(description || '').split('\n').map((item, index) => <div key={index}>{item}</div>)}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Experience)
