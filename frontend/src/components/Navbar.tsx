import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          Kahvana
        </Link>
        <div className="md:flex space-x-4">
          <Link to="/create" className="text-white">
            Create User
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
