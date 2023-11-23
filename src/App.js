import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {

  const [chosenLevel, setChosenLevel] = useState(null);
  const [words, setWords] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);

  const getRandomWords = async () => {
    const options = {
      method: 'GET',
      url: 'http://localhost:8000/results',
      params: {
        level: chosenLevel,
        area: 'sat'
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setWords(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if(chosenLevel) getRandomWords();
  }, [chosenLevel]);

  const checkAnswer = (opt, optIndex, correctAnswer) => {
    console.log(optIndex, correctAnswer);
    if (optIndex === correctAnswer) {
      setCorrectAnswers([...correctAnswers, opt]);
      setScore((score) => score + 1);
    } else {
      setScore((score) => score - 1);
    }
    setClicked([...clicked, opt]);
  }

  return (
    <div className="app">
      {!chosenLevel && <div className="level-selector">
        <h1>Word Association App</h1>
        <p>Select your level to start</p>
        <select
          name="levels"
          id="levels"
          value={chosenLevel}
          onChange={(e) => setChosenLevel(e.target.value)}
        >
          <option value={null}>Select a level</option>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
          <option value="4">Level 4</option>
          <option value="5">Level 5</option>
          <option value="6">Level 6</option>
          <option value="7">Level 7</option>
          <option value="8">Level 8</option>
          <option value="9">Level 9</option>
          <option value="10">Level 10</option>
        </select>
      </div>}

      {chosenLevel && words && <div className="question-area">
        <h1>Welcome to level: {chosenLevel}</h1>
        <h3>Your score is {score}</h3>
        <div className="questions">
          {words.quizlist.map((question, _questionIndex) => (
            <div key={_questionIndex} className="question-box">
              {question.quiz.map((tip, _index) => (
                <p key={_index}>{tip}</p>
              ))}
              <div className="question-buttons">
                {question.option.map((opt, optIndex) => (
                  <div key={optIndex} className="question-button">
                    <button
                      disabled={clicked.includes(opt)}
                      onClick={() => checkAnswer(opt, optIndex + 1, question.correct)}
                    >
                      {opt}
                    </button>
                    {correctAnswers.includes(opt) && <p>Correct!</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => setChosenLevel(null)}>Go Back</button>
      </div>}
    </div>
  );
};
export default App;
