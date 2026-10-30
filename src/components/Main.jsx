import Letter from "./Letter";
import Key from "./Key";
import Life from "./Life";
import { useState } from "react";
import data from "../assets/words.json";
import { nanoid } from "nanoid";

export default function Main() {
  const win = false;
  const [words] = useState(data);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [secretWord] = useState(() => {
    const randomNum = Math.floor(Math.random() * data["5"].length);
    return words["5"]?.[randomNum]?.word.toUpperCase();
  });

  function word() {
    return secretWord
      .split("")
      .map((letter) => <Letter key={nanoid()} value={letter} />);
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
      />
    ));
  }

  function pressedLetter(letter) {
    setSelectedLetters((prev) =>
      prev.includes(letter) ? prev : [...prev, letter],
    );
  }

  return (
    <main>
      <div className="word">{word()}</div>
      <div className="keyboard">{keyBoard()}</div>
      <div className="lives">
        <Life />
        <Life />
        <Life />
        <Life />
        <Life />
      </div>
      <section className="score">{win && <h2>Udało się!</h2>}</section>
    </main>
  );
}
