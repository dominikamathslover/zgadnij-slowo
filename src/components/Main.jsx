import Letter from "./Letter";
import Key from "./Key";
import Life from "./Life";

export default function Main() {
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
    return letters.map((letter) => <Key key={letter} letter={letter} />);
  }

  return (
    <main>
      <div className="word">
        <Letter />
        <Letter />
        <Letter />
        <Letter />
        <Letter />
      </div>
      <div className="keyboard">{keyBoard()}</div>
      <div className="lives">
        <Life />
        <Life />
        <Life />
        <Life />
        <Life />
      </div>
      <section className="score"></section>
    </main>
  );
}
