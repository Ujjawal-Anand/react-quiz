import React, { Component } from 'react';
import quizQuestions from './api/quizQuestions';
import logo from './logo.svg';
import './App.css';
import Quiz from './components/Quiz';
import Result from './components/Result'



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {},
      score: 0,
      result: false
    }
  }

  /*
    This lifecycle invoked immediately after a 
    component is mounted
  */
  componentDidMount() {
    const shuffleAnswerOptions = 
        quizQuestions.map((question) => this.shuffleArray(question.options));

    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffleAnswerOptions[0]
    });
  }

  /*
    Will shuffle elements of an array
  */
  shuffleArray = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // while there remain elements to shuffle...
    while(0 !== currentIndex) {
      randomIndex = Math.floor(Math.random()*currentIndex);
      currentIndex -= 1;

      // And swap it with the current element
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue
    } 
    return array;
  }

  handleAnswerSelected = (event) => {
    this.setUserAnser(event.currentTarget.value);
    if(this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      this.setState({
        result: true
      });
    }
  }

  setUserAnser = (userAnswer) => {
    const score = (userAnswer === quizQuestions[this.state.counter].rightAnswer) ? 1 : -1

    this.setState((state) => ({
      answersCount: {
        ...state.answersCount,
        [this.state.counter]: userAnswer
      },
      answer: userAnswer,
      score: state.score + score
    }));
  }

  setNextQuestion = () => {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].options,
      answer: ''
    })
  }

  renderQuiz = () => {
    return (
      <Quiz
          answer={this.state.answer}
          counter={this.state.counter}
          answerOptions={this.state.answerOptions}
          questionId={this.state.questionId}
          question={this.state.question}
          questionTotal={quizQuestions.length}
          onAnswerSelected={this.handleAnswerSelected}
        />
    );
  }

  renderResult = () => {
    return (
      <Result score={this.state.score} />
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Quiz</h2>
        </header>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default App;
