import React, { useRef } from 'react';
import { Card } from './Card';
import { ModelType } from '../types';
import { CheckIcon, DownloadIcon, LoadingIcon, FolderIcon } from './icons/Icons';

interface LoadModelCardProps {
  title: string;
  description: string;
  Icon: React.FC<{ className?: string }>;
  modelType: ModelType;
  isLoaded: boolean;
  isLoading: boolean;
  modelSource: string | null;
  onLoad: (modelType: ModelType) => void;
  onLoadFromPath: (modelType: ModelType, files: FileList | null) => void;
}

export const LoadModelCard: React.FC<LoadModelCardProps> = ({
  title,
  description,
  Icon,
  modelType,
  isLoaded,
  isLoading,
  modelSource,
  onLoad,
  onLoadFromPath,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLoadClick = () => {
    if (!isLoading && !isLoaded) {
      onLoad(modelType);
    }
  };

  const handlePathButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onLoadFromPath(modelType, e.target.files);
  };

  return (
    <Card className="flex flex-col">
      <div className="flex items-start gap-4">
        <div className="bg-gray-700/50 p-2 rounded-lg border border-gray-600">
            <Icon className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
            <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
            <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
      </div>
      <div className="mt-6 flex-grow flex flex-col justify-end">
        <div className="space-y-2">
          <button
            onClick={handleLoadClick}
            disabled={isLoading || isLoaded}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800
              ${isLoaded ? 'bg-green-600/20 text-green-400 border border-green-500/30 cursor-default' : ''}
              ${isLoading ? 'bg-indigo-500/50 text-indigo-300 cursor-wait border border-indigo-500/30' : ''}
              ${!isLoading && !isLoaded ? 'bg-indigo-600 text-white hover:bg-indigo-500 border border-transparent focus:ring-indigo-500' : ''}
            `}
          >
            {isLoading && <LoadingIcon className="w-4 h-4 animate-spin" />}
            {isLoaded && <CheckIcon className="w-4 h-4" />}
            {!isLoading && !isLoaded && <DownloadIcon className="w-4 h-4" />}
            {isLoading ? 'Loading Model...' : isLoaded ? 'Model Loaded' : `Load ${modelType === ModelType.Text ? 'Text' : 'CLIP'} Model`}
          </button>
          <button
            onClick={handlePathButtonClick}
            disabled={isLoading || isLoaded}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 border bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FolderIcon className="w-4 h-4" />
            Load from Path
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            // @ts-ignore
            webkitdirectory=""
            directory=""
          />
        </div>
        <div className="h-5 text-center mt-2"> {/* Wrapper to prevent layout shift */}
          {isLoaded && modelSource && (
            <p className="text-xs text-gray-400">
              Successfully loaded <span className="font-semibold text-green-400">{modelSource}</span> model.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};