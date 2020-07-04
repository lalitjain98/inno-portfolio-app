import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Section from './Section';

export const SectionsList = ({ data = {} }) => {

    const { sections = [] } =  data;

    useEffect(() => {
        console.log("Sections List Props:", data)
    }, [])

    return (
        <div className="sections-list">
            {sections.map((item) => <Section data={item} key={item.id} />)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    data: state.portfolioData.portfolioData,
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionsList)
