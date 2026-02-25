import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Activity, CheckCircle, AlertTriangle, Leaf, Zap, Upload, Video, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '../components/features/StatCard';
import { ConfidenceBar } from '../components/features/ConfidenceMeter';
import LanguageSwitcher from '../components/features/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const stats = [
    { title: t('dashboard.totalScans'), value: '1,234', icon: Activity, trend: 'up', trendValue: '+12%', color: 'green', delay: 0 },
    { title: t('dashboard.detected'), value: '456', icon: AlertTriangle, trend: 'up', trendValue: '+8%', color: 'orange', delay: 0.1 },
    { title: t('dashboard.accuracy'), value: '94.2%', icon: CheckCircle, trend: 'up', trendValue: '+2.1%', color: 'blue', delay: 0.2 },
    { title: t('dashboard.responseTime'), value: '28ms', icon: Zap, trend: 'down', trendValue: '-5ms', color: 'purple', delay: 0.3 },
  ];

  const recentScans = [
    { id: 1, disease: t('disease.bacterialBlight'), confidence: 92.5, severity: t('severity.moderate'), time: `2 ${t('time.min_ago')}`, color: 'orange' },
    { id: 2, disease: t('disease.healthy'), confidence: 98.1, severity: t('severity.healthy'), time: `5 ${t('time.min_ago')}`, color: 'green' },
    { id: 3, disease: t('disease.fusariumWilt'), confidence: 87.3, severity: t('severity.mild'), time: `12 ${t('time.min_ago')}`, color: 'yellow' },
    { id: 4, disease: t('disease.leafCurl'), confidence: 91.8, severity: t('severity.moderate'), time: `18 ${t('time.min_ago')}`, color: 'orange' },
  ];

  const diseaseDistribution = [
    { name: t('disease.bacterialBlight'), percentage: 35, color: 'from-red-500 to-rose-500' },
    { name: t('disease.fusariumWilt'), percentage: 28, color: 'from-orange-500 to-amber-500' },
    { name: t('disease.leafCurl'), percentage: 22, color: 'from-yellow-500 to-orange-500' },
    { name: t('disease.healthy'), percentage: 15, color: 'from-green-500 to-emerald-500' },
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
                { key: 'Home', path: '/', label: t('nav.home'), active: false },
                { key: 'Dashboard', path: '/dashboard', label: t('nav.dashboard'), active: true },
                { key: 'Upload', path: '/upload', label: t('nav.upload'), active: false },
                { key: 'Live', path: '/live', label: t('nav.detect'), active: false },
                { key: 'About', path: '/about', label: t('nav.about'), active: false }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => navigate(item.path)}
                  className={`text-base font-semibold transition-colors relative group ${item.active ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
                    }`}
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

      {/* Main Content */}
      <div className="container-custom section-padding-sm space-y-section">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900">
            <span className="gradient-text">{t('dashboard.title')}</span>
          </h1>
          <p className="text-lg text-gray-600">{t('dashboard.subtitle')}</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Recent Scans */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-premium"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{t('dashboard.recentScans')}</h2>
                <p className="text-sm text-gray-600">{t('dashboard.recentDesc')}</p>
              </div>

              <div className="space-y-4">
                {recentScans.map((scan, index) => (
                  <motion.div
                    key={scan.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${scan.color === 'green' ? 'from-green-500 to-emerald-500' :
                        scan.color === 'orange' ? 'from-orange-500 to-amber-500' :
                          'from-yellow-500 to-orange-500'
                        } rounded-xl flex items-center justify-center shadow-lg`}>
                        <Leaf className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{scan.disease}</p>
                        <p className="text-sm text-gray-500">{scan.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900 mb-1">{scan.confidence}%</p>
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${scan.severity === 'Healthy' ? 'bg-green-100 text-green-700' :
                        scan.severity === 'Mild' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                        {scan.severity}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Disease Distribution */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card-premium"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{t('dashboard.distribution')}</h2>
                <p className="text-sm text-gray-600">{t('dashboard.distributionDesc')}</p>
              </div>

              <div className="space-y-6">
                {diseaseDistribution.map((disease, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">{disease.name}</span>
                      <span className="text-sm font-bold text-gray-900">{disease.percentage}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${disease.percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                        className={`h-full bg-gradient-to-r ${disease.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-premium"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('landing.ctaTitle')}</h2>
            <p className="text-gray-600 mb-6">{t('landing.ctaSubtitle')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/live')}
                className="btn-primary flex items-center space-x-2"
              >
                <Video className="w-5 h-5" />
                <span>{t('nav.detect')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/upload')}
                className="btn-secondary flex items-center space-x-2"
              >
                <Upload className="w-5 h-5" />
                <span>{t('nav.upload')}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
