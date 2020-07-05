import React, { useEffect, } from 'react';
import { connect } from 'react-redux';

import { getPortfolioData } from './store/portfolioData';
import './styles/index.scss';

import BasicDetails from './components/BasicDetails';
import SectionsList from './components/SectionsList';
import SkillsList from './components/SkillsList';

import Loader from './components/Loader';
import FeedbacksContainer from './components/FeedbacksContainer';

function App(props) {

  useEffect(() => {
    props.getPortfolioData();
  }, []);

  
  if(props.getPortfolioDataLoading) return (
    <div className="container">
      <Loader />
    </div>
  )

  if(props.getPortfolioDataError) return (
    <div className="row justify-content-center error">
      { props.getPortfolioDataError }
    </div>
  )

  return (
    <div className="container">
      <header className="header">
        <div className="navbar">
          <div className="navbar-logo">My Portfolio</div>
        </div>
      </header>
      
      <div className="content">
        <BasicDetails />
        <SkillsList />
        <SectionsList />

        <FeedbacksContainer />
      </div>

      <footer className="footer">

      </footer>

    </div>
  );
}

const mapStateToProps = (state) => ({
  ...state,
  getPortfolioDataLoading: state.portfolioData.getPortfolioDataLoading,
  getPortfolioDataError: state.portfolioData.getPortfolioDataError,
})

const mapDispatchToProps = (dispatch) => ({
  getPortfolioData: () => dispatch(getPortfolioData()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
