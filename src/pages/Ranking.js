import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { playerPerformance } from '../redux/actions';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      rankings: [],
    };
  }

  componentDidMount() {
    this.setState({ rankings: JSON.parse(localStorage.getItem('ranking')) });
  }

  goHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  sortRankings = () => {
    const { rankings } = this.state;
    rankings.sort((a, b) => b[2] - a[2]);
    console.log(rankings);
    return rankings.map((rank, ii) => (
      <li key={ ii }>
        <img src={ rank[0] } alt="foto do usuario" />
        <h4 data-testid={ `player-name-${ii}` }>{rank[1]}</h4>
        <h3 data-testid={ `player-score-${ii}` }>{rank[2]}</h3>
      </li>
    ));
  }

  render() {
    const { rankings } = this.state;
    console.log(rankings);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          { this.sortRankings() }
        </ol>
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
