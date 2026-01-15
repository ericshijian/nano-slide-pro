import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AnalysisResult, GenerationConfig } from '@/hooks/useDocumentAnalysis';

interface GenerationContextType {
  config: GenerationConfig | null;
  setConfig: (config: GenerationConfig) => void;
  result: AnalysisResult | null;
  setResult: (result: AnalysisResult | null) => void;
  clearGeneration: () => void;
}

const GenerationContext = createContext<GenerationContextType | undefined>(undefined);

export function GenerationProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<GenerationConfig | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const clearGeneration = () => {
    setConfig(null);
    setResult(null);
  };

  return (
    <GenerationContext.Provider value={{ config, setConfig, result, setResult, clearGeneration }}>
      {children}
    </GenerationContext.Provider>
  );
}

export function useGeneration() {
  const context = useContext(GenerationContext);
  if (!context) {
    throw new Error('useGeneration must be used within a GenerationProvider');
  }
  return context;
}
