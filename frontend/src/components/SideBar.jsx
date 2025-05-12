import React, {useState} from "react";

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const toggleSidebar = () => {
        setOpen(!open);
    };
    return (
        <>
            <button onClick={() => setOpen(true)} className="open-button fixed top-0 left-0 m-2 p-2 bg-blue-500 rounded-sm text-white cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
            <div className={`fixed top-0 left-0 h-full bg-gray-100  w-64 h-full bg-white border-r border-gray-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
                <button onClick={() => setOpen(false)} className="close-button flex top-0 left-0 m-2 p-2 bg-blue-500 rounded-sm text-white cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                <ul class="p-4 text-xl gap-3 flex flex-col">
                    <li className="py-2 ">
                        <a href="/" className="flex items-center gap-2 hover:bg-gray-900/10 hover:rounded-sm p-4 hover:scale-105 transition">
                        <i className="fas fa-house"></i> Home
                        </a>
                    </li>
                    <li className="py-2">
                        <a href="/division" className="flex items-center gap-2 hover:bg-gray-900/10 hover:rounded-sm p-4 hover:scale-105 transition">
                        <i className="fas fa-layer-group"></i> Add Division
                        </a>
                    </li>
                    <li className="py-2">
                        <a href="/competitor" className="flex items-center gap-2 hover:bg-gray-900/10 hover:rounded-sm p-4 hover:scale-105 transition">
                        <i className="fas fa-user"></i> Add Competitor
                        </a>
                    </li>
                    <li className="py-2">
                        <a href="/competition" className="flex items-center gap-2 hover:bg-gray-900/10 hover:rounded-sm p-4 hover:scale-105 transition">
                        <i className="fas fa-trophy"></i> Add Competition
                        </a>
                    </li>
                    <li className="py-2">
                        <a href="/judge" className="flex items-center gap-2 hover:bg-gray-900/10 hover:rounded-sm p-4 hover:scale-105 transition">
                        <i className="fas fa-gavel"></i> Add Judge
                        </a>
                    </li>
                    <li className="py-2">
                        <a href="/user" className="flex items-center gap-2 hover:bg-gray-900/10 hover:rounded-sm p-4 hover:scale-105 transition">
                        <i className="fas fa-users"></i> Add User
                        </a>
                    </li>
                </ul>
            </div>
        </>    
    );
}
