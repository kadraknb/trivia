import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Header from '../components/Header';
import FeedbackMessage from '../components/FeedbackMessage';

class Feedback extends React.Component {
  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { store: { player: { assertions, score } } } = this.props;
    return (
      <>
        <Header />
        <p data-testid="feedback-total-score">Score: {score}</p>
        <p data-testid="feedback-total-question">Acertos: {assertions}</p>
        <FeedbackMessage />
        <button
          type="button"
          onClick={ this.playAgain }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
        <button
          type="button"
          onClick={ this.goToRanking }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  store: PropTypes.shape({
    player: PropTypes.shape({
      score: PropTypes.number,
      assertions: PropTypes.number,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (store) => ({ store });

export default withRouter(connect(mapStateToProps)(Feedback));
