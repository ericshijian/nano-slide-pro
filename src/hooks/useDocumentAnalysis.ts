import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

export interface SlideContent {
  id: string;
  title: string;
  content: string[];
  imagePrompt: string;
  notes: string;
  imageUrl?: string;
}

export interface AnalysisResult {
  title: string;
  slides: SlideContent[];
  summary: string;
}

export interface GenerationConfig {
  file: File | null;
  style: string;
  includeVideo: boolean;
  slideCount: number;
}

export function useDocumentAnalysis() {
  const { language } = useLanguage();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeDocument = async (config: GenerationConfig): Promise<AnalysisResult | null> => {
    if (!config.file) {
      setError('No file provided');
      return null;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // Read file content
      const documentContent = await readFileContent(config.file);
      
      console.log('Sending document for analysis...');

      const { data, error: fnError } = await supabase.functions.invoke('analyze-document', {
        body: {
          documentContent,
          style: config.style,
          slideCount: config.slideCount,
          language,
        },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // Add unique IDs to slides
      const result: AnalysisResult = {
        ...data,
        slides: data.slides.map((slide: Omit<SlideContent, 'id'>, index: number) => ({
          ...slide,
          id: `slide-${index + 1}`,
        })),
      };

      setAnalysisResult(result);
      console.log('Analysis complete:', result.title);
      
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to analyze document';
      setError(message);
      toast.error(message);
      console.error('Analysis error:', err);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    isAnalyzing,
    analysisResult,
    error,
    analyzeDocument,
    setAnalysisResult,
  };
}

async function readFileContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const content = event.target?.result as string;
      
      // For text-based files, return content directly
      if (file.type === 'text/plain' || file.name.endsWith('.md') || file.name.endsWith('.txt')) {
        resolve(content);
        return;
      }
      
      // For PDF and DOCX, we'll send the raw text content
      // In a production app, you'd want server-side parsing
      // For now, we'll handle it as text or provide sample content
      if (file.type === 'application/pdf') {
        resolve(`[PDF Document: ${file.name}]\n\nThis is a placeholder for PDF content. In production, the server would parse the PDF.\n\nPlease use markdown (.md) or text (.txt) files for best results.`);
        return;
      }
      
      if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        resolve(`[DOCX Document: ${file.name}]\n\nThis is a placeholder for DOCX content. In production, the server would parse the DOCX.\n\nPlease use markdown (.md) or text (.txt) files for best results.`);
        return;
      }
      
      resolve(content);
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}
