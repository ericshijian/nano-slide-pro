import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLanding = location.pathname === '/';

  const navLinks = [
    { href: '/#features', label: t('nav.features') },
    { href: '/pricing', label: t('nav.pricing') },
    { href: '/docs', label: t('nav.docs') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-button flex items-center justify-center shadow-glow">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="absolute inset-0 w-8 h-8 rounded-lg bg-gradient-button opacity-50 blur-lg group-hover:opacity-75 transition-opacity" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              {t('nav.brand')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isLanding && navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {!isLanding && (
              <Link
                to="/dashboard"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.dashboard')}
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            
            <div className="hidden md:flex items-center gap-2">
              {isLanding ? (
                <>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    {t('nav.login')}
                  </Button>
                  <Link to="/dashboard">
                    <Button 
                      size="sm" 
                      className="bg-gradient-button hover:opacity-90 text-white shadow-glow transition-all"
                    >
                      {t('nav.getStarted')}
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/create">
                  <Button 
                    size="sm" 
                    className="bg-gradient-button hover:opacity-90 text-white shadow-glow transition-all"
                  >
                    {t('dashboard.newPresentation')}
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-3">
              {isLanding && navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
                <Button variant="ghost" size="sm" className="justify-start text-muted-foreground">
                  {t('nav.login')}
                </Button>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-button hover:opacity-90 text-white"
                  >
                    {t('nav.getStarted')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
