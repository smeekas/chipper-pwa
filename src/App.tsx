import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Feed from "./components/Feed/Feed";
import Home from "./components/Home/Home";
import Post from "./components/Post/Post";
export let installPromopt: Event | null = null;
function App() {
  return (
    <div className="appContainer">
      <NavBar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/feed" element={<Feed />} />

        <Route path="/help" />
        <Route path="/post/:id" element={<Post />} />

        <Route path="*" element={<h1>404</h1>} />
      </Routes>
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
