import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  RefreshCw,
  Type,
  Download,
  Plus,
  Trash2,
  Copy,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Save,
  Eye
} from 'lucide-react';

// Mock slides data
const mockSlides = [
  { 
    id: 1, 
    title: { en: 'AI Revolution 2024', cn: 'AI革命 2024' },
    content: { en: 'The Future of Technology', cn: '技术的未来' },
    hasVideo: false 
  },
  { 
    id: 2, 
    title: { en: 'Key Insights', cn: '核心洞察' },
    content: { en: 'Data-driven decision making', cn: '数据驱动决策' },
    hasVideo: false 
  },
  { 
    id: 3, 
    title: { en: 'Video Showcase', cn: '视频展示' },
    content: { en: 'AI Generated Content', cn: 'AI生成内容' },
    hasVideo: true 
  },
  { 
    id: 4, 
    title: { en: 'Market Analysis', cn: '市场分析' },
    content: { en: 'Growth projections and trends', cn: '增长预测与趋势' },
    hasVideo: false 
  },
  { 
    id: 5, 
    title: { en: 'Conclusion', cn: '结论' },
    content: { en: 'Next steps and recommendations', cn: '下一步与建议' },
    hasVideo: false 
  },
];

export default function Editor() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSlide = mockSlides[selectedSlide];

  return (
    <Layout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        {/* Toolbar */}
        <div className="border-b border-border/50 bg-surface-glass/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                  className="text-muted-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('create.back')}
                </Button>
                <div className="h-6 w-px bg-border" />
                <span className="font-medium">
                  {language === 'en' ? 'AI Revolution 2024' : 'AI革命 2024'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {t('editor.regenerateImage')}
                </Button>
                <Button variant="ghost" size="sm">
                  <Type className="w-4 h-4 mr-2" />
                  {t('editor.editText')}
                </Button>
                <div className="h-6 w-px bg-border mx-2" />
                <Button variant="ghost" size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  {t('editor.save')}
                </Button>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  {t('editor.preview')}
                </Button>
                <Button 
                  size="sm"
                  className="bg-gradient-button hover:opacity-90 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t('editor.exportPptx')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar - Slide thumbnails */}
          <aside className="w-64 border-r border-border/50 bg-surface-glass/30 overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-sm">{t('editor.slides')}</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {mockSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setSelectedSlide(index)}
                  className={`w-full group relative rounded-lg overflow-hidden transition-all ${
                    selectedSlide === index 
                      ? 'ring-2 ring-primary shadow-glow' 
                      : 'hover:ring-1 hover:ring-border'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-surface-elevated p-3">
                    <div className="h-full flex flex-col">
                      <div className="w-full h-1.5 bg-primary/30 rounded mb-1" />
                      <div className="w-2/3 h-1 bg-muted-foreground/20 rounded mb-2" />
                      {slide.hasVideo ? (
                        <div className="flex-1 bg-accent/10 rounded flex items-center justify-center">
                          <Play className="w-4 h-4 text-accent" />
                        </div>
                      ) : (
                        <div className="flex-1 bg-muted/50 rounded" />
                      )}
                    </div>
                  </div>

                  {/* Slide number */}
                  <div className="absolute bottom-1 left-2 text-xs text-muted-foreground bg-background/80 px-1.5 py-0.5 rounded">
                    {index + 1}
                  </div>

                  {/* Hover actions */}
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6 bg-background/80">
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 bg-background/80 text-destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </button>
              ))}

              {/* Add slide button */}
              <button className="w-full aspect-video rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex items-center justify-center transition-colors group">
                <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            </div>
          </aside>

          {/* Main stage */}
          <div className="flex-1 flex flex-col">
            {/* Slide preview */}
            <div className="flex-1 flex items-center justify-center p-8 bg-muted/10">
              <div className="w-full max-w-4xl aspect-video glass rounded-2xl shadow-2xl overflow-hidden relative">
                {/* Slide content */}
                <div className="absolute inset-0 p-12 flex flex-col">
                  <h2 className="text-4xl font-bold mb-4 text-gradient">
                    {currentSlide.title[language]}
                  </h2>
                  <p className="text-xl text-muted-foreground mb-8">
                    {currentSlide.content[language]}
                  </p>
                  
                  {currentSlide.hasVideo ? (
                    <div className="flex-1 bg-muted/30 rounded-xl flex items-center justify-center relative overflow-hidden">
                      {/* Video placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10" />
                      <div className="relative z-10 flex flex-col items-center gap-4">
                        <button 
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center hover:bg-accent/30 transition-colors group"
                        >
                          {isPlaying ? (
                            <Pause className="w-6 h-6 text-accent" />
                          ) : (
                            <Play className="w-6 h-6 text-accent ml-1" />
                          )}
                        </button>
                        <span className="text-sm text-muted-foreground">
                          {t('editor.videoPlaceholder')}
                        </span>
                        <span className="text-xs text-accent">Powered by Kling API</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 grid grid-cols-2 gap-6">
                      <div className="bg-muted/30 rounded-xl" />
                      <div className="bg-muted/30 rounded-xl" />
                    </div>
                  )}
                </div>

                {/* Slide number indicator */}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-background/50 text-xs text-muted-foreground">
                  {selectedSlide + 1} / {mockSlides.length}
                </div>
              </div>
            </div>

            {/* Navigation controls */}
            <div className="border-t border-border/50 bg-surface-glass/30 p-4">
              <div className="flex items-center justify-center gap-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSelectedSlide(Math.max(0, selectedSlide - 1))}
                  disabled={selectedSlide === 0}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                
                <div className="flex gap-2">
                  {mockSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSlide(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === selectedSlide 
                          ? 'bg-primary w-6' 
                          : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                    />
                  ))}
                </div>

                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSelectedSlide(Math.min(mockSlides.length - 1, selectedSlide + 1))}
                  disabled={selectedSlide === mockSlides.length - 1}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
