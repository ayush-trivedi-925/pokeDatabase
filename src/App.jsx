import Header from "./components/Header";
import SideNav from "./components/SideNav";
import PokeCard from "./components/PokeCard";
import { useState } from "react";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0);
  const [showSideMenu, setShowSideMenu] = useState(true);
  const handleToggleMenu = () => {
    setShowSideMenu(!showSideMenu);
  };
  return (
    <>
      <Header handleToggleMenu={handleToggleMenu} />
      <SideNav
        handleToggleMenu={handleToggleMenu}
        showSideMenu={showSideMenu}
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
      />
      <PokeCard selectedPokemon={selectedPokemon} />
    </>
  );
}

export default App;
