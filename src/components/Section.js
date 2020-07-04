import React, { Component } from 'react'
import { connect } from 'react-redux'

import Experience from './Experience';

export const Section = ({ data = {} }) => {

    const { title, experiences = [] } =  data;

    return (
        <div className="card card-shadow section-card">
            <div className="card-title">
                {title}
            </div>
            <hr/>
            <div className="card-content description">
                {experiences.map((item) => <Experience data={item} key={item.id} />)}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Section)
