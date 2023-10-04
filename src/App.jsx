import Layout from "./components/Layout";
import Wrapper from "./components/Wrapper";
import { Routes, Route } from "react-router-dom";
import SettingsMenu from "./features/settings/SettingsMenu"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Wrapper />} />
        <Route path="settings">
          <Route index element={<SettingsMenu />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;