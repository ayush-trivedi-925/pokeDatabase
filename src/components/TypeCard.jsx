import { pokemonTypeColors } from "../utils";

export default function TypeCard({ type }) {
  return (
    <div
      className="type-tile"
      style={{
        color: pokemonTypeColors?.[type]?.color,
        backgroundColor: pokemonTypeColors?.[type]?.background,
      }}
    >
      <p>{type}</p>
    </div>
  );
}
