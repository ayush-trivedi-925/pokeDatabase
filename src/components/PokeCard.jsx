import { useEffect, useState } from "react";
import { getFullPokedexNumber, getPokedexNumber } from "../utils";
import TypeCard from "./TypeCard";
import Modal from "./Modal";
export default function PokeCard({ selectedPokemon }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [skill, setSkill] = useState(null);
  const [loadingSkill, setLoadingSkill] = useState(null);
  const { name, height, abilities, stats, types, moves, sprites } = data || {};
  // Object.keys returns an array of object's keys {Property names}
  const spriteList = Object.keys(sprites || {}).filter((val) => {
    if (!sprites[val]) {
      return false;
    }
    if (["versions", "other"].includes(val)) {
      return false;
    }
    return true;
  });

  async function fetchMoveData(move, moveUrl) {
    if (loadingSkill || !localStorage || !moveUrl) {
      return;
    }
    let cache = {};
    if (localStorage.getItem("pokemon-moves")) {
      cache = JSON.parse(localStorage.getItem("pokemon-moves"));
    }
    if (move in cache) {
      setSkill(cache[move]);
      console.log("Found pokemon move in cache");
      return;
    }
    try {
      setLoadingSkill(true);
      const res = await fetch(moveUrl);
      const data = await res.json();
      console.log("Fetched move data from API", data);
      const description = data?.flavor_text_entries.filter((val) => {
        return (val.version_group.name = "fiered-leafgreen");
      })[0]?.flavor_text;
      const skillData = {
        name: move,
        description,
      };
      setSkill(skillData);
      cache[move] = skillData;
      localStorage.setItem("pokemon-moves", JSON.stringify(cache));
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoadingSkill(false);
    }
  }

  useEffect(() => {
    // if loading, exit loop
    if (loading || !localStorage) {
      return;
    }
    // check if selected pokemon info is available in cache
    // 1. define cache
    let cache = {};
    if (localStorage.getItem("pokeDatabase")) {
      cache = JSON.parse(localStorage.getItem("pokeDatabase"));
    }
    //2. check if selected pokemon is in cache, otherwise fetch from api
    if (selectedPokemon in cache) {
      setData(cache[selectedPokemon]);
      console.log("Found pokemon in cache");
      return;
    }
    // if we fetch from api then make sure to cache it for next time
    async function fetchPokemonData() {
      setLoading(true);
      try {
        const baseUrl = "https://pokeapi.co/api/v2/";
        const suffix = "pokemon/" + getPokedexNumber(selectedPokemon);
        const finalUrl = baseUrl + suffix;
        const res = await fetch(finalUrl);
        const pokemonData = await res.json();
        setData(pokemonData);
        console.log("Fetched pokemon data");
        cache[selectedPokemon] = pokemonData;
        localStorage.setItem("pokeDatabase", JSON.stringify(cache));
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemonData();
  }, [selectedPokemon]);

  if (loading || !data) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="poke-card">
      {skill && (
        <Modal
          handleCloseModal={() => {
            setSkill(null);
          }}
        >
          <div>
            <h6>Name</h6>
            <h2 className="skill-name">{skill.name.replaceAll("-", " ")}</h2>
          </div>
          <div>
            <h4>Description</h4>
            <p>{skill.description}</p>
          </div>
        </Modal>
      )}
      <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
      <h2>{name}</h2>
      <div className="type-container">
        {types.map((typeObj, typeIndex) => {
          return <TypeCard key={typeIndex} name={typeObj?.type?.name} />;
        })}
      </div>
      <img
        src={"/pokemon/" + getFullPokedexNumber(selectedPokemon) + ".png"}
        alt={`${name}-large-img`}
      />
      <div className="img-container">
        {spriteList.map((spriteName, spriteIndex) => {
          const imgUrl = sprites[spriteName];
          return (
            <img
              key={spriteIndex}
              src={imgUrl}
              alt={`${name}-img-${spriteName}`}
            />
          );
        })}
      </div>
      <h3>Stats</h3>
      <div className="stats-card">
        {stats.map((statObj, statIndex) => {
          const { stat, base_stat } = statObj;
          return (
            <div key={statIndex} className="stat-item">
              <p>{stat?.name.replaceAll("-", " ")}</p>
              <h4>{base_stat}</h4>
            </div>
          );
        })}
      </div>
      <h3>Moves</h3>
      <div className="pokemon-move-grid">
        {moves.map((moveObj, moveIndex) => {
          return (
            <button
              key={moveIndex}
              className="button-card pokemon-move"
              onClick={() => {
                fetchMoveData(moveObj?.move?.name, moveObj?.move?.url);
              }}
            >
              <p>{moveObj?.move?.name.replaceAll("-", " ")}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
