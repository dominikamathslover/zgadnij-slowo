import Letter from "./Letter";
import Key from "./Key";
import Life from "./Life";
import { useState, useEffect } from "react";
import data from "../assets/words.json";
import confetti from "canvas-confetti";

export default function Main() {
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [words] = useState(data);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [secretWord, setSecredWord] = useState(() => {
    const randomNum = Math.floor(Math.random() * data["10"].length);
    return words["10"]?.[randomNum]?.word.toUpperCase();
  });
  const [lives, setLives] = useState(15);
  const [iloscZgadnietych, setIloscZgadnietych] = useState(0);
  const [dlugoscHasla, setDlugoscHasla] = useState(10);

  const lastGuessedLetter = selectedLetters[selectedLetters.length - 1];

  function nextSecretWord() {
    const length = dlugoscHasla - 1;
    setDlugoscHasla(length);
    if (length > 4) {
      const randomNum = Math.floor(Math.random() * words[length].length);
      setSecredWord(words[length][randomNum].word.toUpperCase());
    } else {
      setWin(true);
    }
  }

  function word() {
    const longSecretWord = secretWord.length > 7;

    return secretWord
      .split("")
      .map((letter, index) => (
        <Letter
          key={`${letter}-${index}`}
          value={letter}
          isCorrect={
            selectedLetters.includes(letter) && secretWord.includes(letter)
          }
          className={longSecretWord ? "longSecretWord" : ""}
        />
      ));
  }

  function remainLives() {
    return [...Array(lives)].map((life, index) => <Life key={index} />);
  }

  function keyBoard() {
    const letters = [
      "A",
      "Ą",
      "B",
      "C",
      "Ć",
      "D",
      "E",
      "Ę",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "Ł",
      "M",
      "N",
      "Ń",
      "O",
      "Ó",
      "P",
      "R",
      "S",
      "Ś",
      "T",
      "U",
      "W",
      "Y",
      "Z",
      "Ź",
      "Ż",
    ];
    return letters.map((letter) => (
      <Key
        key={letter}
        letter={letter}
        onClick={pressedLetter}
        isPressed={
          selectedLetters.includes(letter) && !secretWord.includes(letter)
        }
        isCorrect={
          selectedLetters.includes(letter) && secretWord.includes(letter)
        }
        disabled={gameOver || iloscZgadnietych === 5}
        aria-disabled={selectedLetters.includes(letter)}
        aria-label={`Litera ${letter}`}
      />
    ));
  }

  function pressedLetter(letter) {
    if (selectedLetters.includes(letter) || gameOver || win) return;

    const updatedLetters = [...selectedLetters, letter];

    setSelectedLetters((prev) => [...prev, letter]);

    if (!secretWord.includes(letter)) {
      setLives((prev) => {
        if (prev === 1) {
          setGameOver(true);
        }

        return Math.max(0, prev - 1);
      });
    }

    winTheGame(updatedLetters);
  }

  function winTheGame(updatedLetters) {
    if (
      secretWord.split("").every((letter) => updatedLetters.includes(letter))
    ) {
      setWin(true);
      setIloscZgadnietych((prev) => prev + 1);
    }
  }

  useEffect(() => {
    if (win) {
      confetti({
        particleCount: 205,
        particleSize: 2.6,
        spread: 181,
        startVelocity: 32,
        origin: { x: 0.5, y: 0.6 },
      });
    }
  }, [win]);

  function nastepneHaslo() {
    setGameOver(false);
    setWin(false);
    setSelectedLetters([]);
    nextSecretWord();
  }

  function nowaGra() {
    setGameOver(false);
    setWin(false);
    setLives(15);
    setDlugoscHasla(7);
    setSelectedLetters([]);
    setIloscZgadnietych(0);
    const randomNum = Math.floor(Math.random() * data["7"].length);
    setSecredWord(words["7"]?.[randomNum]?.word.toUpperCase());
  }

  return (
    <main>
      <div className="word">{word()}</div>
      <div className="sr-only" role="status" aria-live="polite">
        {lastGuessedLetter && (
          <>
            <p>
              {secretWord.includes(lastGuessedLetter)
                ? `Dobrze! Litera ${lastGuessedLetter} znajduje się w haśle.`
                : `Niestety, litery ${lastGuessedLetter} nie ma w haśle.`}
            </p>
            <p>Pozostało Ci {lives} niestraconych szans.</p>
          </>
        )}
        <p>
          Aktualne słowo:{" "}
          {secretWord
            .split("")
            .map((letter) =>
              selectedLetters.includes(letter) ? letter : "puste pole",
            )
            .join(", ")}
        </p>
      </div>

      <div className="keyboard" role="group" aria-label="Klawiatura z literami">
        {keyBoard()}
      </div>
      <div className="lives">{remainLives()}</div>
      <section aria-labelledby="game-result" role="status" className="score">
        {win && (
          <>
            <h2 id="game-result">Udało się!</h2>
            {iloscZgadnietych !== 5 && (
              <>
                <h3>Ilość zgadniętych haseł: {iloscZgadnietych}</h3>
                <button className="btn-next" onClick={nastepneHaslo}>
                  Spróbuj odgadnąć kolejne hasło
                </button>
              </>
            )}
            {iloscZgadnietych === 5 && (
              <>
                <h3>Wygrałeś rozgrywkę</h3>
                <button className="btn-next" onClick={nowaGra}>
                  Zacznij nową grę
                </button>
              </>
            )}
          </>
        )}
        {gameOver && iloscZgadnietych !== 5 && (
          <>
            {" "}
            <h3>
              Niestety nie udało się hasło to:{" "}
              <span className="secret-word">{secretWord}</span>
            </h3>
            <h3>Ilość zgadniętych haseł: {iloscZgadnietych}</h3>
            <button className="btn-next" onClick={nowaGra}>
              Zacznij nową grę
            </button>
          </>
        )}
      </section>
    </main>
  );
}
