
import React from 'react';
import { Card } from './Card';
import { DatabaseIcon, ExportIcon, ClearIcon, SearchIcon } from './icons/Icons';

interface EmbeddingIndexProps {
  textEmbeddingsCount: number;
  imageEmbeddingsCount: number;
  onClear: () => void;
  onExport: () => void;
}

const StatBox: React.FC<{ count: number; label: string }> = ({ count, label }) => (
    <div className="flex-1 bg-gray-900/70 border border-gray-700 rounded-lg p-4 text-center">
        <p className="text-3xl font-bold text-indigo-400">{count}</p>
        <p className="text-sm text-gray-400 mt-1">{label}</p>
    </div>
);

export const EmbeddingIndex: React.FC<EmbeddingIndexProps> = ({
  textEmbeddingsCount,
  imageEmbeddingsCount,
  onClear,
  onExport,
}) => {
  const totalEmbeddings = textEmbeddingsCount + imageEmbeddingsCount;

  return (
    <Card>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-start gap-4">
                <div className="bg-gray-700/50 p-2 rounded-lg border border-gray-600">
                    <DatabaseIcon className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-100">Embedding Index</h3>
                    <p className="text-sm text-gray-400 mt-1">Store and manage embeddings with metadata (simulated FAISS index).</p>
                </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center">
                 <button 
                    onClick={onExport}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-gray-700/80 text-gray-300 rounded-md hover:bg-gray-600/80 transition-colors"
                >
                    <ExportIcon className="w-3.5 h-3.5" />
                    Export
                 </button>
                 <button 
                    onClick={onClear}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-red-800/60 text-red-300 rounded-md hover:bg-red-700/60 transition-colors"
                >
                    <ClearIcon className="w-3.5 h-3.5" />
                    Clear
                </button>
            </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-4">
            <StatBox count={textEmbeddingsCount} label="Text Embeddings" />
            <StatBox count={imageEmbeddingsCount} label="Image Embeddings" />
        </div>

        {totalEmbeddings === 0 && (
            <div className="mt-6 flex flex-col items-center justify-center text-center text-gray-500 py-10 border-2 border-dashed border-gray-700/80 rounded-lg">
                <SearchIcon className="w-12 h-12 mb-2 text-gray-600" />
                <p className="font-semibold">No embeddings in index yet</p>
                <p className="text-sm">Generate embeddings to populate the index</p>
            </div>
        )}
    </Card>
  );
};
