import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGeneration } from '@/contexts/GenerationContext';
import { useDocumentAnalysis } from '@/hooks/useDocumentAnalysis';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Terminal, 
  Image, 
  Video, 
  Layers,
  CheckCircle2,
  Loader2,
  AlertCircle
} from 'lucide-react';

const logKeys = ['analyzing', 'designing', 'images', 'video', 'composing', 'complete'];

export default function GenerationProcess() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { config, setResult } = useGeneration();
  const { analyzeDocument, isAnalyzing } = useDocumentAnalysis();
  
  const [progress, setProgress] = useState(0);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [imageProgress, setImageProgress] = useState([0, 0, 0, 0]);
  const [isComplete, setIsComplete] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const hasStarted = useRef(false);

  // Start AI analysis when component mounts
  useEffect(() => {
    if (!config?.file || hasStarted.current) {
      if (!config?.file) {
        navigate('/create');
      }
      return;
    }

    hasStarted.current = true;
    startGeneration();
  }, [config]);

  const startGeneration = async () => {
    if (!config) return;

    // Add first log
    addLog('analyzing');
    setProgress(10);

    try {
      // Call real AI analysis
      const result = await analyzeDocument(config);

      if (!result) {
        throw new Error('Analysis failed');
      }

      // Simulate the rest of the process with real data
      await simulateProgress(result);
      
    } catch (error) {
      console.error('Generation error:', error);
      setHasError(true);
      toast.error(t('common.error'));
    }
  };

  const addLog = (key: string) => {
    const logText = t(`generation.logs.${key}`);
    setLogs(prev => [...prev, logText]);
  };

  const simulateProgress = async (result: any) => {
    // Designing schema
    await delay(500);
    addLog('designing');
    setProgress(25);
    setCurrentLogIndex(1);

    // Image generation (parallel)
    await delay(800);
    addLog('images');
    setProgress(40);
    setCurrentLogIndex(2);

    // Simulate parallel image generation
    simulateImageProgress();

    // Video generation
    await delay(1500);
    addLog('video');
    setProgress(65);
    setCurrentLogIndex(3);

    // Final composition
    await delay(1200);
    addLog('composing');
    setProgress(85);
    setCurrentLogIndex(4);

    // Complete
    await delay(1000);
    addLog('complete');
    setProgress(100);
    setCurrentLogIndex(5);
    setIsComplete(true);

    // Store result in context
    setResult(result);
  };

  const simulateImageProgress = () => {
    const interval = setInterval(() => {
      setImageProgress(prev => {
        const newProgress = prev.map(p => {
          if (p < 100) {
            return Math.min(100, p + Math.random() * 25 + 15);
          }
          return p;
        });
        if (newProgress.every(p => p >= 100)) {
          clearInterval(interval);
        }
        return newProgress;
      });
    }, 200);
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleViewResult = () => {
    navigate('/editor');
  };

  const handleRetry = () => {
    hasStarted.current = false;
    setLogs([]);
    setProgress(0);
    setCurrentLogIndex(0);
    setImageProgress([0, 0, 0, 0]);
    setIsComplete(false);
    setHasError(false);
    startGeneration();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">{t('generation.title')}</h1>
            <div className="flex items-center justify-center gap-4">
              <span className="text-muted-foreground">{t('generation.progress')}</span>
              <div className="w-64">
                <Progress value={progress} className="h-2" />
              </div>
              <span className="font-mono text-primary">{Math.round(progress)}%</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Terminal Logs */}
            <div className="glass rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-surface-elevated">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Process Log</span>
                {isAnalyzing && (
                  <span className="ml-auto text-xs text-primary flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    AI Processing
                  </span>
                )}
              </div>
              <div className="p-4 h-80 overflow-y-auto font-mono text-sm space-y-2">
                {logs.map((log, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-2 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-primary">{'>'}</span>
                    <span className={index === logs.length - 1 && !isComplete ? 'text-primary' : 'text-muted-foreground'}>
                      {log}
                    </span>
                    {index === logs.length - 1 && !isComplete && !hasError && (
                      <Loader2 className="w-4 h-4 animate-spin text-primary ml-2" />
                    )}
                    {(index < logs.length - 1 || isComplete) && !hasError && (
                      <CheckCircle2 className="w-4 h-4 text-green-400 ml-2" />
                    )}
                    {hasError && index === logs.length - 1 && (
                      <AlertCircle className="w-4 h-4 text-red-400 ml-2" />
                    )}
                  </div>
                ))}
                {!isComplete && logs.length > 0 && !hasError && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="animate-pulse">_</span>
                  </div>
                )}
              </div>
            </div>

            {/* Side panels */}
            <div className="space-y-4">
              {/* Parallel Image Generation */}
              <div className="glass rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Image className="w-4 h-4 text-primary" />
                  <span className="font-medium">{t('generation.imageGen')}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {imageProgress.map((prog, i) => (
                    <div 
                      key={i}
                      className="aspect-video bg-muted rounded-lg overflow-hidden relative"
                    >
                      {currentLogIndex >= 2 ? (
                        <>
                          <div 
                            className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
                            style={{ height: `${prog}%`, bottom: 0, top: 'auto' }}
                          />
                          {prog < 100 ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="flex flex-col items-center gap-2">
                                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                <span className="text-xs text-muted-foreground">{Math.round(prog)}%</span>
                              </div>
                            </div>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-surface-elevated/50">
                              <CheckCircle2 className="w-8 h-8 text-green-400" />
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-1 bg-muted-foreground/20 rounded animate-pulse" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Generation */}
              <div className="glass rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Video className="w-4 h-4 text-accent" />
                  <span className="font-medium">{t('generation.videoGen')}</span>
                </div>
                <div className="aspect-video bg-muted rounded-lg relative overflow-hidden">
                  {currentLogIndex >= 3 ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {currentLogIndex >= 5 ? (
                        <div className="flex flex-col items-center gap-2">
                          <CheckCircle2 className="w-12 h-12 text-green-400" />
                          <span className="text-sm text-muted-foreground">Kling API</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full border-4 border-accent/20" />
                            <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-accent animate-spin" />
                          </div>
                          <span className="text-sm text-muted-foreground">Kling API Processing...</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Waiting...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Slide Preview Skeleton */}
              <div className="glass rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="w-4 h-4 text-primary" />
                  <span className="font-medium">{t('generation.slidePreview')}</span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div 
                      key={i}
                      className={`shrink-0 w-24 aspect-video bg-muted rounded-lg ${
                        isComplete ? 'animate-fade-in' : 'animate-pulse'
                      }`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {isComplete && (
                        <div className="h-full p-2">
                          <div className="w-full h-1 bg-primary/30 rounded mb-1" />
                          <div className="w-2/3 h-1 bg-muted-foreground/20 rounded" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Complete CTA */}
          {isComplete && (
            <div className="mt-12 text-center animate-fade-in">
              <Button 
                size="lg"
                onClick={handleViewResult}
                className="bg-gradient-button hover:opacity-90 text-white shadow-glow text-lg px-12 py-6 h-auto"
              >
                {t('generation.viewResult')}
              </Button>
            </div>
          )}

          {/* Error Retry */}
          {hasError && (
            <div className="mt-12 text-center animate-fade-in">
              <Button 
                size="lg"
                onClick={handleRetry}
                variant="outline"
                className="text-lg px-12 py-6 h-auto"
              >
                Retry Generation
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
