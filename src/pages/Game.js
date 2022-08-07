import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { playerPerformance } from '../redux/actions';

import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      perguntaN: 0,
      assertions: 0,
      score: 0,
      isActive: false,
      turnFinished: false,
    };
  }

  nextQuestion = () => {
    this.setState({ turnFinished: false });
    const { perguntaN } = this.state;
    this.setState({ perguntaN: perguntaN + 1, isActive: true });
  }

  handleAnswer = (event) => {
    const { assertions, score, isActive } = this.state;
    const unitScore = 40;
    const getId = event.target.id;
    this.setState({ turnFinished: true });
    if (getId === 'correct') {
      this.setState({
        assertions: assertions + 1, score: score + unitScore });
    }
    if (isActive === false) this.setState({ isActive: true });
  }

  answer = () => {
    const { store: { game } } = this.props;
    const { perguntaN, turnFinished } = this.state;

    const N_MAX = game[perguntaN].incorrect_answers.length + 1;
    const N_RANDOM = Math.floor(Math.random() * N_MAX);

    const answerTrue = (
      <button
        data-testid="correct-answer"
        key="true"
        type="button"
        id={ turnFinished ? 'correctAnswer' : '' }
        onClick={ this.handleAnswer }
      >
        {game[perguntaN].correct_answer}
      </button>);
    const answerFalse = (game[perguntaN].incorrect_answers.map((aa, ii) => (
      <button
        data-testid={ `wrong-answer-${ii}` } 
        className={ turnFinished ? 'incorrectAnswer' : '' } 
        key={ ii }
        type="button"
        onClick={ this.handleAnswer }
      >
        {aa}
      </button>
    )));
    answerFalse.splice(N_RANDOM, 0, answerTrue);
    return answerFalse;
  }

  render() {
    const { store: { game } } = this.props;
    const { perguntaN, isActive } = this.state;
    const nextButton = (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.nextQuestion }
      >
        Next
      </button>
    );
    return (
      <div>
        <Header />
        <h1>Trivia</h1>
        <h2 data-testid="question-category">{game[perguntaN].category}</h2>
        <h4 data-testid="question-text">{game[perguntaN].question}</h4>
        <ol data-testid="answer-options">
          { this.answer() }
        </ol>
        { isActive ? nextButton : '' }
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

const mapDispatchToProps = (dispatch) => ({
  getplayerPerformance: (performanceData) => dispatch(playerPerformance(performanceData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
