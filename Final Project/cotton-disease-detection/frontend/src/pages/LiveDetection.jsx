import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Camera, CameraOff, Play, Pause, Sparkles, Activity, Zap, AlertTriangle, Leaf } from 'lucide-react';
import { predictFrame } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { ConfidenceBar } from '../components/features/ConfidenceMeter';
import LanguageSwitcher from '../components/features/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const LiveDetection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const webcamRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [results, setResults] = useState(null);
  const [fps, setFps] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const capture = useCallback(async () => {
    if (!webcamRef.current || !isActive || isProcessing) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setIsProcessing(true);
    try {
      const blob = await fetch(imageSrc).then(r => r.blob());
      const startTime = performance.now();
      const response = await predictFrame(blob, 0.4); // Increased from 0.25 to 0.4 to reduce false positives

      const endTime = performance.now();

      const inferenceTime = endTime - startTime;
      setFps(Math.round(1000 / inferenceTime));
      setResults(response);

      // Auto-stop if diseases are detected
      if (response.detections && response.detections.length > 0) {
        setIsActive(false);
      }
    } catch (error) {
      console.error('Detection error:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [isActive, isProcessing]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(capture, 1000); // Capture every second
      return () => clearInterval(interval);
    }
  }, [isActive, capture]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Release any resources if needed, but avoid setting state here
    };
  }, []);

  const toggleCamera = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setResults(null);
      setFps(0);
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
                { key: 'Upload', path: '/upload', label: t('nav.upload'), active: false },
                { key: 'Live', path: '/live', label: t('nav.detect'), active: true },
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

      <div className="container-custom pt-4 pb-12 max-w-7xl mx-auto h-[calc(100vh-80px)] overflow-hidden flex flex-col">
        {/* Compact Header */}
        <div
          className="flex justify-between items-end mb-6 shrink-0"
        >
          <div>
            <h1 className="text-3xl font-black text-gray-900 leading-tight">
              {t('detect.title')}
            </h1>
            <p className="text-sm text-gray-500 max-w-lg mt-1">
              {t('detect.subtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-0">
          {/* Main View: Camera Feed */}
          <div className="lg:col-span-2 flex flex-col gap-4 h-full min-h-0">
            <div
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col grow min-h-0 relative"
            >
              {/* Camera Header - Absolute overlay to save space */}
              <div className="absolute top-0 left-0 right-0 z-10 px-4 py-3 bg-gradient-to-b from-black/60 to-transparent flex justify-between items-center text-white">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                  <span className="text-xs font-semibold tracking-wide uppercase opacity-90">
                    {isActive ? 'Active Mode' : 'Standby'}
                  </span>
                </div>
                {fps > 0 && (
                  <div className="flex items-center space-x-4 text-xs font-mono opacity-90">
                    <span>FPS: <strong>{fps}</strong></span>
                    <span>LATENCY: <strong>{results?.inference_time_ms?.toFixed(0)}MS</strong></span>
                  </div>
                )}
              </div>

              {/* Viewport - Takes available space */}
              <div className="relative grow bg-black flex items-center justify-center overflow-hidden group">
                {isActive ? (
                  <div className="w-full h-full relative">
                    <Webcam
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      className="w-full h-full object-contain"
                      videoConstraints={{ facingMode: "environment" }}
                    />

                    {/* Grid Overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                      <div className="w-full h-1/3 border-b border-white"></div>
                      <div className="w-full h-1/3 border-b border-white top-2/3 absolute"></div>
                      <div className="h-full w-1/3 border-r border-white left-0 top-0 absolute"></div>
                      <div className="h-full w-1/3 border-r border-white left-2/3 top-0 absolute"></div>
                    </div>

                    {/* Corners */}
                    <div className="absolute inset-4 pointer-events-none transition-all duration-500 group-hover:inset-8">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/80" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/80" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/80" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/80" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <CameraOff className="w-12 h-12 mb-3 opacity-30" />
                    <p className="text-xs font-medium tracking-widest uppercase opacity-50">{t('detect.cameraOff')}</p>
                  </div>
                )}
              </div>

              {/* Integrated Control Bar */}
              <div className="px-5 py-3 bg-white border-t border-gray-100 flex items-center justify-between shrink-0">

                <button
                  onClick={toggleCamera}
                  className={`
                      px-5 py-2 rounded-lg font-bold text-xs transition-all duration-200 flex items-center space-x-2 uppercase tracking-wide
                      ${isActive
                      ? 'bg-gray-100 text-red-600 hover:bg-red-50 hover:text-red-700'
                      : 'bg-black text-white hover:bg-gray-800 shadow-md transform hover:-translate-y-0.5'
                    }
                    `}
                >
                  {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isActive ? t('detect.stop') : "Start Analysis"}</span>
                </button>
              </div>
            </div>

            {/* Compact Tips - Only visible if space permits or on larger screens */}
            <div className="bg-white rounded-xl px-4 py-3 border border-gray-200 shadow-sm shrink-0 hidden xl:block">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center shrink-0">
                  <Sparkles className="w-3 h-3 mr-1.5" /> Tips
                </span>
                <div className="flex gap-4 overflow-x-auto no-scrollbar">
                  {[t('detect.tip1'), t('detect.tip2'), t('detect.tip3')].map((tip, idx) => (
                    <span key={idx} className="text-xs text-gray-600 whitespace-nowrap flex items-center">
                      <span className="w-1 h-1 rounded-full bg-gray-300 mr-2" />
                      {tip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Analysis Panel */}
          <div className="flex flex-col h-full min-h-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/80 flex items-center justify-between shrink-0">
                <h3 className="text-sm font-bold text-gray-800 flex items-center uppercase tracking-wide">
                  <Activity className="w-4 h-4 mr-2 text-green-600" />
                  Live Metrics
                </h3>
                <div className="flex space-x-1">
                  <span className="block w-2 h-2 rounded-full bg-red-400"></span>
                  <span className="block w-2 h-2 rounded-full bg-yellow-400"></span>
                  <span className="block w-2 h-2 rounded-full bg-green-400"></span>
                </div>
              </div>

              <div className="p-5 overflow-y-auto custom-scrollbar grow">
                <AnimatePresence mode="wait">
                  {isProcessing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-0 inset-x-0 h-1 bg-green-500/20 overflow-hidden"
                    >
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-1/3 h-full bg-green-500 blur-sm"
                      />
                    </motion.div>
                  )}
                  {results && results.detections ? (
                    <motion.div
                      key="data"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      {/* Severity Meter */}
                      <div>
                        <div className="flex justify-between items-end mb-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Severity Score</label>
                          <span className={`text-lg font-black ${!results.severity?.category || results.severity?.category === 'Healthy' ? 'text-green-600' : 'text-amber-600'
                            }`}>
                            {results.severity?.category || 'Low'}
                          </span>
                        </div>
                        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${results.severity?.percentage || 0}%` }}
                            className={`h-full absolute top-0 left-0 ${!results.severity?.category || results.severity?.category === 'Healthy' ? 'bg-green-500' : 'bg-amber-500'}`}
                          />
                          {/* Ticks */}
                          <div className="absolute inset-0 flex justify-between px-1">
                            <div className="w-px h-full bg-white/50"></div>
                            <div className="w-px h-full bg-white/50"></div>
                            <div className="w-px h-full bg-white/50"></div>
                          </div>
                        </div>
                        <div className="mt-1.5 flex justify-between text-[10px] font-mono text-gray-400">
                          <span>0%</span>
                          <span>{results.severity?.percentage?.toFixed(1)}% AFFECTED AREA</span>
                        </div>
                      </div>

                      {/* Warning Box */}
                      {results.filter_info && !results.filter_info.likely_contains_leaves && (
                        <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg flex gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                          <div className="text-xs text-amber-900 leading-relaxed">
                            <strong>Check Subject Coverage:</strong><br />
                            Image patterns suggest non-leaf objects. Please center a cotton leaf.
                          </div>
                        </div>
                      )}

                      {/* Detections List */}
                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Detected Issues</label>
                        {results.detections.length > 0 ? (
                          <div className="space-y-2">
                            {results.detections.map((det, idx) => (
                              <div key={idx} className="group bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg px-3 py-2 border border-gray-100">
                                <div className="flex justify-between items-center mb-1.5">
                                  <span className="font-semibold text-gray-700 text-xs truncate max-w-[140px]">{det.class_name}</span>
                                  <span className="text-[10px] font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-gray-200 text-gray-500 group-hover:text-green-600 group-hover:border-green-200">
                                    {(det.confidence * 100).toFixed(0)}%
                                  </span>
                                </div>
                                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gray-800 group-hover:bg-green-600 transition-colors rounded-full"
                                    style={{ width: `${det.confidence * 100}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                            <Leaf className="w-8 h-8 text-green-100 mx-auto mb-2" />
                            <p className="text-xs font-semibold text-gray-400">No diseases detected</p>
                            <p className="text-[10px] text-gray-300 mt-1">System is monitoring...</p>
                          </div>
                        )}
                      </div>

                      {/* Recommendations Section */}
                      {results.detections.length > 0 && (
                        <div className="pt-4 border-t border-gray-100">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                            <Sparkles className="w-3 h-3 mr-1.5" />
                            Recommended Treatments
                          </label>

                          {(() => {
                            const topDetection = results.detections.reduce((prev, current) =>
                              (prev.confidence > current.confidence) ? prev : current
                            );

                            const diseaseSlug = topDetection.class_name.toLowerCase().replace(/ /g, '_');
                            const recommendations = t(`recommendations.${diseaseSlug}`, { returnObjects: true });
                            const severityScore = results.severity?.percentage || 0;
                            const isSevere = severityScore > 40; // Threshold for displaying chemical treatments more prominently

                            if (!Array.isArray(recommendations)) return (
                              <p className="text-xs text-gray-400 italic">No specific recommendations available.</p>
                            );

                            return (
                              <div className="space-y-3">
                                {recommendations.map((rec, idx) => {
                                  // Filter logic: Hide chemical treatments for low severity unless explicitly requested (simple logic for now: show all but styled)
                                  // actually displaying all with badges is better for information

                                  let badgeColor = "bg-gray-100 text-gray-600";
                                  if (rec.type === 'chemical') badgeColor = "bg-rose-100 text-rose-700 border-rose-200";
                                  if (rec.type === 'organic') badgeColor = "bg-green-100 text-green-700 border-green-200";
                                  if (rec.type === 'preventive') badgeColor = "bg-blue-100 text-blue-700 border-blue-200";

                                  return (
                                    <div key={idx} className="bg-white border boundary-gray-100 rounded-lg p-3 hover:shadow-sm transition-shadow">
                                      <div className="flex items-start justify-between mb-1">
                                        <span className="text-xs font-semibold text-gray-800">{rec.title}</span>
                                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${badgeColor}`}>
                                          {rec.type}
                                        </span>
                                      </div>
                                      <p className="text-[11px] text-gray-500 leading-relaxed">{rec.desc}</p>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })()}
                        </div>
                      )}

                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-300 min-h-[200px]">
                      <div className="w-16 h-16 border-2 border-gray-100 rounded-full flex items-center justify-center mb-3">
                        <Activity className="w-6 h-6 stroke-1" />
                      </div>
                      <p className="text-xs font-medium uppercase tracking-widest opacity-60">Awaiting Data Stream</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default LiveDetection;
