import { InputProps } from "../../atoms/Input/Input.models";

export interface AutocompleteProps<OptionType> {
  options: OptionType[];
  inputProps?: InputProps;
  isLoading?: boolean;
  getOptionLabel: (option: OptionType) => string;
  onSelect: (option: OptionType) => void;
  onChange: (e: any) => void;
}
