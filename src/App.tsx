import React, { useState } from 'react';
import { Navbar, AppPage } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { DocsUseCasesPage } from './components/pages/DocsUseCasesPage';
import { HistoryPage } from './components/pages/HistoryPage';
import { WorkspaceHeader } from './components/analysis/WorkspaceHeader';
import { UploadCard } from './components/analysis/UploadCard';
import { QueryCard } from './components/analysis/QueryCard';
import { ResultSection } from './components/results/ResultSection';
import { AnalysisResponse } from './types/analysis';
import { api } from './services/api';

export const App: React.FC = () => {
  // Navigation state - multi-page web application tabs
  const [currentPage, setCurrentPage] = useState<AppPage>('home');

  // Analysis Workspace State - starts clean for user's own image and question
  const [imageName, setImageName] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [query, setQuery] = useState<string>('');
  const [analyzedQuery, setAnalyzedQuery] = useState<string>('');
  const [analyzedImageUrl, setAnalyzedImageUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Result state: begins null so results only display after analysis
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);

  const handleNavigate = (page: AppPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    setAnalysisResult(null);
    setAnalyzedImageUrl(null);
  };

  const handleAnalyze = async () => {
    if (!imageName || !imageUrl) {
      setErrorMessage('Please upload an image before starting analysis.');
      return;
    }

    if (!query.trim()) {
      setErrorMessage('Please enter your question about this image.');
      return;
    }

    const currentQuery = query.trim();
    setErrorMessage(null);
    setIsAnalyzing(true);
    setAnalyzedQuery(currentQuery);
    setAnalyzedImageUrl(imageUrl);

    // Smooth scroll down to result view
    setTimeout(() => {
      document.getElementById('analysis-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    try {
      const response = await api.analyze({
        image: imageFile,
        imageUrl: imageUrl,
        imageName: imageName,
        query: currentQuery
      });

      if (imageFile && imageUrl && response.visualEvidence) {
        response.visualEvidence.inputImageUrl = imageUrl;
      }

      setAnalysisResult(response);

      setTimeout(() => {
        document.getElementById('analysis-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Analysis failed. Please check network connection.';
      setErrorMessage(msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLaunchWithQuery = (customQuery?: string) => {
    if (customQuery) {
      setQuery(customQuery);
    }
    handleNavigate('analysis');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F1] text-sat-ink font-sans">
      
      {/* Universal Multi-Page Tabbed Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* PAGE 1: HOME */}
      {currentPage === 'home' && (
        <HomePage 
          onLaunch={handleLaunchWithQuery} 
          onNavigate={handleNavigate} 
        />
      )}

      {/* PAGE 2: ANALYSIS WORKSPACE */}
      {currentPage === 'analysis' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Workspace Title & Telemetry Header */}
          <WorkspaceHeader onGoHome={() => handleNavigate('home')} />

          {/* Two-Column Input Layout */}
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

          {/* 3. Analysis Result Section: Uploaded Image + AI Answer + Confidence Score */}
          {(analysisResult || isAnalyzing) && (
            <ResultSection 
              response={analysisResult} 
              isAnalyzing={isAnalyzing}
              userQuery={analyzedQuery || query}
              userImageUrl={analyzedImageUrl || imageUrl}
              imageName={imageName}
            />
          )}

        </main>
      )}

      {/* PAGE 3: DOCUMENTATION & USE CASES */}
      {currentPage === 'docs-use-cases' && (
        <main className="flex-1">
          <DocsUseCasesPage 
            onSelectUseCase={handleLaunchWithQuery} 
            onNavigateToAnalysis={() => handleNavigate('analysis')}
          />
        </main>
      )}

      {/* PAGE 5: HISTORY */}
      {currentPage === 'history' && (
        <main className="flex-1">
          <HistoryPage onSelectQuery={handleLaunchWithQuery} />
        </main>
      )}

      {/* Universal Mission Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
};
