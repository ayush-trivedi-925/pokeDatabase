import { pokemonTypeColors } from "../utils";

export default function TypeCard({ name }) {
  return (
    <div
      className="type-tile"
      style={{
        color: pokemonTypeColors?.[name]?.color,
        backgroundColor: pokemonTypeColors?.[name]?.background,
      }}
    >
      <p>{name}</p>
    </div>
  );
}
