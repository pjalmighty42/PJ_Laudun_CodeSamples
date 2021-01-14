import React, {MouseEvent} from 'react';

const App = () => {

  const startQuiz = async () => {

  };

  const checkAnswer = (e: MouseEvent<HTMLButtonElement>) => {

  };

  const nextQuestion = () => {

  }

  return (
    <div className="App">
      <h1>React Quiz</h1>
      <button
        className="start"
        onClick={startQuiz}
      >Start Quiz</button>
      <p className="score">Score:</p>
      
    </div>
  );
}

export default App;
