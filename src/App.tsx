import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/landing/HeroSection';
import { Capabilities } from './components/landing/Capabilities';
import { UseCases } from './components/landing/UseCases';
import { TechFlow } from './components/landing/TechFlow';
import { WorkspaceHeader } from './components/analysis/WorkspaceHeader';
import { UploadCard } from './components/analysis/UploadCard';
import { QueryCard } from './components/analysis/QueryCard';
import { PipelineStatus } from './components/analysis/PipelineStatus';
import { ResultSection } from './components/results/ResultSection';
import { HistoryModal, DocumentationModal } from './components/common/Modals';
import { SATELLITE_SAMPLE_IMAGES, generateMockAnalysis } from './data/demo';
import { AnalysisResponse } from './types/analysis';
import { api } from './services/api';

export const App: React.FC = () => {
  // Navigation state
  const [currentPage, setCurrentPage] = useState<'landing' | 'analysis'>('landing');

  // Modals state
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  // Analysis Workspace State (Pre-populated with default SIH demo scenario matching screenshot)
  const [imageName, setImageName] = useState<string | null>('sentinel2_sample.jpg');
  const [imageSize, setImageSize] = useState<string | null>('2.4 MB');
  const [imageUrl, setImageUrl] = useState<string | null>(SATELLITE_SAMPLE_IMAGES.waterBodyInput);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [query, setQuery] = useState<string>('Where is the water body in this image?');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Result state: pre-populate with default demo result so workspace has immediate visual evidence,
  // while allowing dynamic live re-runs whenever the user enters queries!
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(() => 
    generateMockAnalysis('Where is the water body in this image?', 'sentinel2_sample.jpg')
  );

  const handleImageSelected = (name: string, size: string, url: string, file?: File) => {
    setImageName(name);
    setImageSize(size);
    setImageUrl(url);
    setImageFile(file || null);
    setErrorMessage(null);
  };

  const handleImageRemoved = () => {
    setImageName(null);
    setImageSize(null);
    setImageUrl(null);
    setImageFile(null);
  };

  const handleAnalyze = async () => {
    // Error validation 1: Check if image is uploaded
    if (!imageName || !imageUrl) {
      setErrorMessage('Please upload a satellite image before starting analysis.');
      return;
    }

    // Error validation 2: Check if question is entered
    if (!query.trim()) {
      setErrorMessage('Please enter a natural-language question about this image.');
      return;
    }

    setErrorMessage(null);
    setIsAnalyzing(true);

    try {
      const response = await api.analyze({
        image: imageFile,
        imageUrl: imageUrl,
        imageName: imageName,
        query: query.trim()
      });

      // If user uploaded a custom image, maintain the user's uploaded image as inputImageUrl
      if (imageFile && imageUrl && response.visualEvidence) {
        response.visualEvidence.inputImageUrl = imageUrl;
      }

      setAnalysisResult(response);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Analysis failed. Please check network connection.';
      setErrorMessage(msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F1] text-sat-ink font-sans">
      
      {/* Universal Official Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
      />

      {/* PAGE 1: LANDING PAGE */}
      {currentPage === 'landing' && (
        <main className="flex-1">
          <HeroSection onLaunch={() => {
            setCurrentPage('analysis');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
          <Capabilities />
          <UseCases />
          <TechFlow />
        </main>
      )}

      {/* PAGE 2: ANALYSIS WORKSPACE */}
      {currentPage === 'analysis' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Workspace Title & Telemetry Header */}
          <WorkspaceHeader onGoHome={() => setCurrentPage('landing')} />

          {/* Two-Column Input Layout (matching mockup) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            
            {/* Left Column: 1. Upload Image */}
            <UploadCard
              currentImageName={imageName}
              currentImageSize={imageSize}
              currentImageUrl={imageUrl}
              onImageSelected={handleImageSelected}
              onImageRemoved={handleImageRemoved}
              errorMessage={!imageName && errorMessage ? errorMessage : null}
              onErrorDismiss={() => setErrorMessage(null)}
            />

            {/* Right Column: 2. Ask Your Question */}
            <QueryCard
              query={query}
              setQuery={(q) => {
                setQuery(q);
                if (errorMessage) setErrorMessage(null);
              }}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              hasImage={!!imageName}
              errorMessage={imageName && errorMessage ? errorMessage : null}
            />

          </div>

          {/* Agent Execution Pipeline Status */}
          <PipelineStatus
            isAnalyzing={isAnalyzing}
            steps={analysisResult?.executionTrace || []}
            selectedModel={analysisResult?.model}
            taskName={analysisResult?.task}
          />

          {/* 3. Analysis Result Section */}
          {analysisResult && (
            <ResultSection response={analysisResult} />
          )}

        </main>
      )}

      {/* Universal Official Mission Footer */}
      <Footer onNavigate={(page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Modals */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectQuery={(q) => {
          setQuery(q);
          setCurrentPage('analysis');
        }}
      />

      <DocumentationModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

    </div>
  );
};
