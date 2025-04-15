import type React from 'react';

type Props = {
  title: string;
  link: string;
};

const Card: React.FC<Props> = ({ title, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#111827] hover:bg-[#1F2937] p-6 rounded-2xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-center"
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-gray-400 mt-2">Click to visit</p>
    </a>
  );
};

export default Card;
