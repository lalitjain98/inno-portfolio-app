import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Section from './Section';

export const SkillsList = ({ data = {} }) => {

    const { skills = [] } =  data || {};

    useEffect(() => {
        console.log("Skills List Props:", data)
    }, [data]);

    return (
        <div className="card card-shadow section-card">
            <div className="card-title">
                {'Skills'}
            </div>
            <hr/>
            <div className="card-content description">
                <div className="skills-list">
                    {skills.map((item) => <div className="skill" key={item.id} >{item.title}</div>)}
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

export default connect(mapStateToProps, mapDispatchToProps)(SkillsList)
