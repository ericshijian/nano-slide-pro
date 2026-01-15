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
  // For text-based files, read as text directly
  if (file.type === 'text/plain' || file.name.endsWith('.md') || file.name.endsWith('.txt')) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target?.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }
  
  // For PDF files, use pdfjs-dist to extract text
  if (file.type === 'application/pdf') {
    return extractPdfText(file);
  }
  
  // For DOCX, provide helpful message (would need mammoth.js or similar)
  if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return `[DOCX Document: ${file.name}]\n\nDOCX parsing is not yet supported. Please convert to PDF or use markdown (.md) / text (.txt) files for best results.`;
  }
  
  // Fallback: try to read as text
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target?.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

async function extractPdfText(file: File): Promise<string> {
  try {
    // Dynamically import pdfjs-dist
    const pdfjsLib = await import('pdfjs-dist');
    
    // Set up the worker - use a CDN-hosted worker for compatibility
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;
    
    // Read file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    console.log(`PDF loaded: ${pdf.numPages} pages`);
    
    const textParts: string[] = [];
    
    // Extract text from each page (limit to 50 pages for performance)
    const maxPages = Math.min(pdf.numPages, 50);
    
    for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Combine text items into readable content
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      if (pageText) {
        textParts.push(`--- Page ${pageNum} ---\n${pageText}`);
      }
    }
    
    if (pdf.numPages > 50) {
      textParts.push(`\n[Note: Document has ${pdf.numPages} pages. Only first 50 pages were processed.]`);
    }
    
    const fullText = textParts.join('\n\n');
    
    if (!fullText.trim()) {
      return `[PDF Document: ${file.name}]\n\nThis PDF appears to contain no extractable text (may be scanned/image-based). Please use a text-based document for best results.`;
    }
    
    console.log(`Extracted ${fullText.length} characters from PDF`);
    return fullText;
    
  } catch (error) {
    console.error('PDF extraction error:', error);
    return `[PDF Document: ${file.name}]\n\nFailed to extract text from PDF: ${error instanceof Error ? error.message : 'Unknown error'}. Please try a different document format.`;
  }
}
