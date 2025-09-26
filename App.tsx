import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { LoadModelCard } from './components/LoadModelCard';
import { GenerateEmbeddingCard } from './components/GenerateEmbeddingCard';
import { EmbeddingIndex } from './components/EmbeddingIndex';
import { Embedding, ModelType } from './types';
import { CpuIcon, EyeIcon } from './components/icons/Icons';

const App: React.FC = () => {
  const [isTextModelLoaded, setIsTextModelLoaded] = useState(false);
  const [isVisionModelLoaded, setIsVisionModelLoaded] = useState(false);

  const [isTextModelLoading, setIsTextModelLoading] = useState(false);
  const [isVisionModelLoading, setIsVisionModelLoading] = useState(false);

  const [textModelSource, setTextModelSource] = useState<string | null>(null);
  const [visionModelSource, setVisionModelSource] = useState<string | null>(null);

  const [textFiles, setTextFiles] = useState<FileList | null>(null);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);

  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const [textEmbeddings, setTextEmbeddings] = useState<Embedding[]>([]);
  const [imageEmbeddings, setImageEmbeddings] = useState<Embedding[]>([]);

  const handleLoadModel = useCallback((modelType: ModelType) => {
    if (modelType === ModelType.Text) {
      setIsTextModelLoading(true);
      setTimeout(() => {
        setTextModelSource('MixedBread AI');
        setIsTextModelLoaded(true);
        setIsTextModelLoading(false);
      }, 1500);
    } else {
      setIsVisionModelLoading(true);
      setTimeout(() => {
        setVisionModelSource('CLIP');
        setIsVisionModelLoaded(true);
        setIsVisionModelLoading(false);
      }, 2000);
    }
  }, []);

  const handleLoadModelFromPath = useCallback((modelType: ModelType, files: FileList | null) => {
    if (!files || files.length === 0) return;

    // Extract the root folder name from the path of the first file
    const path = files[0].webkitRelativePath.split('/')[0];

    if (modelType === ModelType.Text) {
      setIsTextModelLoading(true);
      setTimeout(() => {
        setTextModelSource(path);
        setIsTextModelLoaded(true);
        setIsTextModelLoading(false);
      }, 1500);
    } else {
      setIsVisionModelLoading(true);
      setTimeout(() => {
        setVisionModelSource(path);
        setIsVisionModelLoaded(true);
        setIsVisionModelLoading(false);
      }, 2000);
    }
  }, []);

  const handleGenerateEmbeddings = useCallback((modelType: ModelType) => {
    const files = modelType === ModelType.Text ? textFiles : imageFiles;
    if (!files) return;

    const setter = modelType === ModelType.Text ? setIsGeneratingText : setIsGeneratingImage;
    setter(true);

    // Simulate embedding generation
    setTimeout(() => {
      const newEmbeddings: Embedding[] = Array.from(files).map(file => ({
        id: crypto.randomUUID(),
        source: file.name,
        vector: Array.from({ length: 768 }, () => Math.random() * 2 - 1),
        type: modelType,
        timestamp: Date.now(),
      }));

      if (modelType === ModelType.Text) {
        setTextEmbeddings(prev => [...prev, ...newEmbeddings]);
        setTextFiles(null);
      } else {
        setImageEmbeddings(prev => [...prev, ...newEmbeddings]);
        setImageFiles(null);
      }
      setter(false);
    }, 2500);

  }, [textFiles, imageFiles]);

  const handleClearIndex = useCallback(() => {
    setTextEmbeddings([]);
    setImageEmbeddings([]);
  }, []);
  
  const handleExport = useCallback(() => {
    const allEmbeddings = [...textEmbeddings, ...imageEmbeddings];
    if (allEmbeddings.length === 0) {
      alert("No embeddings to export.");
      return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allEmbeddings, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "embeddings.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }, [textEmbeddings, imageEmbeddings]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="space-y-8 mt-8">
          {/* Section: Load Models */}
          <section>
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Load Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LoadModelCard
                title="Text Embedding Model"
                description="Load MixedBread AI text embedding model for semantic text processing."
                Icon={CpuIcon}
                modelType={ModelType.Text}
                isLoaded={isTextModelLoaded}
                isLoading={isTextModelLoading}
                modelSource={textModelSource}
                onLoad={handleLoadModel}
                onLoadFromPath={handleLoadModelFromPath}
              />
              <LoadModelCard
                title="Vision Embedding Model"
                description="Load CLIP model for computing vision embeddings from images."
                Icon={EyeIcon}
                modelType={ModelType.Vision}
                isLoaded={isVisionModelLoaded}
                isLoading={isVisionModelLoading}
                modelSource={visionModelSource}
                onLoad={handleLoadModel}
                onLoadFromPath={handleLoadModelFromPath}
              />
            </div>
          </section>

          {/* Section: Generate Embeddings */}
          <section>
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Generate Embeddings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GenerateEmbeddingCard
                title="Text Embeddings"
                description="Generate semantic embeddings from text input."
                modelType={ModelType.Text}
                files={textFiles}
                onFilesChange={setTextFiles}
                isModelLoaded={isTextModelLoaded}
                isGenerating={isGeneratingText}
                onGenerate={handleGenerateEmbeddings}
              />
               <GenerateEmbeddingCard
                title="Image Embeddings"
                description="Generate CLIP vision embeddings from images."
                modelType={ModelType.Vision}
                files={imageFiles}
                onFilesChange={setImageFiles}
                isModelLoaded={isVisionModelLoaded}
                isGenerating={isGeneratingImage}
                onGenerate={handleGenerateEmbeddings}
              />
            </div>
          </section>

          {/* Section: Embedding Index */}
          <section>
             <h2 className="text-xl font-semibold text-gray-300 mb-4">Embedding Index</h2>
             <EmbeddingIndex
                textEmbeddingsCount={textEmbeddings.length}
                imageEmbeddingsCount={imageEmbeddings.length}
                onClear={handleClearIndex}
                onExport={handleExport}
             />
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;