
import React from 'react';
import { LightningIcon, CpuIcon, EyeIcon, TextIcon } from './icons/Icons';

const Tag: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
    <span className="flex items-center bg-gray-700/50 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-600">
        {icon}
        <span className="ml-1.5">{text}</span>
    </span>
);

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex justify-center items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <LightningIcon className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          Embedding Generator
        </h1>
      </div>
      <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-400">
        Generate and index embeddings from text and images using state-of-the-art ML models.
      </p>
      <div className="mt-4 flex justify-center items-center gap-3">
        <Tag icon={<CpuIcon className="w-3 h-3" />} text="WebGPU Accelerated" />
        <Tag icon={<div className="flex items-center"><EyeIcon className="w-3 h-3" /><span className="mx-0.5">+</span><TextIcon className="w-3 h-3" /></div>} text="CLIP Vision + Text Embeddings" />
      </div>
       <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-8"></div>
    </header>
  );
};
