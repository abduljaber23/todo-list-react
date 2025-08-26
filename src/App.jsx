import Todo from "./components/Todo.jsx";
import { registerSW } from "virtual:pwa-register";
registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

function App() {
  
  return (
    <>
      <Todo />
    </>
  );
}

export default App;
