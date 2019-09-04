import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ComponentContainer } from './components/ComponentContainer';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <BrowserRouter>
          <Route exact path='/' component={ComponentContainer} />
        </BrowserRouter>
      </Layout>
    );
  }
}
