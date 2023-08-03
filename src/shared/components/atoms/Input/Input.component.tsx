import "./Input.component.css";
import { InputParams } from "./Input.models";

export function Input(params: InputParams): JSX.Element {
  return (
    <label className="input-wrapper">
      {params.label ? (
        <span className="input-wrapper__label">{params.label}</span>
      ) : (
        <></>
      )}
      <input className="input-wrapper__input" {...params} />
    </label>
  );
}
