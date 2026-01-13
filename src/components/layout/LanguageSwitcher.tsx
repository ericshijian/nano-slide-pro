import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 glass rounded-full p-1">
      <Globe className="w-4 h-4 text-muted-foreground ml-2" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage('en')}
        className={`rounded-full px-3 h-7 text-xs font-medium transition-all ${
          language === 'en' 
            ? 'bg-primary text-primary-foreground shadow-glow' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage('cn')}
        className={`rounded-full px-3 h-7 text-xs font-medium transition-all ${
          language === 'cn' 
            ? 'bg-primary text-primary-foreground shadow-glow' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        中
      </Button>
    </div>
  );
}
