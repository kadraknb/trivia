import React from 'react';
import Countdown from 'react-countdown';

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

  componentDidMount() {
    const { getplayerPerformance } = this.props;
    getplayerPerformance(this.state);
  }

  upToLStorage = () => {
    const { store: { player: { img, name, score } } } = this.props;
    const newRanking = [img, name, score];
    const rankings = JSON.parse(localStorage.getItem('ranking'));
    if (rankings === null) {
      localStorage.setItem('ranking', JSON.stringify([newRanking]));
    } else {
      rankings.push(newRanking);
      localStorage.setItem('ranking', JSON.stringify(rankings));
    }
  };

  nextQuestion = () => {
    const { perguntaN } = this.state;
    const { history } = this.props;
    const maxPalyed = 4;
    if (perguntaN === maxPalyed) {
      this.upToLStorage();
      history.push('/feedback');
    }
    this.setState({ turnFinished: false });
    this.setState({ perguntaN: perguntaN + 1, isActive: true });
  }

  timeEnded = () => {
    const { isActive } = this.state;
    this.setState({ turnFinished: true });
    if (isActive === false) this.setState({ isActive: true });
  }

  getDifficulty = () => {
    const { store: { game } } = this.props;
    const { perguntaN } = this.state;
    const hardLevel = 3;
    const getDifficulty = game[perguntaN].difficulty;
    switch (getDifficulty) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return hardLevel;
    default:
      break;
    }
  }

  handleAnswer = (event) => {
    const { assertions, score, isActive } = this.state;
    const { getplayerPerformance } = this.props;
    const getName = event.target.name;
    const pointBase = 10;
    this.setState({ turnFinished: true });
    if (getName === 'correctAnswer') {
      const TimeRemaining = document.getElementById('timer').innerHTML;
      const unitScore = pointBase + (TimeRemaining * this.getDifficulty());
      this.setState({
        assertions: assertions + 1, score: score + unitScore },
      () => getplayerPerformance(this.state));
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
        name="correctAnswer"
        id={ turnFinished && 'correctAnswer' }
        onClick={ this.handleAnswer }
        disabled={ turnFinished }
      >
        {game[perguntaN].correct_answer}
      </button>);
    const answerFalse = (game[perguntaN].incorrect_answers.map((aa, ii) => (
      <button
        data-testid={ `wrong-answer-${ii}` }
        className={ turnFinished && 'incorrectAnswer' }
        key={ ii }
        type="button"
        onClick={ this.handleAnswer }
        disabled={ turnFinished }
      >
        {aa}
      </button>
    )));
    answerFalse.splice(N_RANDOM, 0, answerTrue);
    return answerFalse;
  }

  handleTimer = ({ seconds }) => (
    <span data-testid="countdown" id="timer">
      {seconds}
    </span>
  );

  render() {
    const { store: { game } } = this.props;
    const { perguntaN, isActive, turnFinished } = this.state;
    const setTime = 30000;
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
        { turnFinished
          ? <span> Tempo restante: 0 segundos  </span>
          : (
            <Countdown
              date={ Date.now() + setTime }
              renderer={ this.handleTimer }
              onComplete={ this.timeEnded }
            >
              <span>
                Tempo restante: 0 segundos
              </span>
            </Countdown>
          )}
        <h2 data-testid="question-category">{game[perguntaN].category}</h2>
        <h4 data-testid="question-text">{game[perguntaN].question}</h4>
        <ol data-testid="answer-options">
          {this.answer()}
        </ol>
        {isActive && nextButton}
      </div>
    );
  }
}

Game.propTypes = {
  store: PropTypes.shape({
    game: PropTypes.arrayOf(PropTypes.shape()),
    player: PropTypes.shape({
      img: PropTypes.string,
      name: PropTypes.string,
      score: PropTypes.number,
    }),
  }).isRequired,
  getplayerPerformance: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (store) => ({ store });

const mapDispatchToProps = (dispatch) => ({
  getplayerPerformance: (performanceData) => dispatch(playerPerformance(performanceData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
