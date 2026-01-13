import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Zap, 
  Video, 
  BarChart3, 
  FileDown, 
  ArrowRight,
  Play,
  Star
} from 'lucide-react';

export default function Landing() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Zap,
      title: t('landing.featureParallel'),
      description: t('landing.featureParallelDesc'),
    },
    {
      icon: Video,
      title: t('landing.featureVideo'),
      description: t('landing.featureVideoDesc'),
    },
    {
      icon: BarChart3,
      title: t('landing.featureRealtime'),
      description: t('landing.featureRealtimeDesc'),
    },
    {
      icon: FileDown,
      title: t('landing.featureExport'),
      description: t('landing.featureExportDesc'),
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">AI-Powered Presentation Generator</span>
            </div>

            {/* Main headline */}
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="text-gradient">{t('landing.heroTitle')}</span>
            </h1>

            {/* Subtitle */}
            <p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              {t('landing.heroSubtitle')}
            </p>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              <Link to="/dashboard">
                <Button 
                  size="lg" 
                  className="bg-gradient-button hover:opacity-90 text-white shadow-glow animate-pulse-glow text-lg px-8 py-6 h-auto"
                >
                  {t('landing.ctaGenerate')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="border-border/50 text-lg px-8 py-6 h-auto group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" />
                {t('landing.ctaDemo')}
              </Button>
            </div>

            {/* Trusted by */}
            <div 
              className="mt-16 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              <p className="text-sm text-muted-foreground mb-6">{t('landing.trustedBy')}</p>
              <div className="flex items-center justify-center gap-8 opacity-50">
                {['Acme Corp', 'TechFlow', 'InnovateLab', 'FutureScale'].map((company) => (
                  <div key={company} className="text-lg font-semibold text-muted-foreground">
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hero visual - floating slides preview */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 pointer-events-none">
          <div className="relative h-64 md:h-80">
            {/* Slide cards */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute glass rounded-xl shadow-2xl animate-float"
                style={{
                  width: '280px',
                  height: '180px',
                  left: `${30 + i * 20}%`,
                  bottom: `${20 + i * 10}%`,
                  transform: `translateX(-50%) rotate(${-5 + i * 5}deg)`,
                  animationDelay: `${i * -2}s`,
                  zIndex: i,
                }}
              >
                <div className="absolute inset-0 p-4">
                  <div className="w-full h-2 bg-primary/20 rounded mb-2" />
                  <div className="w-3/4 h-2 bg-muted rounded mb-4" />
                  <div className="w-full h-16 bg-muted/50 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl glass hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8 md:p-12">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              
              {/* Terminal-style demo */}
              <div className="font-mono text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-primary">$</span>
                  <span className="text-muted-foreground">nanoslide generate document.pdf --style corporate</span>
                </div>
                <div className="text-green-400">✓ Document analyzed (2.3s)</div>
                <div className="text-green-400">✓ Schema designed (1.8s)</div>
                <div className="text-primary">→ Generating 12 slides with AI images...</div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-button rounded-full animate-pulse" />
                  </div>
                  <span className="text-xs text-muted-foreground">75%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-button flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">NanoSlide Pro</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Made with AI • Powered by Innovation</span>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
