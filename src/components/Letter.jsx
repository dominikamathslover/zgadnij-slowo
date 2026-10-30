export default function Letter(props) {
  return <div className="letter">{props.isCorrect && props.value}</div>;
}
