import { CallGPT } from "./api/gpt";

function App() {
  const handleClickAPICall = async () => {
    await CallGPT();
  };

  return (
    <>
      <button onClick={handleClickAPICall}>gpt api call</button>
    </>
  );
}

export default App;
