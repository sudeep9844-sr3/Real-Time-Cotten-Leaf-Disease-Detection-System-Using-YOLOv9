import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, X, Sparkles, ArrowRight, Leaf, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { predictImage } from '../services/api';
import LanguageSwitcher from '../components/features/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Upload = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageSelect = useCallback((file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    } else {
      setError('Please select a valid image file (JPG, PNG, etc.)');
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageSelect(file);
  }, [handleImageSelect]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e) => {
    const file = e.target.files[0];
    handleImageSelect(file);
  }, [handleImageSelect]);

  const handleClear = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);

    try {
      const response = await predictImage(selectedImage, 0.25);
      navigate('/results', {
        state: {
          results: response,
          imageUrl: imagePreview
        }
      });
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
                { key: 'Dashboard', path: '/dashboard', label: t('nav.dashboard'), active: false },
                { key: 'Upload', path: '/upload', label: t('nav.upload'), active: true },
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
      <div className="container-custom section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* Left Panel - Info */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900">
                  {t('upload.title')}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t('upload.subtitle')}
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t('feature.realtime.title')}</p>
                    <p className="text-sm text-gray-600">{t('upload.instantDesc')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t('feature.accuracy.title')}</p>
                    <p className="text-sm text-gray-600">{t('upload.yoloDesc')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t('feature.recommendations.title')}</p>
                    <p className="text-sm text-gray-600">{t('upload.treatmentDesc')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Upload */}
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="card-premium space-y-6"
              >
                {/* Upload Area */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${isDragging
                    ? 'border-green-500 bg-green-50'
                    : selectedImage
                      ? 'border-green-300 bg-green-50/50'
                      : 'border-gray-300 bg-gray-50 hover:border-green-400 hover:bg-green-50/30'
                    }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={loading}
                  />

                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-contain rounded-xl"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClear();
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <UploadIcon className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900 mb-1">
                          Drop your image here
                        </p>
                        <p className="text-sm text-gray-600">
                          or click to browse
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {t('upload.supports')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Analyze Button */}
                <AnimatePresence mode="wait">
                  {selectedImage && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onClick={handleAnalyze}
                      disabled={loading}
                      className="btn-primary w-full flex items-center justify-center space-x-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>{t('upload.analyzing')}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>{t('upload.analyze')}</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start space-x-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-900 text-sm">Error</p>
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
