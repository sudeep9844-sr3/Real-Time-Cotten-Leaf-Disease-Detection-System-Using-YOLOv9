import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
        { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
        { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    ];

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    const changeLanguage = (langCode) => {
        i18n.changeLanguage(langCode);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 text-gray-700 font-medium"
            >
                <Globe className="w-4 h-4 text-green-600" />
                <span className="hidden sm:inline">{currentLanguage.flag} {currentLanguage.name}</span>
                <span className="sm:hidden">{currentLanguage.flag}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                    <div className="p-2">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                className={`w-full px-4 py-3 text-left rounded-xl transition-all duration-200 flex items-center space-x-3 ${i18n.language === lang.code
                                        ? 'bg-green-50 text-green-700 font-semibold'
                                        : 'hover:bg-gray-50 text-gray-700'
                                    }`}
                            >
                                <span className="text-2xl">{lang.flag}</span>
                                <span>{lang.name}</span>
                                {i18n.language === lang.code && (
                                    <span className="ml-auto text-green-600">✓</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
