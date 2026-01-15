import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGeneration } from '@/contexts/GenerationContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  ArrowLeft, 
  ArrowRight,
  Sparkles,
  Video,
  Check
} from 'lucide-react';

const styleOptions = [
  { key: 'corporate', icon: '💼' },
  { key: 'creative', icon: '🎨' },
  { key: 'cyberpunk', icon: '🌆' },
  { key: 'minimal', icon: '◻️' },
  { key: 'academic', icon: '📚' },
];

export default function CreatePresentation() {
  const { t } = useLanguage();
  const { setConfig } = useGeneration();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState('corporate');
  const [includeVideo, setIncludeVideo] = useState(true);
  const [slideCount, setSlideCount] = useState([0]); // 0 = auto

  const slideCountLabels = [t('create.slideCountAuto'), '5', '10', '15'];
  const slideCountValues = [0, 5, 10, 15];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleGenerate = () => {
    // Store config in context for the generation page
    setConfig({
      file,
      style: selectedStyle,
      includeVideo,
      slideCount: slideCountValues[slideCount[0]],
    });
    navigate('/generation');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-8">
          <Button 
            variant="ghost" 
            className="mb-4 text-muted-foreground"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('create.back')}
          </Button>
          <h1 className="text-3xl font-bold">{t('create.title')}</h1>
        </div>

        {/* Progress steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
            <div 
              className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
            
            {[1, 2, 3].map((s) => (
              <div key={s} className="relative z-10 flex flex-col items-center gap-2">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    s <= step 
                      ? 'bg-primary text-primary-foreground shadow-glow' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s < step ? <Check className="w-5 h-5" /> : s}
                </div>
                <span className={`text-sm ${s <= step ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {t(`create.step${s}`)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          {/* Step 1: Upload */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className={`relative border-2 border-dashed rounded-2xl p-12 transition-all text-center ${
                  file 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50 hover:bg-muted/20'
                }`}
              >
                <input
                  type="file"
                  accept=".pdf,.md,.docx,.txt"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {file ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      {t('common.edit')}
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{t('create.dragDrop')}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t('create.supportedFormats')}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-8">
                <Button 
                  onClick={() => setStep(2)}
                  disabled={!file}
                  className="bg-gradient-button hover:opacity-90 text-white"
                >
                  {t('create.next')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Configure */}
          {step === 2 && (
            <div className="space-y-8 animate-fade-in">
              {/* Visual Style */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">{t('create.visualStyle')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {styleOptions.map((style) => (
                    <button
                      key={style.key}
                      onClick={() => setSelectedStyle(style.key)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedStyle === style.key
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{style.icon}</span>
                      <span className="text-sm font-medium">
                        {t(`create.styleOptions.${style.key}`)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Video Toggle */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Video className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{t('create.includeVideo')}</h3>
                      <p className="text-sm text-muted-foreground">{t('create.videoHint')}</p>
                    </div>
                  </div>
                  <Switch 
                    checked={includeVideo} 
                    onCheckedChange={setIncludeVideo}
                  />
                </div>
              </div>

              {/* Slide Count */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">{t('create.slideCount')}</h3>
                <div className="px-2">
                  <Slider
                    value={slideCount}
                    onValueChange={setSlideCount}
                    max={3}
                    step={1}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    {slideCountLabels.map((label, i) => (
                      <span 
                        key={i}
                        className={slideCount[0] === i ? 'text-primary font-medium' : ''}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('create.back')}
                </Button>
                <Button 
                  onClick={() => setStep(3)}
                  className="bg-gradient-button hover:opacity-90 text-white"
                >
                  {t('create.next')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Generate */}
          {step === 3 && (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="glass rounded-2xl p-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-button flex items-center justify-center shadow-glow animate-pulse-glow">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold mb-4">
                  {t('create.startGeneration')}
                </h2>
                
                <div className="max-w-md mx-auto space-y-3 text-left mb-8">
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>{file?.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>{t(`create.styleOptions.${selectedStyle}`)}</span>
                  </div>
                  {includeVideo && (
                    <div className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>{t('create.includeVideo')}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>
                      {t('create.slideCount')}: {slideCountLabels[slideCount[0]]}
                    </span>
                  </div>
                </div>

                <Button 
                  size="lg"
                  onClick={handleGenerate}
                  className="bg-gradient-button hover:opacity-90 text-white shadow-glow text-lg px-12 py-6 h-auto"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t('create.startGeneration')}
                </Button>
              </div>

              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('create.back')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
