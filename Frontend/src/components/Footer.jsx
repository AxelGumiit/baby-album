// Footer.jsx
import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-4 mt-8 text-center">
      <p>
        Created by <span className="font-semibold text-pink-600">Axel</span> ❤️
      </p>
      <small>© {new Date().getFullYear()} All rights reserved.</small>
    </footer>
  );
}

export default Footer;
