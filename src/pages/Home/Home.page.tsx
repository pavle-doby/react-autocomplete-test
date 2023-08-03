import { useState } from "react";
import { Autocomplete } from "../../shared/components/moleculs/Autocomplete/Autocomplete.component";
import "./Home.page.css";
import { Countries } from "../../services/Countiries.service";
import { Country } from "../../shared/models/Country.model";
import { debounce } from "../../utils/debounce.util";

export function Home() {
  const [options, setOptions] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    if (!query) {
      setOptions([]);
      return;
    }

    setIsLoading(true);
    const newNameList = await Countries.getNameList({ name: query });
    setIsLoading(false);

    setOptions(newNameList);
  }

  const debounceHandleOnChange = debounce(handleOnChange, 300);

  function handleOnSelect(option: Country) {
    console.log({ option });
  }

  function getOptionLabel(option: Country): string {
    return option.name.common;
  }

  return (
    <div>
      <h1>Home</h1>
      <Autocomplete
        options={options}
        isLoading={isLoading}
        onChange={debounceHandleOnChange}
        getOptionLabel={getOptionLabel}
        onSelect={handleOnSelect}
      />
    </div>
  );
}
