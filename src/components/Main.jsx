import Letter from "./Letter";
import Key from "./Key";
import Life from "./Life";
import { useState, useEffect } from "react";
import data from "../assets/words.json";
import { nanoid } from "nanoid";
import confetti from "canvas-confetti";

export default function Main() {
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [words] = useState(data);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [secretWord] = useState(() => {
    const randomNum = Math.floor(Math.random() * data["5"].length);
    return words["7"]?.[randomNum]?.word.toUpperCase();
  });
  const [lives, setLives] = useState(5);

  function word() {
    return secretWord
      .split("")
      .map((letter) => (
        <Letter
          key={nanoid()}
          value={letter}
          isCorrect={
            selectedLetters.includes(letter) && secretWord.includes(letter)
          }
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
        disabled={gameOver}
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
    }
  }

  useEffect(() => {
    if (win)
      confetti({
        particleCount: 205,
        particleSize: 2.6,
        spread: 181,
        startVelocity: 32,
        origin: { x: 0.5, y: 0.6 },
      });
  }, [win]);

  return (
    <main>
      <div className="word">{word()}</div>
      <div className="keyboard">{keyBoard()}</div>
      <div className="lives">{remainLives()}</div>
      <section className="score">
        {win && <h2>Udało się!</h2>}
        {gameOver && (
          <>
            {" "}
            <h3>
              Niestety nie udało się hasło to:{" "}
              <span className="secret-word">{secretWord}</span>
            </h3>
          </>
        )}
      </section>
    </main>
  );
}
