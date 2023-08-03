import "./Autocomplete.styles.css";
import { useState } from "react";
import { Input } from "../../atoms/Input/Input.component";
import { AutocompleteProps } from "./Autocomplete.models";
import { Loading } from "../../atoms/Loading/Loading.component";

export function Autocomplete<OptionType>(
  props: AutocompleteProps<OptionType>
): JSX.Element {
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<OptionType | null>(null);
  const [selectedStringValue, setSelectedStringValue] = useState<string>("");

  function handleOnSelect(option: OptionType) {
    setSelected(option);
    setSelectedStringValue(props.getOptionLabel(option));
    setQuery("");
    props.onSelect(option);
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setQuery(query);
    setSelected(null);
    setSelectedStringValue("");
    props.onChange(event);
  }

  return (
    <div className="autocomplete">
      <Input
        {...props.inputProps}
        value={selectedStringValue || query}
        onChange={handleOnChange}
      />
      {!props.options?.length && query && props.isLoading && (
        <ul className="autocomplete__options">
          <li className="autocomplete__options-item">
            <Loading />
          </li>
        </ul>
      )}
      {props.options?.length && !selectedStringValue ? (
        <ul className="autocomplete__options">
          {props.isLoading && (
            <li className="autocomplete__options-item">
              <Loading />
            </li>
          )}
          {props.options.map((option, i) => (
            <li onClick={() => handleOnSelect(option)} key={i}>
              {props.getOptionLabel(option)}
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}
