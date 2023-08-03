import "./Input.styles.css";
import { InputProps } from "./Input.models";

export function Input(props: InputProps): JSX.Element {
  return (
    <label className="input-wrapper">
      {props.label ? (
        <span className="input-wrapper__label">{props.label}</span>
      ) : (
        <></>
      )}
      <input className="input-wrapper__input" {...props} />
    </label>
  );
}
