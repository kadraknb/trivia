import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      perguntaN: 0,
    };
  }

  resposta = () => {
    const { perguntaN } = this.state;
    this.setState({ perguntaN: perguntaN + 1 });
  }

  answer = () => {
    const { store: { game } } = this.props;
    const { perguntaN } = this.state;

    const N_MAX = game[perguntaN].incorrect_answers.length + 1;
    const N_RANDOM = Math.floor(Math.random() * N_MAX);

    const answerTrue = (
      <li data-testid="correct-answer" key="true">
        <button type="button" onClick={ this.resposta }>
          {game[perguntaN].correct_answer}
        </button>
      </li>);
    const answerFalse = (game[perguntaN].incorrect_answers.map((aa, ii) => (
      <li data-testid={ `wrong-answer-${ii}` } key={ ii }>
        <button type="button" onClick={ this.resposta }>
          {aa}
        </button>
      </li>
    )));
    answerFalse.splice(N_RANDOM, 0, answerTrue);
    return answerFalse;
  }

  render() {
    const { store: { game } } = this.props;
    const { perguntaN } = this.state;
    return (
      <div>
        <Header />
        <h1>Trivia</h1>
        <h2 data-testid="question-category">{game[perguntaN].category}</h2>
        <h4 data-testid="question-text">{game[perguntaN].question}</h4>
        <ol data-testid="answer-options">
          { this.answer() }
        </ol>
      </div>
    );
  }
}

Game.propTypes = {
  store: PropTypes.shape({
    game: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

const mapStateToProps = (store) => ({ store });

export default connect(mapStateToProps)(Game);
