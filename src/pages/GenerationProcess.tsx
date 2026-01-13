import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, 
  Image, 
  Video, 
  Layers,
  CheckCircle2,
  Loader2
} from 'lucide-react';

const logKeys = ['analyzing', 'designing', 'images', 'video', 'composing', 'complete'];

export default function GenerationProcess() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [imageProgress, setImageProgress] = useState([0, 0, 0, 0]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate WebSocket log streaming
    const interval = setInterval(() => {
      setCurrentLogIndex((prev) => {
        if (prev < logKeys.length - 1) {
          const newLog = t(`generation.logs.${logKeys[prev]}`);
          setLogs((l) => [...l, newLog]);
          setProgress((prev + 1) * (100 / logKeys.length));
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          return prev;
        }
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [t]);

  // Simulate parallel image generation
  useEffect(() => {
    if (currentLogIndex >= 2) {
      const imageInterval = setInterval(() => {
        setImageProgress((prev) => {
          const newProgress = prev.map((p) => {
            if (p < 100) {
              return Math.min(100, p + Math.random() * 20 + 10);
            }
            return p;
          });
          if (newProgress.every((p) => p >= 100)) {
            clearInterval(imageInterval);
          }
          return newProgress;
        });
      }, 300);

      return () => clearInterval(imageInterval);
    }
  }, [currentLogIndex]);

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
                    {index === logs.length - 1 && !isComplete && (
                      <Loader2 className="w-4 h-4 animate-spin text-primary ml-2" />
                    )}
                    {(index < logs.length - 1 || isComplete) && (
                      <CheckCircle2 className="w-4 h-4 text-green-400 ml-2" />
                    )}
                  </div>
                ))}
                {!isComplete && logs.length > 0 && (
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
                onClick={() => navigate('/editor')}
                className="bg-gradient-button hover:opacity-90 text-white shadow-glow text-lg px-12 py-6 h-auto"
              >
                {t('generation.viewResult')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
