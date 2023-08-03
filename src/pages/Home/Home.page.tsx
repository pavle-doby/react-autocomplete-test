import "./Home.page.css";
import { useState } from "react";
import { Autocomplete } from "../../shared/components/moleculs/Autocomplete/Autocomplete.component";
import { Countries } from "../../services/Countries.service";
import { Country } from "../../shared/models/Country.model";
import { debounce } from "../../utils/debounce.util";

export function Home() {
  /**
   * ************************************
   *
   * Component State
   *
   * ************************************
   */

  const [options, setOptions] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * ************************************
   *
   * Handling Component State and Events
   *
   * ************************************
   */

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

  /**
   * ************************************
   *
   * Helper/Other Functions
   *
   * ************************************
   */

  function getOptionLabel(option: Country): string {
    return option.name.common;
  }

  return (
    <div className="home">
      <h1>Home</h1>
      <Autocomplete
        inputProps={{
          label: "Country",
          placeholder: "Eg. Serbia",
        }}
        options={options}
        isLoading={isLoading}
        onChange={debounceHandleOnChange}
        getOptionLabel={getOptionLabel}
      />
    </div>
  );
}
