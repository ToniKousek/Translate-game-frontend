import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

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
  const [popUpData, setPopUpData] = useState({
    wasSuccess: false,
    correctLanguage: "",
    openPopUp: false,
  });

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
        setPopUpData({
          openPopUp: true,
          // because the values of {supportedLanguages} are not the code type, but {correctLanguage} is
          correctLanguage: Object.keys(supportedLanguages).find(
            (key) => supportedLanguages[key] === correctLanguage
          ),
          wasSuccess: false,
        });
        const newLives = lives - 1;
        setLives(newLives);

        if (newLives === 0) {
          // reset
          setLives(3);
          setScore(0);
          alert("New game!");
        }
        break;
    }
  }

  return (
    <>
      <Header lives={lives} score={score} />
      <GameForm
        sentences={sentences}
        languages={supportedLanguages}
        successOrFail={successOrFail}
      />
      <PopUp popUpData={popUpData} setPopUpData={setPopUpData} />
    </>
  );
}

export default App;
