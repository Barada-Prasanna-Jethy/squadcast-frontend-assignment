import "./App.css";
import MentionComponent from "./components/MentionComponent.jsx";

function App() {
  return (
    <>
      <MentionComponent
        value={"Squadcast"}
        onChange={(txt: string) => console.log(txt)}
      />
    </>
  );
}

export default App;
