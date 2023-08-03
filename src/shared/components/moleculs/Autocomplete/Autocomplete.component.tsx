import "./Autocomplete.styles.css";
import { useEffect, useState } from "react";
import { Input } from "../../atoms/Input/Input.component";
import { AutocompleteProps } from "./Autocomplete.models";
import { Loading } from "../../atoms/Loading/Loading.component";
import { highlightText } from "../../../../utils/highlightText.util";

/**
 * TODO: What needs to be done so this component is god tier and production ready?
 *
 * 1. Add error handling and error states
 * 2. Add tests
 * 3. Improve customization of the component (eg. custom Rendering for `options`) // if needed based on the requirements
 * 4. Handle more on keyboard events like arrow up, arrow down, etc.
 * 5. Investing more time into optimization
 * 6. Write better documentation
 * 7. Potentially add it to storybook
 *
 */
export function Autocomplete<OptionType>(
  props: AutocompleteProps<OptionType>
): JSX.Element {
  /**
   * ************************************
   *
   * Component State
   *
   * ************************************
   */

  const [query, setQuery] = useState<string>("");
  const [selectedStringValue, setSelectedStringValue] = useState<string>("");

  /**
   * ************************************
   *
   * Handling Component State and Events
   *
   * ************************************
   */

  useEffect(() => {
    if (props.inputProps?.value) {
      setQuery(props.inputProps.value);
    }
  }, [props.inputProps?.value]);

  function handleOnSelect(option: OptionType) {
    setSelectedStringValue(props.getOptionLabel(option));
    setQuery("");
    props.onSelect?.(option);
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setQuery(query);
    setSelectedStringValue("");
    props.onChange(event);
  }

  function handleOnKeyDown(
    event: React.KeyboardEvent<HTMLLIElement>,
    option: OptionType
  ) {
    if (event.key === "Enter") {
      handleOnSelect(option);
    }
  }

  /**
   * ************************************
   *
   * Helper/Other Functions
   *
   * ************************************
   */

  function getHighlightText(option: OptionType, query: string) {
    const label = props.getOptionLabel(option);
    const newText = highlightText(label, query);
    return newText;
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
