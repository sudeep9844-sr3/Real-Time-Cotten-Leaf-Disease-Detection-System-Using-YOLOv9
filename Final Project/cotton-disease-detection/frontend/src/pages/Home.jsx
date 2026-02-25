import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Video, Sparkles, TrendingUp, Shield, Zap, ArrowRight, Leaf, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedNumber } from '../components/features/StatCard';
import LanguageSwitcher from '../components/features/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const stats = [
    { value: 94, suffix: '%', label: 'Accuracy' },
    { value: 30, suffix: '+ FPS', label: 'Speed' },
    { value: 4, suffix: ' Classes', label: 'Diseases' },
    { value: 100, suffix: 'ms', label: 'Response' }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">CottonVision AI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { key: 'Home', path: '/', label: t('nav.home') },
                { key: 'Dashboard', path: '/dashboard', label: t('nav.dashboard') },
                { key: 'Upload', path: '/upload', label: t('nav.upload') },
                { key: 'Live', path: '/live', label: t('nav.detect') },
                { key: 'About', path: '/about', label: t('nav.about') }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => navigate(item.path)}
                  className="text-base font-semibold text-gray-600 hover:text-green-600 transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
              <div className="ml-4">
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-8 pb-20 bg-gradient-to-b from-white to-green-50/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight">
                  {t('landing.title')}
                  <br />
                  <span className="gradient-text">{t('landing.titleHighlight')}</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  {t('landing.subtitle')}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => navigate('/live')}
                  className="btn-primary flex items-center space-x-3 text-lg px-8 py-4"
                >
                  <Video className="w-6 h-6" />
                  <span>{t('landing.liveBtn')}</span>
                  <ArrowRight className="w-6 h-6" />
                </button>
                <button
                  onClick={() => navigate('/upload')}
                  className="btn-secondary flex items-center space-x-3 text-lg px-8 py-4"
                >
                  <Upload className="w-6 h-6" />
                  <span>{t('landing.uploadBtn')}</span>
                </button>
              </div>
            </motion.div>

            {/* Right Column - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-full h-[480px] bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-[40px] flex items-center justify-center overflow-hidden shadow-2xl border-2 border-white">
                {/* Floating Leaf Animation */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <Leaf className="w-72 h-72 text-green-600" strokeWidth={1.5} />
                  {/* Bounding Box Simulation */}
                  <motion.div
                    className="absolute inset-0 border-4 border-green-600 rounded-3xl m-10"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                  </motion.div>
                </motion.div>

                {/* Floating Shapes */}
                <div className="absolute top-10 right-10 w-40 h-40 bg-green-400/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-10 left-10 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '0.5s' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              {t('landing.featuresTitle')} <span className="gradient-text">CottonVision AI</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('landing.featuresSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: t('feature.realtime.title'),
                desc: t('feature.realtime.desc'),
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: Shield,
                title: t('feature.accuracy.title'),
                desc: t('feature.accuracy.desc'),
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: TrendingUp,
                title: t('feature.analysis.title'),
                desc: t('feature.analysis.desc'),
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Sparkles,
                title: t('feature.recommendations.title'),
                desc: t('feature.recommendations.desc'),
                color: 'from-purple-500 to-pink-500'
              }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="card-premium text-center group cursor-pointer"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-300`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-base text-gray-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-white to-green-50/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card-premium text-center max-w-4xl mx-auto"
          >
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              {t('landing.ctaTitle')}
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('landing.ctaSubtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button onClick={() => navigate('/live')} className="btn-primary text-lg px-10 py-4">
                {t('landing.ctaBtn')}
              </button>
              <button onClick={() => navigate('/about')} className="btn-outline text-lg px-10 py-4">
                {t('nav.about')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
