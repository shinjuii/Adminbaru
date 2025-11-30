import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Warna dibuat sama dengan halaman Komunitas & Faktor Emisi
const darkGreen = "#064E3B";
const lightGreen = "#4ADE80";

export default function WelcomeCard({ userName }) {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center h-70 flex flex-col justify-between"
      style={{
        background: `linear-gradient(135deg, ${darkGreen} 0%, ${lightGreen} 100%)`
      }}
    >
      <div className="text-white max-w-xs">
        <h2 className="text-2xl font-bold mb-2">Selamat Datang, Cleo</h2>
        <p className="mb-4">Di Dashboard Admin</p>
      </div>
      <div className="w-full flex justify-center md:justify-end">
        <FontAwesomeIcon icon={faLeaf} className="text-white" style={{ width: '7rem', height: '6rem' }} />
      </div>
    </motion.div>
  );
}
