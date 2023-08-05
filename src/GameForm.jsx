import { useState } from "react";

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomTranslations(sentences) {
  const sentenceValues = Object.values(sentences);

  const randomtranslations =
    sentenceValues[randomInt(sentenceValues.length)].translations;

  return randomtranslations;
}
function randomLanguage(languages) {
  const languageValues = Object.values(languages);

  return languageValues[randomInt(languageValues.length)];
}

function GameForm({ sentences, languages, successOrFail }) {
  // set languages
  let languageOptionValues = [];
  let languageOptionText = [];

  Object.keys(languages).forEach((key, _) => {
    languageOptionText.push(key);
    languageOptionValues.push(languages[key]);
  });

  const [selectedLanguage, setSelectedLanguage] = useState(
    languageOptionValues[0]
  );
  const [correctLanguage, setCorrectLanguage] = useState(
    randomLanguage(languages)
  );
  const [sentence, setSentence] = useState(
    randomTranslations(sentences)[correctLanguage]
  );

  function newSentence() {
    const newLanguage = randomLanguage(languages);
    setCorrectLanguage(newLanguage);
    console.log(newLanguage);
    setSentence(randomTranslations(sentences)[newLanguage]);
  }

  function checkLanguage() {
    if (selectedLanguage === correctLanguage) {
      successOrFail(0, correctLanguage);
    } else {
      successOrFail(1, correctLanguage);
    }
    newSentence();
  }

  return (
    <>
      <form className="game">
        <p>What is this language:</p>
        <div className="main-sentence">{sentence}</div>

        <select
          value={selectedLanguage}
          className="select-language"
          id="select-language"
          aria-label="Select language"
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {languageOptionValues.map((value, index) => (
            <option key={index} value={value}>
              {languageOptionText[index]}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="submit"
          onClick={() => {
            checkLanguage();
          }}
        >
          Submit
        </button>
      </form>

      {/*
      <div
        style={{ backgroundColor: "red", height: "100px" }}
        onClick={() => {
          console.log(selectedLanguage);
          console.log("correct: ", correctLanguage);
          console.log(sentence);
        }}
      ></div>
      */}
    </>
  );
}
export default GameForm;
