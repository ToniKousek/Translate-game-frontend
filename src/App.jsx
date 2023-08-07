import { useEffect, useState } from "react";

import "./App.css";
import GameForm from "./GameForm";
import Header from "./Header";
import PopUp from "./PopUp";

import translations from "./translations.json";

function App() {
  const supportedLanguages = translations.languages;
  const sentences = translations.sentences;

  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [popUpData, setPopUpData] = useState({
    wasSuccess: false,
    correctLanguage: "",
    openPopUp: false,
    // the other data that needs to be displayed
    otherData: "",
  });

  // on reload
  useEffect(() => {
    const localHighScore = window.localStorage.getItem("HIGHSCORE");
    console.log(localHighScore);
    if (localHighScore !== null) {
      setHighScore(JSON.parse(localHighScore));
      console.log("setting", localHighScore);
      console.log("to", highScore);
    }
  }, []);

  function successOrFail(value, correctLanguage) {
    switch (value) {
      // success
      case 0:
        setScore((score) => score + 1);
        setPopUpData({
          openPopUp: true,
          // because the values of {supportedLanguages} are not the code type, but {correctLanguage} is
          correctLanguage: Object.keys(supportedLanguages).find(
            (key) => supportedLanguages[key] === correctLanguage
          ),
          wasSuccess: true,
        });
        break;

      // fail
      case 1:
        let otherData;

        let newHighScore = highScore;
        const newLives = lives - 1;
        setLives(newLives);
        if (newLives === 0) {
          // reset

          if (score > highScore) {
            newHighScore = score;
            setHighScore(newHighScore);
            console.log("new high score", newHighScore);
            localStorage.setItem("HIGHSCORE", JSON.stringify(newHighScore));
          }
          setLives(3);
          setScore(0);
          otherData = `<p>New game!</p>Your score was ${score}!<br />High Score is ${newHighScore}!`;
          // alert(
          //   `New game!\nYour score was ${score}!\nHigh Score is ${newHighScore}`
          // );
        }

        setPopUpData({
          openPopUp: true,
          // because the values of {supportedLanguages} are not the code type, but {correctLanguage} is
          correctLanguage: Object.keys(supportedLanguages).find(
            (key) => supportedLanguages[key] === correctLanguage
          ),
          wasSuccess: false,
          otherData: otherData,
        });
        break;
    }
  }

  return (
    <>
      <Header lives={lives} score={score} />
      <PopUp popUpData={popUpData} setPopUpData={setPopUpData} />
      <GameForm
        sentences={sentences}
        languages={supportedLanguages}
        successOrFail={successOrFail}
      />
    </>
  );
}

export default App;
