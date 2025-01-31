import { FaBars } from "react-icons/fa";
export default function Header({ handleToggleMenu }) {
  return (
    <header>
      <button onClick={handleToggleMenu} className="open-nav-button">
        <FaBars />
      </button>
      <h1 className="text-gradient">PokeDatabase</h1>
    </header>
  );
}
