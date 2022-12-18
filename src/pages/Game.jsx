import React from 'react'
import Countdown from 'react-countdown'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { playerPerformance } from '../redux/actions'

import Header from '../components/Header'

const minTimer = 5

class Game extends React.Component {
  constructor () {
    super()
    this.state = {
      perguntaN: 0,
      assertions: 0,
      score: 0,
      isActive: false,
      turnFinished: false
    }
  }

  componentDidMount () {
    const { getplayerPerformance } = this.props
    getplayerPerformance(this.state)
  }

  upToLStorage = () => {
    const { store: { player: { img, name, score } } } = this.props
    const newRanking = [img, name, score]
    const rankings = JSON.parse(localStorage.getItem('ranking'))
    if (rankings === null) {
      localStorage.setItem('ranking', JSON.stringify([newRanking]))
    } else {
      rankings.push(newRanking)
      localStorage.setItem('ranking', JSON.stringify(rankings))
    }
  }

  nextQuestion = () => {
    const { perguntaN } = this.state
    const { router } = this.props
    const maxPalyed = 4
    if (perguntaN === maxPalyed) {
      this.upToLStorage()
      router('Feedback')
    }
    this.setState({ turnFinished: false })
    this.setState({ perguntaN: perguntaN + 1, isActive: false })
  }

  timeEnded = () => {
    const { isActive } = this.state
    this.setState({ turnFinished: true, isActive: !isActive })
  }

  getDifficulty = () => {
    const { store: { game } } = this.props
    const { perguntaN } = this.state
    const Difficulty = { easy: 1, medium: 2, hard: 3 }
    return Difficulty[game[perguntaN].difficulty]
  }

  handleAnswer = (event) => {
    const { assertions, score, isActive } = this.state
    const { getplayerPerformance } = this.props
    const getName = event.target.name
    const pointBase = 10
    this.setState({ turnFinished: true })
    if (getName === 'correctAnswer') {
      const TimeRemaining = document.getElementById('timer').innerHTML
      const unitScore = pointBase + (TimeRemaining * this.getDifficulty())
      this.setState({ assertions: assertions + 1, score: score + unitScore },
        () => getplayerPerformance(this.state))
    }
    if (isActive === false) this.setState({ isActive: true })
  }

  answer = () => {
    const { store: { game } } = this.props
    const { perguntaN, turnFinished } = this.state

    const N_MAX = game[perguntaN].incorrect_answers.length + 1
    const N_RANDOM = Math.floor(Math.random() * N_MAX)

    const answerTrue = (
      <button
        className="btn btn-light mx-1"
        key="true"
        type="button"
        name="correctAnswer"
        id={ turnFinished ? 'correctAnswer' : '' }
        onClick={ this.handleAnswer }
        disabled={ turnFinished }
      >
        {game[perguntaN].correct_answer}
      </button>)
    const answerFalse = (game[perguntaN].incorrect_answers.map((aa, ii) => (
      <button
        className="btn btn-light mx-1"
        id={ turnFinished ? 'incorrectAnswer' : '' }
        key={ ii }
        type="button"
        onClick={ this.handleAnswer }
        disabled={ turnFinished }
      >
        {aa}
      </button>
    )))
    answerFalse.splice(N_RANDOM, 0, answerTrue)
    return answerFalse
  }

  handleTimer = ({ seconds }) => (
    <span
      id="timer"
      className={ seconds <= minTimer ? 'text-danger' : '' }
    >
      {seconds}
    </span>
  )

  render () {
    const { store: { game } } = this.props
    const { perguntaN, isActive, turnFinished } = this.state
    const setTime = 30000
    const nextButton = (
      <button
        type="button"
        className="btn btn-light"
        onClick={ this.nextQuestion }
      >
        Next
      </button>
    )
    return (
      <div>
        <Header />
        <main className="gameContainer">
          <h1 className="title-trivia title-trivia-animated">Trivia</h1>
          { turnFinished
            ? <p className="fs-4 d-inline"> Tempo restante: 0 segundos  </p>
            : (
              <p className="fs-4 d-inline">
                Tempo restante:
                {' '}
                <Countdown
                  date={ Date.now() + setTime }
                  renderer={ this.handleTimer }
                  onComplete={ this.timeEnded }
                />
                {' '}
                segundos
              </p>
              )}
          <p
            className="questionCategory mt-5 mb-4 fs-2"
          >
            {game[perguntaN].category}
          </p>
          <p
            className="fs-2 mb-5"
          >
            {game[perguntaN].question.replace(/(&quot;)/g, '"').replace(/(&#039;)/g, '"')}
          </p>
          <ol className="p-0">
            {this.answer()}
          </ol>
          {isActive && nextButton}
        </main>
      </div>
    )
  }
}

Game.propTypes = {
  router: PropTypes.func.isRequired,
  store: PropTypes.shape({
    game: PropTypes.arrayOf(PropTypes.shape()),
    player: PropTypes.shape({
      img: PropTypes.string,
      name: PropTypes.string,
      score: PropTypes.number
    })
  }).isRequired,
  getplayerPerformance: PropTypes.func.isRequired
}

const mapStateToProps = (store) => ({ store })

const mapDispatchToProps = (dispatch) => ({
  getplayerPerformance: (performanceData) => dispatch(playerPerformance(performanceData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
