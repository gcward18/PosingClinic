import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="p-4">
            <ul className="flex gap-4 text-white">
                <li><NavLink to="/" className={({isActive}) => isActive ? "underline" : ""}>Home</NavLink></li>
                <li><NavLink to="/division" className={({isActive}) => isActive ? "underline" : ""}>Add
                    Division</NavLink>
                </li>
                <li><NavLink to="/competitor" className={({isActive}) => isActive ? "underline" : ""}>Add
                    Competitor</NavLink></li>

                <li><NavLink to="/competition" className={({isActive}) => isActive ? "underline" : ""}>Add
                    Competition</NavLink></li>

                <li><NavLink to="/judge" className={({isActive}) => isActive ? "underline" : ""}>Add
                    Judge</NavLink></li>

                <li><NavLink to="/user" className={({isActive}) => isActive ? "underline" : ""}>Add
                    User</NavLink></li>
            </ul>
        </nav>
    );
}
