import "./Autocomplete.styles.css";
import { useEffect, useState } from "react";
import { Input } from "../../atoms/Input/Input.component";
import { AutocompleteProps } from "./Autocomplete.models";
import { Loading } from "../../atoms/Loading/Loading.component";
import { highlightText } from "../../../../utils/highlightText.util";

export function Autocomplete<OptionType>(
  props: AutocompleteProps<OptionType>
): JSX.Element {
  const [query, setQuery] = useState<string>("");
  const [selectedStringValue, setSelectedStringValue] = useState<string>("");

  useEffect(() => {
    if (props.inputProps?.value) {
      setQuery(props.inputProps.value);
    }
  }, [props.inputProps?.value]);

  function handleOnSelect(option: OptionType) {
    setSelectedStringValue(props.getOptionLabel(option));
    setQuery("");
    props.onSelect(option);
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setQuery(query);
    setSelectedStringValue("");
    props.onChange(event);
  }

  function getHighlightText(option: OptionType, query: string) {
    const label = props.getOptionLabel(option);
    const newText = highlightText(label, query);
    return newText;
  }

  function handleOnKeyDown(
    event: React.KeyboardEvent<HTMLLIElement>,
    option: OptionType
  ) {
    if (event.key === "Enter") {
      handleOnSelect(option);
    }
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
            <li
              key={i}
              className="autocomplete__options-item"
              tabIndex={0}
              onKeyDown={(event) => handleOnKeyDown(event, option)}
              onClick={() => handleOnSelect(option)}
              dangerouslySetInnerHTML={{
                __html: getHighlightText(option, query),
              }}
            ></li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}
