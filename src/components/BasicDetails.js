import React, { Component } from 'react'
import { connect } from 'react-redux'

export const BasicDetails = (props) => {

    const { user = {}, location, designation, github_url, linkedin_url, mobile_number } = props.data || {}
    const { first_name, last_name, email, } = user;

    return (
        <div className="card card-shadow">
            <div className="card-content">
                <div className="row basic-details-wrapper">
                    <div className="col col-8 justify-content-center name-designation-wrapper">
                        <div className="user-name">
                            {`${first_name} ${last_name}`}
                        </div>
                        <div className="designation">
                            {designation}
                        </div>
                    </div>
                    <div className="col col-4 contact-details-wrapper justify-content-center">
                        <div className="row justify-content-space-between email-wrapper">
                            <div className="item-label">Email: </div>
                            <div className="item-value">{email}</div>
                        </div>
                        <div className="row justify-content-space-between mobile-number-wrapper">
                            <div className="item-label">Mobile Number: </div>
                            <div className="item-value">{mobile_number}</div>
                        </div>
                        <div className="row justify-content-space-between location-wrapper">
                            <div className="item-label">Location: </div>
                            <div className="item-value">{location}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    data: state.portfolioData.portfolioData,
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicDetails)
