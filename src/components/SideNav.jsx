import { first151Pokemon, getFullPokedexNumber } from "../utils";
export default function SideNav({ selectedPokemon, setSelectedPokemon }) {
  return (
    <nav>
      <div>
        <h1 className="text-gradient">PokeDatabase</h1>
      </div>
      <input />
      {first151Pokemon.map((pokemon, pokeIndex) => {
        return (
          <button
            onClick={() => setSelectedPokemon(pokeIndex)}
            key={pokeIndex}
            className={
              "nav-card" +
              (pokeIndex === selectedPokemon ? "nav-card-selected" : "")
            }
          >
            <p>{getFullPokedexNumber(pokeIndex)}</p>
            <p>{pokemon}</p>
          </button>
        );
      })}
    </nav>
  );
}
