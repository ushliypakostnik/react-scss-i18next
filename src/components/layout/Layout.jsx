import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { DESIGN } from '../../store/constants';

import Resize from './Resize';
import Header from './Header';
import StorageMessage from './StorageMessage';
import ScrollToTop from '../utils/ScrollToTop';
import Main from '../views/Main/Main';
import Page404 from '../views/Page404';

import '../../scss/components/layout/_layout.scss';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAcceptStorageMessage: null,
    };
  };

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    isAcceptStorageMessage: nextProps.isAcceptStorageMessage,
  });

  componentDidMount() {
    this.goodHeight();
    window.addEventListener('resize', () => {this.goodHeight()});
  };

  componentWillUnmount() {
    window.removeEventListener('resize', () => {this.goodHeight()});
  };

  goodHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  render() {
    const { isAcceptStorageMessage } = this.state;

    return (
      <Fragment>
        <div className="layout" id="layout">
          <Resize />
          {!isAcceptStorageMessage && <StorageMessage />}
          <BrowserRouter>
            <ScrollToTop />
            <Fragment>
              <Header />
              <main role="main">
                <Switch>
                  <Redirect exact from='/' to='/main'/>
                  <Route path={ DESIGN.VIEWS[0].path } component={ Main } />
                  <Route component={ Page404 } />
                </Switch>
               </main>
             </Fragment>
          </BrowserRouter>
        </div>
      </Fragment>
    );
  };
};

const mapStateToProps = (state) => ({
  isAcceptStorageMessage: state.rootReducer.utils.isAcceptStorageMessage,
});

export default connect(mapStateToProps, null)(Layout);
