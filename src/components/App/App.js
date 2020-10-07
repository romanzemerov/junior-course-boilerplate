import React, { Component } from 'react';
import Goods from '../Goods';
import Header from '../Header';
import GoodsListContainer from 'components/GoodsList/GoodsListContainer';
import FiltersContainer from 'components/Filters/FiltersContainer';
import { getActiveCategories } from 'helpers';
import { connect } from 'react-redux';
import { setCategories } from 'redux/actions';
import styles from './App.module.sass';

class App extends Component {
  constructor(props) {
    super(props);
    const location = window.location;
    const url = location.toString();
    const activeCategories = getActiveCategories(location);
    props.setCategories(activeCategories);
    window.history.replaceState({ url }, '', url);
  }

  handlePopstate = () => {
    this.props.setCategories(getActiveCategories(window.location));
  };

  componentDidMount() {
    window.addEventListener('popstate', this.handlePopstate);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopstate);
  }

  render() {
    return (
      <div className={styles.App}>
        <FiltersContainer />
        <Goods>
          <Header>Список товаров</Header>
          <GoodsListContainer />
        </Goods>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setCategories,
};

export default connect(null, mapDispatchToProps)(App);
