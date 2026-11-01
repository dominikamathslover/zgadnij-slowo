export default function Key(props) {
  return (
    <button
      className="key-btn"
      onClick={() => props.onClick(props.letter)}
      style={{
        backgroundColor: props.isCorrect
          ? "#e1306b8f"
          : props.isPressed && "rgb(201, 178, 178)",
      }}
      disabled={props.disabled}
    >
      {props.letter}
    </button>
  );
}
