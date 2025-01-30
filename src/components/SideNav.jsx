import { first151Pokemon, getFullPokedexNumber } from "../utils";
export default function SideNav() {
  return (
    <nav>
      <div>
        <h1 className="text-gradient">PokeDatabase</h1>
      </div>
      <input />
      {first151Pokemon.map((pokemon, pokeIndex) => {
        return (
          <button key={pokeIndex} className={"nav-card"}>
            <p>{getFullPokedexNumber(pokeIndex)}</p>
            <p>{pokemon}</p>
          </button>
        );
      })}
    </nav>
  );
}
