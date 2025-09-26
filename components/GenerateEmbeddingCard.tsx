
import React, { useRef } from 'react';
import { Card } from './Card';
import { ModelType } from '../types';
import { TextIcon, ImageIcon, PlayIcon, LoadingIcon } from './icons/Icons';

interface GenerateEmbeddingCardProps {
  title: string;
  description: string;
  modelType: ModelType;
  files: FileList | null;
  onFilesChange: (files: FileList | null) => void;
  isModelLoaded: boolean;
  isGenerating: boolean;
  onGenerate: (modelType: ModelType) => void;
}

export const GenerateEmbeddingCard: React.FC<GenerateEmbeddingCardProps> = ({
  title,
  description,
  modelType,
  files,
  onFilesChange,
  isModelLoaded,
  isGenerating,
  onGenerate,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const Icon = modelType === ModelType.Text ? TextIcon : ImageIcon;

  const handleFileSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilesChange(e.target.files);
  };

  const canGenerate = isModelLoaded && files && files.length > 0 && !isGenerating;

  return (
    <Card className="flex flex-col space-y-4">
        <div className="flex items-start gap-4">
            <div className="bg-gray-700/50 p-2 rounded-lg border border-gray-600">
                <Icon className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
                <p className="text-sm text-gray-400 mt-1">{description}</p>
            </div>
        </div>

        <div className="bg-gray-900/70 rounded-lg p-3 flex items-center justify-between border border-gray-700">
            <button
                onClick={handleFileSelectClick}
                className="px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors duration-200"
            >
                Select files
            </button>
            <input
                type="file"
                ref={fileInputRef}
                multiple
                accept={modelType === ModelType.Text ? '.txt,.md,.json' : 'image/*'}
                onChange={handleFileChange}
                className="hidden"
            />
            <span className="text-sm text-gray-400 truncate px-4">
                {files && files.length > 0 ? `${files.length} file(s) selected` : 'No file selected'}
            </span>
        </div>

        <div className="flex-grow flex flex-col items-center justify-end pt-2">
            <button
                onClick={() => onGenerate(modelType)}
                disabled={!canGenerate}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 bg-indigo-600 text-white hover:bg-indigo-500 border border-transparent focus:ring-indigo-500 disabled:bg-gray-600/50 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
                {isGenerating ? <LoadingIcon className="w-4 h-4 animate-spin" /> : <PlayIcon className="w-4 h-4" />}
                {isGenerating ? 'Generating...' : 'Generate Embeddings'}
            </button>
             {!isModelLoaded && (
                <p className="text-xs text-amber-400/80 mt-2 text-center">Load {modelType} model first</p>
            )}
        </div>
    </Card>
  );
};
