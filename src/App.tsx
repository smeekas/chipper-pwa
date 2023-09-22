import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Feed from "./components/Feed/Feed";
import Home from "./components/Home/Home";
export let installPromopt: Event | null = null;
function App() {
  return (
    <div className="appContainer">
      <NavBar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/feed" element={<Feed />} />

        <Route path="/help" />
      </Routes>

      {/* <img
        width={200}
        src="https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
      /> */}
    </div>
  );
}
window.addEventListener("beforeinstallprompt", (e) => {
  console.log("prevent install prompt");
  e.preventDefault();
  console.log(e);
  installPromopt = e;
});
export default App;
