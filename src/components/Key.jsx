export default function Key(props) {
  return (
    <button
      className="key-btn"
      onClick={() => props.onClick(props.letter)}
      style={{
        backgroundColor: props.isCorrect
          ? "green"
          : props.isPressed && "rgb(201, 178, 178)",
      }}
    >
      {props.letter}
    </button>
  );
}
