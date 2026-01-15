import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const pricingPlans = [
  {
    key: 'free',
    icon: Sparkles,
    popular: false,
    features: ['features.slides5', 'features.basicStyles', 'features.pdfExport', 'features.watermark'],
  },
  {
    key: 'pro',
    icon: Zap,
    popular: true,
    features: ['features.slidesUnlimited', 'features.allStyles', 'features.pptxExport', 'features.noWatermark', 'features.aiImages', 'features.prioritySupport'],
  },
  {
    key: 'enterprise',
    icon: Crown,
    popular: false,
    features: ['features.everything', 'features.aiVideo', 'features.customBranding', 'features.apiAccess', 'features.sso', 'features.dedicatedSupport'],
  },
];

export default function Pricing() {
  const { t, language } = useLanguage();

  const translations: Record<string, Record<string, string>> = {
    title: { en: 'Simple, Transparent Pricing', cn: '简单透明的定价' },
    subtitle: { en: 'Choose the plan that fits your needs', cn: '选择适合您需求的方案' },
    monthly: { en: '/month', cn: '/月' },
    free: { en: 'Free', cn: '免费版' },
    pro: { en: 'Pro', cn: '专业版' },
    enterprise: { en: 'Enterprise', cn: '企业版' },
    freePrice: { en: '$0', cn: '¥0' },
    proPrice: { en: '$19', cn: '¥128' },
    enterprisePrice: { en: '$99', cn: '¥688' },
    freeDesc: { en: 'Perfect for trying out', cn: '适合体验试用' },
    proDesc: { en: 'For professionals and teams', cn: '适合专业人士和团队' },
    enterpriseDesc: { en: 'For large organizations', cn: '适合大型企业' },
    getStarted: { en: 'Get Started', cn: '开始使用' },
    subscribe: { en: 'Subscribe', cn: '订阅' },
    contactSales: { en: 'Contact Sales', cn: '联系销售' },
    popular: { en: 'Most Popular', cn: '最受欢迎' },
    'features.slides5': { en: '5 presentations/month', cn: '每月5个演示文稿' },
    'features.basicStyles': { en: 'Basic styles', cn: '基础样式' },
    'features.pdfExport': { en: 'PDF export', cn: 'PDF导出' },
    'features.watermark': { en: 'With watermark', cn: '带水印' },
    'features.slidesUnlimited': { en: 'Unlimited presentations', cn: '无限演示文稿' },
    'features.allStyles': { en: 'All visual styles', cn: '全部视觉样式' },
    'features.pptxExport': { en: 'PPTX export', cn: 'PPTX导出' },
    'features.noWatermark': { en: 'No watermark', cn: '无水印' },
    'features.aiImages': { en: 'AI image generation', cn: 'AI图像生成' },
    'features.prioritySupport': { en: 'Priority support', cn: '优先支持' },
    'features.everything': { en: 'Everything in Pro', cn: '包含专业版所有功能' },
    'features.aiVideo': { en: 'AI video generation', cn: 'AI视频生成' },
    'features.customBranding': { en: 'Custom branding', cn: '自定义品牌' },
    'features.apiAccess': { en: 'API access', cn: 'API访问' },
    'features.sso': { en: 'SSO integration', cn: 'SSO集成' },
    'features.dedicatedSupport': { en: 'Dedicated support', cn: '专属支持' },
  };

  const tr = (key: string) => translations[key]?.[language] || key;

  return (
    <Layout>
      <section className="py-24 relative min-h-screen">
        {/* Background effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">{tr('title')}</span>
            </h1>
            <p className="text-lg text-muted-foreground">{tr('subtitle')}</p>
          </div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.key}
                className={`relative p-8 rounded-2xl glass transition-all duration-300 hover:border-primary/50 ${
                  plan.popular ? 'border-primary/50 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-button rounded-full text-sm font-medium text-white">
                    {tr('popular')}
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <plan.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{tr(plan.key)}</h3>
                  <p className="text-sm text-muted-foreground">{tr(`${plan.key}Desc`)}</p>
                </div>

                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">{tr(`${plan.key}Price`)}</span>
                  <span className="text-muted-foreground">{tr('monthly')}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span>{tr(feature)}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/dashboard">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-button hover:opacity-90 text-white'
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.key === 'free' ? tr('getStarted') : plan.key === 'pro' ? tr('subscribe') : tr('contactSales')}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}