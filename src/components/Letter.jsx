export default function Letter(props) {
  return (
    <div className={`letter ${props.className || ""}`}>
      {props.isCorrect && props.value}
    </div>
  );
}
