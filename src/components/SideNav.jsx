import { useState } from "react";
import { first151Pokemon, getFullPokedexNumber } from "../utils";
import { FaLongArrowAltLeft } from "react-icons/fa";
export default function SideNav({
  selectedPokemon,
  setSelectedPokemon,
  handleToggleMenu,
  showSideMenu,
}) {
  const [searchValue, setSearchValue] = useState("");
  const filteredPokemon = first151Pokemon.filter((ele, eleIdx) => {
    // if eleIdx includes the current search value, return true
    if (ele.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
      return true;
    }
    // if ele name includes the current search vlaue, return true
    if (getFullPokedexNumber(eleIdx).includes(searchValue)) {
      return true;
    }
    // otherwise, exclude value from arry, return false
    return false;
  });
  return (
    <nav className={" " + (!showSideMenu ? "open" : "")}>
      <div className={"header" + (!showSideMenu ? "open" : "")}>
        <button onClick={handleToggleMenu} className="open-nav-button">
          <FaLongArrowAltLeft />
        </button>
        <h1 className="text-gradient">PokeDatabase</h1>
      </div>
      <input
        placeholder="ex: 001 or Balba..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {filteredPokemon.map((pokemon, pokeIndex) => {
        return (
          <button
            onClick={() => setSelectedPokemon(first151Pokemon.indexOf(pokemon))}
            key={pokeIndex}
            className={
              "nav-card" +
              (pokeIndex === selectedPokemon ? "nav-card-selected" : "")
            }
          >
            <p>{getFullPokedexNumber(first151Pokemon.indexOf(pokemon))}</p>
            <p>{pokemon}</p>
          </button>
        );
      })}
    </nav>
  );
}
