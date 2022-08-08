import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { playerPerformance } from '../redux/actions';

import Header from '../components/Header';

class Ranking extends React.Component {
  goHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goHome }
        >
          Go Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  store: PropTypes.shape({
    game: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

const mapStateToProps = (store) => ({ store });

const mapDispatchToProps = (dispatch) => ({
  getplayerPerformance: (performanceData) => dispatch(playerPerformance(performanceData)),
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
