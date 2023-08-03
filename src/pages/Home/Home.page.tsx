import { Input } from "../../shared/components/atoms/Input/Input.component";
import "./Home.page.css";

export function Home() {
  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
  }
  return (
    <div>
      <h1>Home</h1>
      <Input label="Name" onChange={handleOnChange} />
    </div>
  );
}
