import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
    en: {
        translation: {
            // Navbar
            "nav.home": "Home",
            "nav.dashboard": "Dashboard",
            "nav.upload": "Upload",
            "nav.detect": "Live Detection",
            "nav.about": "About",
            "nav.getStarted": "Get Started",

            // Landing Page
            "landing.badge": "AI-Powered Disease Detection",
            "landing.title": "Cotton Leaf Disease",
            "landing.titleHighlight": "Detection System",
            "landing.subtitle": "Protect your crops with advanced AI technology. Get instant, accurate disease detection and expert treatment recommendations.",
            "landing.uploadBtn": "Upload Image",
            "landing.liveBtn": "Live Detection",
            "landing.accuracy": "Accuracy",
            "landing.fps": "FPS",
            "landing.diseases": "Disease Classes",
            "landing.featuresTitle": "Powerful Features",
            "landing.featuresSubtitle": "Everything you need for accurate disease detection",
            "landing.ctaTitle": "Ready to Get Started?",
            "landing.ctaSubtitle": "Start detecting diseases now with our AI system",
            "landing.ctaBtn": "Start Detection",

            // Features
            "feature.realtime.title": "Real-Time Detection",
            "feature.realtime.desc": "Instant disease detection with >30 FPS performance for quick diagnosis",
            "feature.accuracy.title": "94% Accuracy",
            "feature.accuracy.desc": "State-of-the-art YOLOv9 AI model trained on thousands of cotton leaf images",
            "feature.analysis.title": "Smart Analysis",
            "feature.analysis.desc": "Automatic severity assessment and detailed treatment recommendations",
            "feature.recommendations.title": "Expert Recommendations",
            "feature.recommendations.desc": "Get professional treatment suggestions for each detected disease",

            // Upload Page
            "upload.title": "Upload Image",
            "upload.subtitle": "Upload a cotton leaf image for instant disease detection",
            "upload.dragDrop": "Drop your cotton leaf image here",
            "upload.browse": "browse",
            "upload.or": "or",
            "upload.supports": "Supports: JPG, PNG (Max 10MB)",
            "upload.analyze": "Analyze Image",
            "upload.analyzing": "Analyzing...",
            "upload.placeholder": "Upload to get started",
            "upload.placeholderDesc": "Select a cotton leaf image and click \"Analyze Image\" to detect diseases",
            "upload.error": "Error",

            // Dashboard
            "dashboard.title": "Dashboard",
            "dashboard.subtitle": "Overview of your cotton disease detection system",
            "dashboard.totalScans": "Total Scans",
            "dashboard.detected": "Diseases Detected",
            "dashboard.accuracy": "Accuracy Rate",
            "dashboard.responseTime": "Avg Response Time",
            "dashboard.recentScans": "Recent Scans",
            "dashboard.recentDesc": "Latest disease detection results",
            "dashboard.distribution": "Disease Distribution",
            "dashboard.distributionDesc": "Breakdown by type",

            // Detection Page
            "detect.title": "Live Detection",
            "detect.subtitle": "Real-time disease detection using your camera",
            "detect.start": "Start Detection",
            "detect.stop": "Stop Detection",
            "detect.cameraOff": "Camera is off",
            "detect.liveResults": "Live Results",
            "detect.waiting": "Waiting for detection...",
            "detect.startToSee": "Start detection to see results",
            "detect.tips": "Tips for Best Results",
            "detect.tip1": "Ensure good lighting",
            "detect.tip2": "Hold camera steady",
            "detect.tip3": "Focus on individual leaves",
            "detect.tip4": "Avoid shadows",

            // Results Page
            "results.title": "Detection Results",
            "results.complete": "Analysis complete",
            "results.detections": "detection(s) found",
            "results.analyzed": "Analyzed Image",
            "results.inference": "Inference",
            "results.severity": "Severity Assessment",
            "results.infected": "infected",
            "results.detected": "Detected Diseases",
            "results.confidence": "confidence",
            "results.recommendations": "Treatment Recommendations",
            "results.download": "Download Report",
            "results.uploadAnother": "Upload Another",

            // Disease Names
            "disease.bacterial_blight": "Bacterial Blight",
            "disease.fusarium_wilt": "Fusarium Wilt",
            "disease.leaf_curl_virus": "Leaf Curl Virus",
            "disease.healthy": "Healthy Leaf",

            // Severity Levels
            "severity.mild": "Mild",
            "severity.moderate": "Moderate",
            "severity.severe": "Severe",
            "severity.healthy": "Healthy",

            // Time Indicators
            "time.min_ago": "min ago",
            "time.hours_ago": "hours ago",
            "time.days_ago": "days ago",
            "time.just_now": "just now",

            // Disease Symptoms
            "symptom.bb1": "Angular water-soaked spots on leaves",
            "symptom.bb2": "Lesions turn brown to black",
            "symptom.bb3": "Premature leaf shedding",
            "symptom.fw1": "Yellowing of leaves",
            "symptom.fw2": "Wilting of plants",
            "symptom.fw3": "Brown discoloration of stem tissues",
            "symptom.lc1": "Upward curling of leaves",
            "symptom.lc2": "Thickening of veins",
            "symptom.lc3": "Stunted plant growth",

            // Upload Page Additional
            "upload.instantDesc": "Get analysis in seconds",
            "upload.yoloDesc": "YOLOv9 powered detection",
            "upload.treatmentDesc": "Treatment recommendations",

            // About Page
            "about.title": "About",
            "about.titleHighlight": "CottonVision AI",
            "about.subtitle": "AI-powered cotton leaf disease detection system for sustainable agriculture",
            "about.aiPowered": "AI-Powered Detection",
            "about.aiDesc": "Advanced YOLOv9 model trained on thousands of cotton leaf images for accurate disease identification.",
            "about.highAccuracy": "High Accuracy",
            "about.accuracyDesc": "Achieve over 90% accuracy in detecting and classifying cotton leaf diseases in real-time.",
            "about.realtime": "Real-Time Analysis",
            "about.realtimeDesc": "Get instant results with processing speeds exceeding 30 FPS on modern hardware.",
            "about.expert": "Expert Recommendations",
            "about.expertDesc": "Receive detailed treatment recommendations and preventive measures for detected diseases.",
            "about.diseases": "Detectable Diseases",
            "about.symptoms": "Common Symptoms:",

            // Diseases
            "disease.bacterialBlight": "Bacterial Blight",
            "disease.fusariumWilt": "Fusarium Wilt",
            "disease.leafCurl": "Leaf Curl Virus",
            "disease.healthy": "Healthy Leaf",

            // Severity
            "severity.healthy": "Healthy",
            "severity.mild": "Mild",
            "severity.moderate": "Moderate",
            "severity.severe": "Severe",
            "severity.no detection": "No Leaf Detected",

            // Footer
            "footer.tagline": "AI-powered cotton leaf disease detection for sustainable agriculture.",
            "footer.product": "Product",
            "footer.company": "Company",
            "footer.resources": "Resources",
            "footer.contact": "Contact",
            "footer.privacy": "Privacy",
            "footer.documentation": "Documentation",
            "footer.api": "API",
            "footer.support": "Support",
            "footer.copyright": "© 2024 CottonVision AI. All rights reserved.",

            // Recommendations - Structured by Disease
            "recommendations": {
                "bacterial_blight": [
                    {
                        "type": "chemical",
                        "title": "Copper-based Bactericide",
                        "desc": "Apply copper hydroxide or copper oxychloride at 2-3 g/L. Spray at 10-15 day intervals."
                    },
                    {
                        "type": "chemical",
                        "title": "Streptocycline",
                        "desc": "Mix 1g Streptocycline + 25g Copper oxychloride per 10L water. Effective against bacterial infections."
                    },
                    {
                        "type": "organic",
                        "title": "Neem Oil Spray",
                        "desc": "Mix 5ml neem oil per liter of water. Add 1ml liquid soap as emulsifier. Spray on affected areas."
                    },
                    {
                        "type": "organic",
                        "title": "Pseudomonas fluorescens",
                        "desc": "Biocontrol agent. Apply 10g/L as foliar spray. Helps suppress bacterial growth."
                    },
                    {
                        "type": "preventive",
                        "title": "Use Disease-Free Seeds",
                        "desc": "Always use certified, disease-free seeds from reliable sources."
                    },
                    {
                        "type": "preventive",
                        "title": "Crop Rotation",
                        "desc": "Practice 2-3 year crop rotation with non-host crops like cereals."
                    },
                    {
                        "type": "preventive",
                        "title": "Field Sanitation",
                        "desc": "Remove and burn infected plant debris. Maintain clean field conditions."
                    },
                    {
                        "type": "preventive",
                        "title": "Balanced Fertilization",
                        "desc": "Avoid excessive nitrogen. Maintain balanced NPK ratio."
                    }
                ],
                "fusarium_wilt": [
                    {
                        "type": "chemical",
                        "title": "Carbendazim",
                        "desc": "Soil drench with Carbendazim 50% WP at 2g/L. Apply at root zone."
                    },
                    {
                        "type": "chemical",
                        "title": "Thiophanate Methyl",
                        "desc": "Apply as soil drench at 1.5g/L. Effective systemic fungicide."
                    },
                    {
                        "type": "organic",
                        "title": "Trichoderma viride",
                        "desc": "Biocontrol fungus. Apply 5g/kg seed treatment or 5kg/ha soil application."
                    },
                    {
                        "type": "organic",
                        "title": "Neem Cake",
                        "desc": "Apply neem cake at 250kg/ha. Helps suppress soil-borne pathogens."
                    },
                    {
                        "type": "preventive",
                        "title": "Resistant Varieties",
                        "desc": "Plant wilt-resistant cotton varieties like Bt cotton hybrids."
                    },
                    {
                        "type": "preventive",
                        "title": "Soil Solarization",
                        "desc": "Cover soil with transparent plastic for 4-6 weeks in summer to kill pathogens."
                    },
                    {
                        "type": "preventive",
                        "title": "Proper Drainage",
                        "desc": "Ensure good drainage. Avoid waterlogging which favors Fusarium."
                    },
                    {
                        "type": "preventive",
                        "title": "pH Management",
                        "desc": "Maintain soil pH 6.5-7.5. Fusarium thrives in acidic soils."
                    }
                ],
                "leaf_curl_virus": [
                    {
                        "type": "chemical",
                        "title": "Imidacloprid",
                        "desc": "Control whitefly vector with Imidacloprid 17.8% SL at 0.5ml/L."
                    },
                    {
                        "type": "chemical",
                        "title": "Thiamethoxam",
                        "desc": "Systemic insecticide for whitefly control. Apply at 0.2g/L."
                    },
                    {
                        "type": "organic",
                        "title": "Neem Oil + Garlic Extract",
                        "desc": "Mix 5ml neem oil + 10ml garlic extract per liter. Repels whiteflies."
                    },
                    {
                        "type": "preventive",
                        "title": "Yellow Sticky Traps",
                        "desc": "Install yellow sticky traps at 15-20 traps/acre to monitor and trap whiteflies."
                    },
                    {
                        "type": "preventive",
                        "title": "Virus-Free Seedlings",
                        "desc": "Use certified virus-free planting material from authorized nurseries."
                    },
                    {
                        "type": "preventive",
                        "title": "Remove Infected Plants",
                        "desc": "Rogue out and destroy infected plants immediately to prevent spread."
                    },
                    {
                        "type": "preventive",
                        "title": "Barrier Crops",
                        "desc": "Plant maize or sorghum as barrier crops around cotton fields."
                    },
                    {
                        "type": "preventive",
                        "title": "Weed Management",
                        "desc": "Control weeds that serve as alternate hosts for whiteflies."
                    }
                ],
                "healthy_leaf": [
                    {
                        "type": "preventive",
                        "title": "Continue Good Practices",
                        "desc": "Maintain current agricultural practices. Regular monitoring is key."
                    },
                    {
                        "type": "preventive",
                        "title": "Preventive Sprays",
                        "desc": "Apply preventive fungicides during disease-prone seasons."
                    },
                    {
                        "type": "preventive",
                        "title": "Nutrient Management",
                        "desc": "Ensure balanced nutrition to maintain plant health and disease resistance."
                    }
                ]
            }
        }
    },
    hi: {
        translation: {
            // Navbar
            "nav.home": "होम",
            "nav.dashboard": "डैशबोर्ड",
            "nav.upload": "अपलोड",
            "nav.detect": "लाइव डिटेक्शन",
            "nav.about": "के बारे में",
            "nav.getStarted": "शुरू करें",

            // Landing Page
            "landing.badge": "एआई-संचालित रोग पहचान",
            "landing.title": "कपास की पत्ती रोग",
            "landing.titleHighlight": "पहचान प्रणाली",
            "landing.subtitle": "उन्नत एआई तकनीक से अपनी फसलों की रक्षा करें। तत्काल, सटीक रोग पहचान और विशेषज्ञ उपचार सिफारिशें प्राप्त करें।",
            "landing.uploadBtn": "छवि अपलोड करें",
            "landing.liveBtn": "लाइव डिटेक्शन",
            "landing.accuracy": "सटीकता",
            "landing.fps": "एफपीएस",
            "landing.diseases": "रोग वर्ग",
            "landing.featuresTitle": "शक्तिशाली सुविधाएं",
            "landing.featuresSubtitle": "सटीक रोग पहचान के लिए आपको जो कुछ भी चाहिए",
            "landing.ctaTitle": "शुरू करने के लिए तैयार हैं?",
            "landing.ctaSubtitle": "हमारी एआई प्रणाली के साथ अभी रोगों का पता लगाना शुरू करें",
            "landing.ctaBtn": "पहचान शुरू करें",

            // Features
            "feature.realtime.title": "रीयल-टाइम डिटेक्शन",
            "feature.realtime.desc": "त्वरित निदान के लिए >30 एफपीएस प्रदर्शन के साथ तत्काल रोग पहचान",
            "feature.accuracy.title": "94% सटीकता",
            "feature.accuracy.desc": "हजारों कपास की पत्ती छवियों पर प्रशिक्षित अत्याधुनिक YOLOv9 एआई मॉडल",
            "feature.analysis.title": "स्मार्ट विश्लेषण",
            "feature.analysis.desc": "स्वचालित गंभीरता मूल्यांकन और विस्तृत उपचार सिफारिशें",
            "feature.recommendations.title": "विशेषज्ञ सिफारिशें",
            "feature.recommendations.desc": "प्रत्येक पहचाने गए रोग के लिए पेशेवर उपचार सुझाव प्राप्त करें",

            // Upload Page
            "upload.title": "छवि अपलोड करें",
            "upload.subtitle": "तत्काल रोग पहचान के लिए कपास की पत्ती की छवि अपलोड करें",
            "upload.dragDrop": "अपनी कपास की पत्ती की छवि यहां छोड़ें",
            "upload.browse": "ब्राउज़ करें",
            "upload.or": "या",
            "upload.supports": "समर्थन: JPG, PNG (अधिकतम 10MB)",
            "upload.analyze": "छवि का विश्लेषण करें",
            "upload.analyzing": "विश्लेषण कर रहे हैं...",
            "upload.placeholder": "शुरू करने के लिए अपलोड करें",
            "upload.placeholderDesc": "कपास की पत्ती की छवि चुनें और रोगों का पता लगाने के लिए \"छवि का विश्लेषण करें\" पर क्लिक करें",
            "upload.error": "त्रुटि",

            // Dashboard
            "dashboard.title": "डैशबोर्ड",
            "dashboard.subtitle": "आपकी कपास रोग पहचान प्रणाली का अवलोकन",
            "dashboard.totalScans": "कुल स्कैन",
            "dashboard.detected": "पहचाने गए रोग",
            "dashboard.accuracy": "सटीकता दर",
            "dashboard.responseTime": "औसत प्रतिक्रिया समय",
            "dashboard.recentScans": "हाल के स्कैन",
            "dashboard.recentDesc": "नवीनतम रोग पहचान परिणाम",
            "dashboard.distribution": "रोग वितरण",
            "dashboard.distributionDesc": "प्रकार के अनुसार विभाजन",

            // Detection Page
            "detect.title": "लाइव डिटेक्शन",
            "detect.subtitle": "आपके कैमरे का उपयोग करके रीयल-टाइम रोग पहचान",
            "detect.start": "पहचान शुरू करें",
            "detect.stop": "पहचान बंद करें",
            "detect.cameraOff": "कैमरा बंद है",
            "detect.liveResults": "लाइव परिणाम",
            "detect.waiting": "पहचान की प्रतीक्षा में...",
            "detect.startToSee": "परिणाम देखने के लिए पहचान शुरू करें",
            "detect.tips": "सर्वोत्तम परिणामों के लिए सुझाव",
            "detect.tip1": "अच्छी रोशनी सुनिश्चित करें",
            "detect.tip2": "कैमरा स्थिर रखें",
            "detect.tip3": "व्यक्तिगत पत्तियों पर ध्यान दें",
            "detect.tip4": "छाया से बचें",

            // Results Page
            "results.title": "पहचान परिणाम",
            "results.complete": "विश्लेषण पूर्ण",
            "results.detections": "पहचान मिली",
            "results.analyzed": "विश्लेषित छवि",
            "results.inference": "अनुमान",
            "results.severity": "गंभीरता मूल्यांकन",
            "results.infected": "संक्रमित",
            "results.detected": "पहचाने गए रोग",
            "results.confidence": "विश्वास",
            "results.recommendations": "उपचार सिफारिशें",
            "results.download": "रिपोर्ट डाउनलोड करें",
            "results.uploadAnother": "एक और अपलोड करें",

            // About Page
            "about.title": "के बारे में",
            "about.titleHighlight": "कॉटनविज़न एआई",
            "about.subtitle": "सतत कृषि के लिए एआई-संचालित कपास पत्ती रोग पहचान प्रणाली",
            "about.aiPowered": "एआई-संचालित पहचान",
            "about.aiDesc": "सटीक रोग पहचान के लिए हजारों कपास पत्ती छवियों पर प्रशिक्षित उन्नत YOLOv9 मॉडल।",
            "about.highAccuracy": "उच्च सटीकता",
            "about.accuracyDesc": "रीयल-टाइम में कपास पत्ती रोगों का पता लगाने और वर्गीकृत करने में 90% से अधिक सटीकता प्राप्त करें।",
            "about.realtime": "रीयल-टाइम विश्लेषण",
            "about.realtimeDesc": "आधुनिक हार्डवेयर पर 30 एफपीएस से अधिक प्रसंस्करण गति के साथ तत्काल परिणाम प्राप्त करें।",
            "about.expert": "विशेषज्ञ सिफारिशें",
            "about.expertDesc": "पहचाने गए रोगों के लिए विस्तृत उपचार सिफारिशें और निवारक उपाय प्राप्त करें।",
            "about.diseases": "पहचान योग्य रोग",
            "about.symptoms": "सामान्य लक्षण:",

            // Diseases
            "disease.bacterialBlight": "बैक्टीरियल ब्लाइट",
            "disease.fusariumWilt": "फ्यूजेरियम विल्ट",
            "disease.leafCurl": "पत्ती कर्ल वायरस",
            "disease.healthy": "स्वस्थ पत्ती",

            // Severity
            "severity.healthy": "स्वस्थ",
            "severity.mild": "हल्का",
            "severity.moderate": "मध्यम",
            "severity.severe": "गंभीर",
            "severity.no detection": "कोई पत्ता नहीं मिला",

            // Footer
            "footer.tagline": "सतत कृषि के लिए एआई-संचालित कपास पत्ती रोग पहचान।",
            "footer.product": "उत्पाद",
            "footer.company": "कंपनी",
            "footer.resources": "संसाधन",
            "footer.contact": "संपर्क",
            "footer.privacy": "गोपनीयता",
            "footer.documentation": "दस्तावेज़ीकरण",
            "footer.api": "एपीआई",
            "footer.support": "सहायता",
            "footer.copyright": "© 2024 कॉटनविज़न एआई। सर्वाधिकार सुरक्षित।",

            // Recommendations - Structured by Disease
            "recommendations": {
                "bacterial_blight": [
                    {
                        "type": "chemical",
                        "title": "कॉपर-आधारित जीवाणुनाशक",
                        "desc": "2-3 ग्राम/लीटर कॉपर हाइड्रॉक्साइड या कॉपर ऑक्सीक्लोराइड का प्रयोग करें। 10-15 दिनों के अंतराल पर छिड़काव करें।"
                    },
                    {
                        "type": "chemical",
                        "title": "स्ट्रेप्टोसाइक्लिन",
                        "desc": "1 ग्राम स्ट्रेप्टोसाइक्लिन + 25 ग्राम कॉपर ऑक्सीक्लोराइड प्रति 10 लीटर पानी में मिलाएं। जीवाणु संक्रमण के खिलाफ प्रभावी।"
                    },
                    {
                        "type": "organic",
                        "title": "नीम तेल स्प्रे",
                        "desc": "5 मिली नीम का तेल प्रति लीटर पानी में मिलाएं। पायसीकारक के रूप में 1 मिली तरल साबुन जोड़ें। प्रभावित क्षेत्रों पर स्प्रे करें।"
                    },
                    {
                        "type": "organic",
                        "title": "स्यूडोमोनास फ्लोरेसेंस",
                        "desc": "जैव नियंत्रण एजेंट। पर्णीय स्प्रे के रूप में 10 ग्राम/लीटर लागू करें। जीवाणु वृद्धि को दबाने में मदद करता है।"
                    },
                    {
                        "type": "preventive",
                        "title": "रोग मुक्त बीजों का प्रयोग करें",
                        "desc": "हमेशा विश्वसनीय स्रोतों से प्रमाणित, रोग मुक्त बीजों का उपयोग करें।"
                    },
                    {
                        "type": "preventive",
                        "title": "फसल चक्र",
                        "desc": "अनाज जैसी गैर-मेजबान फसलों के साथ 2-3 साल के फसल चक्र का अभ्यास करें।"
                    },
                    {
                        "type": "preventive",
                        "title": "खेत की स्वच्छता",
                        "desc": "संक्रमित पौधों के मलबे को हटा दें और जला दें। खेत की स्थिति साफ रखें।"
                    },
                    {
                        "type": "preventive",
                        "title": "संतुलित उर्वरक",
                        "desc": "अत्यधिक नाइट्रोजन से बचें। संतुलित एनपीके अनुपात बनाए रखें।"
                    }
                ],
                "fusarium_wilt": [
                    {
                        "type": "chemical",
                        "title": "कार्बेंडाजिम",
                        "desc": "2 ग्राम/लीटर कार्बेंडाजिम 50% डब्ल्यूपी के साथ मिट्टी को गीला करें। जड़ क्षेत्र में लागू करें।"
                    },
                    {
                        "type": "chemical",
                        "title": "थियोफेनेट मिथाइल",
                        "desc": "1.5 ग्राम/लीटर पर मिट्टी के ड्रेन्च के रूप में लागू करें। प्रभावी प्रणालीगत कवकनाशी।"
                    },
                    {
                        "type": "organic",
                        "title": "ट्राइकोडर्मा विरिडे",
                        "desc": "जैव नियंत्रण कवक। 5 ग्राम/किग्रा बीज उपचार या 5 किग्रा/हेक्टेयर मिट्टी आवेदन लागू करें।"
                    },
                    {
                        "type": "organic",
                        "title": "नीम की खली",
                        "desc": "250 किग्रा/हेक्टेयर पर नीम की खली लागू करें। मिट्टी से होने वाले रोगजनकों को दबाने में मदद करता है।"
                    },
                    {
                        "type": "preventive",
                        "title": "प्रतिरोधी किस्में",
                        "desc": "बीटी कपास संकर जैसी विल्ट-प्रतिरोधी कपास की किस्में लगाएं।"
                    },
                    {
                        "type": "preventive",
                        "title": "मृदा सौरकरण",
                        "desc": "रोगजनकों को मारने के लिए गर्मियों में 4-6 सप्ताह के लिए पारदर्शी प्लास्टिक के साथ मिट्टी को कवर करें।"
                    },
                    {
                        "type": "preventive",
                        "title": "उचित जल निकासी",
                        "desc": "अच्छी जल निकासी सुनिश्चित करें। जलभराव से बचें जो फ्यूजेरियम के पक्ष में है।"
                    },
                    {
                        "type": "preventive",
                        "title": "पीएच प्रबंधन",
                        "desc": "मिट्टी का पीएच 6.5-7.5 बनाए रखें। फ्यूजेरियम अम्लीय मिट्टी में पनपता है।"
                    }
                ],
                "leaf_curl_virus": [
                    {
                        "type": "chemical",
                        "title": "इमिडाक्लोप्रिड",
                        "desc": "0.5 मिली/लीटर पर इमिडाक्लोप्रिड 17.8% एसएल के साथ सफेद मक्खी वेक्टर को नियंत्रित करें।"
                    },
                    {
                        "type": "chemical",
                        "title": "थियामेथोक्साम",
                        "desc": "सफेद मक्खी नियंत्रण के लिए प्रणालीगत कीटनाशक। 0.2 ग्राम/लीटर पर लागू करें।"
                    },
                    {
                        "type": "organic",
                        "title": "नीम तेल + लहसुन का अर्क",
                        "desc": "5 मिली नीम का तेल + 10 मिली लहसुन का अर्क प्रति लीटर मिलाएं। सफेद मक्खियों को दूर भगाता है।"
                    },
                    {
                        "type": "preventive",
                        "title": "पीले चिपचिपे जाल",
                        "desc": "सफेद मक्खियों की निगरानी और फंसाने के लिए 15-20 जाल/एकड़ पर पीले चिपचिपे जाल स्थापित करें।"
                    },
                    {
                        "type": "preventive",
                        "title": "वायरस मुक्त पौधे",
                        "desc": "अधिकृत नर्सरी से प्रमाणित वायरस मुक्त रोपण सामग्री का उपयोग करें।"
                    },
                    {
                        "type": "preventive",
                        "title": "संक्रमित पौधों को हटा दें",
                        "desc": "फैलाव को रोकने के लिए संक्रमित पौधों को तुरंत उखाड़ फेंके और नष्ट कर दें।"
                    },
                    {
                        "type": "preventive",
                        "title": "अवरोधक फसलें",
                        "desc": "कपास के खेतों के चारों ओर मक्का या ज्वार को अवरोधक फसलों के रूप में लगाएं।"
                    },
                    {
                        "type": "preventive",
                        "title": "खरपतवार प्रबंधन",
                        "desc": "खरपतवारों को नियंत्रित करें जो सफेद मक्खियों के लिए वैकल्पिक मेजबान के रूप में कार्य करते हैं।"
                    }
                ],
                "healthy_leaf": [
                    {
                        "type": "preventive",
                        "title": "अच्छी प्रथाएं जारी रखें",
                        "desc": "वर्तमान कृषि प्रथाओं को बनाए रखें। नियमित निगरानी महत्वपूर्ण है।"
                    },
                    {
                        "type": "preventive",
                        "title": "निवारक स्प्रे",
                        "desc": "रोग-प्रवण मौसमों के दौरान निवारक कवकनाशी लागू करें।"
                    },
                    {
                        "type": "preventive",
                        "title": "पोषक तत्व प्रबंधन",
                        "desc": "पौधों के स्वास्थ्य और रोग प्रतिरोध को बनाए रखने के लिए संतुलित पोषण सुनिश्चित करें।"
                    }
                ]
            }
        }
    },
    te: {
        translation: {
            // Navbar
            "nav.home": "హోమ్",
            "nav.dashboard": "డాష్‌బోర్డ్",
            "nav.upload": "అప్‌లోడ్",
            "nav.detect": "లైవ్ డిటెక్షన్",
            "nav.about": "గురించి",
            "nav.getStarted": "ప్రారంభించండి",

            // Landing Page
            "landing.badge": "AI-ఆధారిత వ్యాధి గుర్తింపు",
            "landing.title": "పత్తి ఆకు వ్యాధి",
            "landing.titleHighlight": "గుర్తింపు వ్యవస్థ",
            "landing.subtitle": "అధునాతన AI సాంకేతికతతో మీ పంటలను రక్షించండి. తక్షణ, ఖచ్చితమైన వ్యాధి గుర్తింపు మరియు నిపుణుల చికిత్స సిఫార్సులను పొందండి।",
            "landing.uploadBtn": "చిత్రాన్ని అప్‌లోడ్ చేయండి",
            "landing.liveBtn": "లైవ్ డిటెక్షన్",
            "landing.accuracy": "ఖచ్చితత్వం",
            "landing.fps": "FPS",
            "landing.diseases": "వ్యాధి తరగతులు",
            "landing.featuresTitle": "శక్తివంతమైన లక్షణాలు",
            "landing.featuresSubtitle": "ఖచ్చితమైన వ్యాధి గుర్తింపు కోసం మీకు అవసరమైనవన్నీ",
            "landing.ctaTitle": "ప్రారంభించడానికి సిద్ధంగా ఉన్నారా?",
            "landing.ctaSubtitle": "మా AI వ్యవస్థతో ఇప్పుడే వ్యాధులను గుర్తించడం ప్రారంభించండి",
            "landing.ctaBtn": "గుర్తింపు ప్రారంభించండి",

            // Features
            "feature.realtime.title": "రియల్-టైమ్ డిటెక్షన్",
            "feature.realtime.desc": "త్వరిత నిర్ధారణ కోసం >30 FPS పనితీరుతో తక్షణ వ్యాధి గుర్తింపు",
            "feature.accuracy.title": "94% ఖచ్చితత్వం",
            "feature.accuracy.desc": "వేలాది పత్తి ఆకు చిత్రాలపై శిక్షణ పొందిన అత్యాధునిక YOLOv9 AI మోడల్",
            "feature.analysis.title": "స్మార్ట్ విశ్లేషణ",
            "feature.analysis.desc": "స్వయంచాలక తీవ్రత అంచనా మరియు వివరణాత్మక చికిత్స సిఫార్సులు",
            "feature.recommendations.title": "నిపుణుల సిఫార్సులు",
            "feature.recommendations.desc": "ప్రతి గుర్తించబడిన వ్యాధికి వృత్తిపరమైన చికిత్స సూచనలను పొందండి",

            // Upload Page
            "upload.title": "చిత్రాన్ని అప్‌లోడ్ చేయండి",
            "upload.subtitle": "తక్షణ వ్యాధి గుర్తింపు కోసం పత్తి ఆకు చిత్రాన్ని అప్‌లోడ్ చేయండి",
            "upload.dragDrop": "మీ పత్తి ఆకు చిత్రాన్ని ఇక్కడ వదలండి",
            "upload.browse": "బ్రౌజ్ చేయండి",
            "upload.or": "లేదా",
            "upload.supports": "మద్దతు: JPG, PNG (గరిష్టంగా 10MB)",
            "upload.analyze": "చిత్రాన్ని విశ్లేషించండి",
            "upload.analyzing": "విశ్లేషిస్తోంది...",
            "upload.placeholder": "ప్రారంభించడానికి అప్‌లోడ్ చేయండి",
            "upload.placeholderDesc": "పత్తి ఆకు చిత్రాన్ని ఎంచుకోండి మరియు వ్యాధులను గుర్తించడానికి \"చిత్రాన్ని విశ్లేషించండి\" క్లిక్ చేయండి",
            "upload.error": "లోపం",

            // Dashboard
            "dashboard.title": "డాష్‌బోర్డ్",
            "dashboard.subtitle": "మీ పత్తి వ్యాధి గుర్తింపు వ్యవస్థ యొక్క అవలోకనం",
            "dashboard.totalScans": "మొత్తం స్కాన్‌లు",
            "dashboard.detected": "గుర్తించబడిన వ్యాధులు",
            "dashboard.accuracy": "ఖచ్చితత్వ రేటు",
            "dashboard.responseTime": "సగటు ప్రతిస్పందన సమయం",
            "dashboard.recentScans": "ఇటీవలి స్కాన్‌లు",
            "dashboard.recentDesc": "తాజా వ్యాధి గుర్తింపు ఫలితాలు",
            "dashboard.distribution": "వ్యాధి పంపిణీ",
            "dashboard.distributionDesc": "రకం ద్వారా విభజన",

            // Detection Page
            "detect.title": "లైవ్ డిటెక్షన్",
            "detect.subtitle": "మీ కెమెరాను ఉపయోగించి రియల్-టైమ్ వ్యాధి గుర్తింపు",
            "detect.start": "గుర్తింపు ప్రారంభించండి",
            "detect.stop": "గుర్తింపు ఆపండి",
            "detect.cameraOff": "కెమెరా ఆఫ్ చేయబడింది",
            "detect.liveResults": "లైవ్ ఫలితాలు",
            "detect.waiting": "గుర్తింపు కోసం వేచి ఉంది...",
            "detect.startToSee": "ఫలితాలను చూడటానికి గుర్తింపు ప్రారంభించండి",
            "detect.tips": "ఉత్తమ ఫలితాల కోసం చిట్కాలు",
            "detect.tip1": "మంచి వెలుతురును నిర్ధారించండి",
            "detect.tip2": "కెమెరాను స్థిరంగా ఉంచండి",
            "detect.tip3": "వ్యక్తిగత ఆకులపై దృష్టి పెట్టండి",
            "detect.tip4": "నీడలను నివారించండి",

            // Results Page
            "results.title": "గుర్తింపు ఫలితాలు",
            "results.complete": "విశ్లేషణ పూర్తయింది",
            "results.detections": "గుర్తింపులు కనుగొనబడ్డాయి",
            "results.analyzed": "విశ్లేషించబడిన చిత్రం",
            "results.inference": "అనుమానం",
            "results.severity": "తీవ్రత అంచనా",
            "results.infected": "సోకింది",
            "results.detected": "గుర్తించబడిన వ్యాధులు",
            "results.confidence": "విశ్వాసం",
            "results.recommendations": "చికిత్స సిఫార్సులు",
            "results.download": "నివేదికను డౌన్‌లోడ్ చేయండి",
            "results.uploadAnother": "మరొకటి అప్‌లోడ్ చేయండి",

            // About Page
            "about.title": "గురించి",
            "about.titleHighlight": "కాటన్‌విజన్ AI",
            "about.subtitle": "స్థిరమైన వ్యవసాయం కోసం AI-ఆధారిత పత్తి ఆకు వ్యాధి గుర్తింపు వ్యవస్థ",
            "about.aiPowered": "AI-ఆధారిత గుర్తింపు",
            "about.aiDesc": "ఖచ్చితమైన వ్యాధి గుర్తింపు కోసం వేలాది పత్తి ఆకు చిత్రాలపై శిక్షణ పొందిన అధునాతన YOLOv9 మోడల్।",
            "about.highAccuracy": "అధిక ఖచ్చితత్వం",
            "about.accuracyDesc": "రియల్-టైమ్‌లో పత్తి ఆకు వ్యాధులను గుర్తించడం మరియు వర్గీకరించడంలో 90% కంటే ఎక్కువ ఖచ్చితత్వాన్ని సాధించండి।",
            "about.realtime": "రియల్-టైమ్ విశ్లేషణ",
            "about.realtimeDesc": "ఆధునిక హార్డ్‌వేర్‌లో 30 FPS కంటే ఎక్కువ ప్రాసెసింగ్ వేగాలతో తక్షణ ఫలితాలను పొందండి।",
            "about.expert": "నిపుణుల సిఫార్సులు",
            "about.expertDesc": "గుర్తించబడిన వ్యాధుల కోసం వివరణాత్మక చికిత్స సిఫార్సులు మరియు నివారణ చర్యలను పొందండి।",
            "about.diseases": "గుర్తించదగిన వ్యాధులు",
            "about.symptoms": "సాధారణ లక్షణాలు:",

            // Diseases
            "disease.bacterialBlight": "బ్యాక్టీరియల్ బ్లైట్",
            "disease.fusariumWilt": "ఫ్యూజేరియం విల్ట్",
            "disease.leafCurl": "ఆకు కర్ల్ వైరస్",
            "disease.healthy": "ఆరోగ్యకరమైన ఆకు",

            // Severity
            "severity.healthy": "ఆరోగ్యకరమైన",
            "severity.mild": "తేలికపాటి",
            "severity.moderate": "మితమైన",
            "severity.severe": "తీవ్రమైన",
            "severity.no detection": "ఆకు కనుగొనబడలేదు",

            // Footer
            "footer.tagline": "స్థిరమైన వ్యవసాయం కోసం AI-ఆధారిత పత్తి ఆకు వ్యాధి గుర్తింపు।",
            "footer.product": "ఉత్పత్తి",
            "footer.company": "కంపెనీ",
            "footer.resources": "వనరులు",
            "footer.contact": "సంప్రదించండి",
            "footer.privacy": "గోప్యత",
            "footer.documentation": "డాక్యుమెంటేషన్",
            "footer.api": "API",
            "footer.support": "మద్దతు",
            "footer.copyright": "© 2024 కాటన్‌విజన్ AI। అన్ని హక్కులు రక్షించబడ్డాయి।",

            // Recommendations - Structured by Disease
            "recommendations": {
                "bacterial_blight": [
                    {
                        "type": "chemical",
                        "title": "రాగి ఆధారిత బాక్టీరిసైడ్",
                        "desc": "2-3 గ్రా/లీటర్ నీటిలో కాపర్ హైడ్రాక్సైడ్ లేదా కాపర్ ఆక్సిక్లోరైడ్ వేయండి. 10-15 రోజుల వ్యవధిలో పిచికారీ చేయండి."
                    },
                    {
                        "type": "chemical",
                        "title": "స్ట్రెప్టోసైక్లిన్",
                        "desc": "10 లీటర్ల నీటికి 1 గ్రా స్ట్రెప్టోసైక్లిన్ + 25 గ్రా కాపర్ ఆక్సిక్లోరైడ్ కలపండి. బాక్టీరియా ఇన్ఫెక్షన్లకు వ్యతిరేకంగా ప్రభావవంతంగా ఉంటుంది."
                    },
                    {
                        "type": "organic",
                        "title": "వేప నూనె స్ప్రే",
                        "desc": "లీటరు నీటికి 5 మి.లీ వేప నూనె కలపండి. ఎమల్సిఫైయర్‌గా 1 మి.లీ ద్రవ సబ్బును జోడించండి. ప్రభావిత ప్రాంతాలపై పిచికారీ చేయండి."
                    },
                    {
                        "type": "organic",
                        "title": "సూడోమోనాస్ ఫ్లోరోసెన్స్",
                        "desc": "బయోకంట్రోల్ ఏజెంట్. ఫోలియర్ స్ప్రేగా 10 గ్రా/లీటర్ వర్తించండి. బాక్టీరియా పెరుగుదలను అణిచివేసేందుకు సహాయపడుతుంది."
                    },
                    {
                        "type": "preventive",
                        "title": "వ్యాధి లేని విత్తనాలను వాడండి",
                        "desc": "ఎల్లప్పుడూ నమ్మకమైన వనరుల నుండి ధృవీకరించబడిన, వ్యాధి లేని విత్తనాలను ఉపయోగించండి."
                    },
                    {
                        "type": "preventive",
                        "title": "పంట మార్పిడి",
                        "desc": "తృణధాన్యాలు వంటి నాన్-హోస్ట్ పంటలతో 2-3 సంవత్సరాల పంట మార్పిడిని పాటించండి."
                    },
                    {
                        "type": "preventive",
                        "title": "క్షేత్ర పారిశుధ్యం",
                        "desc": "వ్యాధి సోకిన మొక్కల చెత్తను తొలగించి కాల్చండి. పొలం పరిస్థితులను శుభ్రంగా ఉంచండి."
                    },
                    {
                        "type": "preventive",
                        "title": "సమతుల్య ఎరువులు",
                        "desc": "అధిక నత్రజనిని నివారించండి. సమతుల్య NPK నిష్పత్తిని నిర్వహించండి."
                    }
                ],
                "fusarium_wilt": [
                    {
                        "type": "chemical",
                        "title": "కార్బెండాజిమ్",
                        "desc": "2 గ్రా/లీటర్ కార్బెండాజిమ్ 50% WP తో మట్టిని తడపండి. వేరు మండలం వద్ద వర్తించండి."
                    },
                    {
                        "type": "chemical",
                        "title": "థియోఫానేట్ మిథైల్",
                        "desc": "1.5 గ్రా/లీటర్ వద్ద మట్టి డ్రెంచ్‌గా వర్తించండి. సమర్థవంతమైన దైహిక శిలీంద్రనాశని."
                    },
                    {
                        "type": "organic",
                        "title": "ట్రైకోడెర్మా విరిడే",
                        "desc": "బయోకంట్రోల్ ఫంగస్. 5 గ్రా/కిలో విత్తన శుద్ధి లేదా 5 కిలో/హెక్టారు మట్టి అప్లికేషన్ వర్తించండి."
                    },
                    {
                        "type": "organic",
                        "title": "వేప పిండి",
                        "desc": "250 కిలో/హెక్టారుకు వేప పిండిని వర్తించండి. మట్టి ద్వారా సంక్రమించే వ్యాధికారకాలను అణిచివేసేందుకు సహాయపడుతుంది."
                    },
                    {
                        "type": "preventive",
                        "title": "నిరోధక రకాలు",
                        "desc": "Bt పత్తి హైబ్రిడ్ల వంటి విల్ట్-నిరోధక పత్తి రకాలను నాటండి."
                    },
                    {
                        "type": "preventive",
                        "title": "మృదా సోలరైజేషన్",
                        "desc": "వ్యాధికారకాలను చంపడానికి వేసవిలో 4-6 వారాల పాటు పారదర్శక ప్లాస్టిక్‌తో మట్టిని కప్పండి."
                    },
                    {
                        "type": "preventive",
                        "title": "సరైన డ్రైనేజీ",
                        "desc": "మంచి డ్రైనేజీని నిర్ధారించండి. ఫ్యూజేరియంకు అనుకూలమైన నీటి నిల్వను నివారించండి."
                    },
                    {
                        "type": "preventive",
                        "title": "pH నిర్వహణ",
                        "desc": "మట్టి pH 6.5-7.5 నిర్వహించండి. ఫ్యూజేరియం ఆమ్ల నేలల్లో వృద్ధి చెందుతుంది."
                    }
                ],
                "leaf_curl_virus": [
                    {
                        "type": "chemical",
                        "title": "ఇమిడాక్లోప్రిడ్",
                        "desc": "0.5 మి.లీ/లీటర్ వద్ద ఇమిడాక్లోప్రిడ్ 17.8% SL తో తెల్ల దోమ వెక్టర్‌ను నియంత్రించండి."
                    },
                    {
                        "type": "chemical",
                        "title": "థియామెథోక్సామ్",
                        "desc": "తెల్ల దోమ నియంత్రణ కోసం దైహిక పురుగుమందు. 0.2 గ్రా/లీటర్ వద్ద వర్తించండి."
                    },
                    {
                        "type": "organic",
                        "title": "వేప నూనె + వెల్లుల్లి సారం",
                        "desc": "లీటరుకు 5 మి.లీ వేప నూనె + 10 మి.లీ వెల్లుల్లి సారం కలపండి. తెల్ల దోమలను తిప్పికొడుతుంది."
                    },
                    {
                        "type": "preventive",
                        "title": "పసుపు జిగురు ఉచ్చులు",
                        "desc": "తెల్ల దోమలను పర్యవేక్షించడానికి మరియు పట్టుకోవడానికి ఎకరానికి 15-20 ఉచ్చుల వద్ద పసుపు జిగురు ఉచ్చులను వ్యవస్థాపించండి."
                    },
                    {
                        "type": "preventive",
                        "title": "వైరస్ లేని మొక్కలు",
                        "desc": "అధీకృత నర్సరీల నుండి ధృవీకరించబడిన వైరస్ లేని నాటడం పదార్థాన్ని ఉపయోగించండి."
                    },
                    {
                        "type": "preventive",
                        "title": "వ్యాధి సోకిన మొక్కలను తొలగించండి",
                        "desc": "వ్యాప్తిని నివారించడానికి వ్యాధి సోకిన మొక్కలను వెంటనే పీకి నాశనం చేయండి."
                    },
                    {
                        "type": "preventive",
                        "title": "అవరోధ పంటలు",
                        "desc": "పత్తి పొలాల చుట్టూ మొక్కజొన్న లేదా జొన్నను అవరోధ పంటలుగా నాటండి."
                    },
                    {
                        "type": "preventive",
                        "title": "కలుపు నిర్వహణ",
                        "desc": "తెల్ల దోమలకు ప్రత్యామ్నాయ హోస్ట్‌లుగా పనిచేసే కలుపు మొక్కలను నియంత్రించండి."
                    }
                ],
                "healthy_leaf": [
                    {
                        "type": "preventive",
                        "title": "మంచి పద్ధతులను కొనసాగించండి",
                        "desc": "ప్రస్తుత వ్యవసాయ పద్ధతులను నిర్వహించండి. సాధారణ పర్యవేక్షణ కీలకం."
                    },
                    {
                        "type": "preventive",
                        "title": "నివారణ స్ప్రేలు",
                        "desc": "వ్యాధి వచ్చే సీజన్లలో నివారణ శిలీంద్రనాశకాలను వర్తించండి."
                    },
                    {
                        "type": "preventive",
                        "title": "పోషక నిర్వహణ",
                        "desc": "మొక్కల ఆరోగ్యం మరియు వ్యాధి నిరోధకతను నిర్వహించడానికి సమతుల్య పోషణను నిర్ధారించండి."
                    }
                ]
            }
        }
    },
    kn: {
        translation: {
            // Navbar
            "nav.home": "ಮುಖಪುಟ",
            "nav.dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
            "nav.upload": "ಅಪ್‌ಲೋಡ್",
            "nav.detect": "ಲೈವ್ ಡಿಟೆಕ್ಷನ್",
            "nav.about": "ಕುರಿತು",
            "nav.getStarted": "ಪ್ರಾರಂಭಿಸಿ",

            // Landing Page
            "landing.badge": "AI-ಚಾಲಿತ ರೋಗ ಪತ್ತೆ",
            "landing.title": "ಹತ್ತಿ ಎಲೆ ರೋಗ",
            "landing.titleHighlight": "ಪತ್ತೆ ವ್ಯವಸ್ಥೆ",
            "landing.subtitle": "ಸುಧಾರಿತ AI ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸಿ. ತ್ವರಿತ, ನಿಖರವಾದ ರೋಗ ಪತ್ತೆ ಮತ್ತು ತಜ್ಞರ ಚಿಕಿತ್ಸಾ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ.",
            "landing.uploadBtn": "ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
            "landing.liveBtn": "ಲೈವ್ ಡಿಟೆಕ್ಷನ್",
            "landing.accuracy": "ನಿಖರತೆ",
            "landing.fps": "FPS",
            "landing.diseases": "ರೋಗ ವರ್ಗಗಳು",
            "landing.featuresTitle": "ಶಕ್ತಿಯುತ ವೈಶಿಷ್ಟ್ಯಗಳು",
            "landing.featuresSubtitle": "ನಿಖರವಾದ ರೋಗ ಪತ್ತೆಗೆ ನಿಮಗೆ ಬೇಕಾದ ಎಲ್ಲವೂ",
            "landing.ctaTitle": "ಪ್ರಾರಂಭಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?",
            "landing.ctaSubtitle": "ನಮ್ಮ AI ವ್ಯವಸ್ಥೆಯೊಂದಿಗೆ ಈಗಲೇ ರೋಗಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಪ್ರಾರಂಭಿಸಿ",
            "landing.ctaBtn": "ಪತ್ತೆ ಪ್ರಾರಂಭಿಸಿ",

            // Features
            "feature.realtime.title": "ರಿಯಲ್-ಟೈಮ್ ಡಿಟೆಕ್ಷನ್",
            "feature.realtime.desc": "ತ್ವರಿತ ರೋಗನಿರ್ಣಯಕ್ಕಾಗಿ >30 FPS ಕಾರ್ಯಕ್ಷಮತೆಯೊಂದಿಗೆ ತಕ್ಷಣದ ರೋಗ ಪತ್ತೆ",
            "feature.accuracy.title": "94% ನಿಖರತೆ",
            "feature.accuracy.desc": "ಸಾವಿರಾರು ಹತ್ತಿ ಎಲೆ ಚಿತ್ರಗಳ ಮೇಲೆ ತರಬೇತಿ ಪಡೆದ ಅತ್ಯಾಧುನಿಕ YOLOv9 AI ಮಾದರಿ",
            "feature.analysis.title": "ಸ್ಮಾರ್ಟ್ ವಿಶ್ಲೇಷಣೆ",
            "feature.analysis.desc": "ಸ್ವಯಂಚಾಲಿತ ತೀವ್ರತೆ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ವಿವರವಾದ ಚಿಕಿತ್ಸಾ ಶಿಫಾರಸುಗಳು",
            "feature.recommendations.title": "ತಜ್ಞರ ಶಿಫಾರಸುಗಳು",
            "feature.recommendations.desc": "ಪತ್ತೆಯಾದ ಪ್ರತಿ ರೋಗಕ್ಕೆ ವೃತ್ತಿಪರ ಚಿಕಿತ್ಸಾ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ",

            // Upload Page
            "upload.title": "ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
            "upload.subtitle": "ತಕ್ಷಣದ ರೋಗ ಪತ್ತೆಗೆ ಹತ್ತಿ ಎಲೆ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
            "upload.dragDrop": "ನಿಮ್ಮ ಹತ್ತಿ ಎಲೆ ಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಬಿಡಿ",
            "upload.browse": "ಬ್ರೌಸ್ ಮಾಡಿ",
            "upload.or": "ಅಥವಾ",
            "upload.supports": "ಬೆಂಬಲ: JPG, PNG (ಗರಿಷ್ಠ 10MB)",
            "upload.analyze": "ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
            "upload.analyzing": "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
            "upload.placeholder": "ಪ್ರಾರಂಭಿಸಲು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
            "upload.placeholderDesc": "ಹತ್ತಿ ಎಲೆ ಚಿತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ರೋಗಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು \"ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಿ\" ಕ್ಲಿಕ್ ಮಾಡಿ",
            "upload.error": "ದೋಷ",

            // Dashboard
            "dashboard.title": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
            "dashboard.subtitle": "ನಿಮ್ಮ ಹತ್ತಿ ರೋಗ ಪತ್ತೆ ವ್ಯವಸ್ಥೆಯ ಅವಲೋಕನ",
            "dashboard.totalScans": "ಒಟ್ಟು ಸ್ಕ್ಯಾನ್‌ಗಳು",
            "dashboard.detected": "ಪತ್ತೆಯಾದ ರೋಗಗಳು",
            "dashboard.accuracy": "ನಿಖರತೆ ದರ",
            "dashboard.responseTime": "ಸರಾಸರಿ ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ",
            "dashboard.recentScans": "ಇತ್ತೀಚಿನ ಸ್ಕ್ಯಾನ್‌ಗಳು",
            "dashboard.recentDesc": "ಇತ್ತೀಚಿನ ರೋಗ ಪತ್ತೆ ಫಲಿತಾಂಶಗಳು",
            "dashboard.distribution": "ರೋಗ ವಿತರಣೆ",
            "dashboard.distributionDesc": "ಪ್ರಕಾರದ ಮೂಲಕ ವಿಭಜನೆ",

            // Detection Page
            "detect.title": "ಲೈವ್ ಡಿಟೆಕ್ಷನ್",
            "detect.subtitle": "ನಿಮ್ಮ ಕ್ಯಾಮೆರಾ ಬಳಸಿ ರಿಯಲ್-ಟೈಮ್ ರೋಗ ಪತ್ತೆ",
            "detect.start": "ಪತ್ತೆ ಪ್ರಾರಂಭಿಸಿ",
            "detect.stop": "ಪತ್ತೆ ನಿಲ್ಲಿಸಿ",
            "detect.cameraOff": "ಕ್ಯಾಮೆರಾ ಆಫ್ ಆಗಿದೆ",
            "detect.liveResults": "ಲೈವ್ ಫಲಿತಾಂಶಗಳು",
            "detect.waiting": "ಪತ್ತೆಗಾಗಿ ಕಾಯಲಾಗುತ್ತಿದೆ...",
            "detect.startToSee": "ಫಲಿತಾಂಶಗಳನ್ನು ನೋಡಲು ಪತ್ತೆ ಪ್ರಾರಂಭಿಸಿ",
            "detect.tips": "ಉತ್ತಮ ಫಲಿತಾಂಶಗಳಿಗಾಗಿ ಸಲಹೆಗಳು",
            "detect.tip1": "ಉತ್ತಮ ಬೆಳಕನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ",
            "detect.tip2": "ಕ್ಯಾಮೆರಾವನ್ನು ಸ್ಥಿರವಾಗಿಡಿ",
            "detect.tip3": "ವೈಯಕ್ತಿಕ ಎಲೆಗಳ ಮೇಲೆ ಗಮನಹರಿಸಿ",
            "detect.tip4": "ನೆರಳುಗಳನ್ನು ತಪ್ಪಿಸಿ",

            // Results Page
            "results.title": "ಪತ್ತೆ ಫಲಿತಾಂಶಗಳು",
            "results.complete": "ವಿಶ್ಲೇಷಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ",
            "results.detections": "ಪತ್ತೆಗಳು ಕಂಡುಬಂದಿವೆ",
            "results.analyzed": "ವಿಶ್ಲೇಷಿಸಿದ ಚಿತ್ರ",
            "results.inference": "ಅನುಮಾನ",
            "results.severity": "ತೀವ್ರತೆ ಮೌಲ್ಯಮಾಪನ",
            "results.infected": "ಸೋಂಕಿತ",
            "results.detected": "ಪತ್ತೆಯಾದ ರೋಗಗಳು",
            "results.confidence": "ವಿಶ್ವಾಸ",
            "results.recommendations": "ಚಿಕಿತ್ಸಾ ಶಿಫಾರಸುಗಳು",
            "results.download": "ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
            "results.uploadAnother": "ಮತ್ತೊಂದು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",

            // About Page
            "about.title": "ಕುರಿತು",
            "about.titleHighlight": "ಕಾಟನ್‌ವಿಷನ್ AI",
            "about.subtitle": "ಸುಸ್ಥಿರ ಕೃಷಿಗಾಗಿ AI-ಚಾಲಿತ ಹತ್ತಿ ಎಲೆ ರೋಗ ಪತ್ತೆ ವ್ಯವಸ್ಥೆ",
            "about.aiPowered": "AI-ಚಾಲಿತ ಪತ್ತೆ",
            "about.aiDesc": "ನಿಖರವಾದ ರೋಗ ಗುರುತಿಸುವಿಕೆಗಾಗಿ ಸಾವಿರಾರು ಹತ್ತಿ ಎಲೆ ಚಿತ್ರಗಳ ಮೇಲೆ ತರಬೇತಿ ಪಡೆದ ಸುಧಾರಿತ YOLOv9 ಮಾದರಿ.",
            "about.highAccuracy": "ಹೆಚ್ಚಿನ ನಿಖರತೆ",
            "about.accuracyDesc": "ರಿಯಲ್-ಟೈಮ್‌ನಲ್ಲಿ ಹತ್ತಿ ಎಲೆ ರೋಗಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಮತ್ತು ವರ್ಗೀಕರಿಸಲು 90% ಕ್ಕಿಂತ ಹೆಚ್ಚು ನಿಖರತೆಯನ್ನು ಸಾಧಿಸಿ.",
            "about.realtime": "ರಿಯಲ್-ಟೈಮ್ ವಿಶ್ಲೇಷಣೆ",
            "about.realtimeDesc": "ಆಧುನಿಕ ಹಾರ್ಡ್‌ವೇರ್‌ನಲ್ಲಿ 30 FPS ಗಿಂತ ಹೆಚ್ಚಿನ ಸಂಸ್ಕರಣಾ ವೇಗದೊಂದಿಗೆ ತಕ್ಷಣದ ಫಲಿತಾಂಶಗಳನ್ನು ಪಡೆಯಿರಿ.",
            "about.expert": "ತಜ್ಞರ ಶಿಫಾರಸುಗಳು",
            "about.expertDesc": "ಪತ್ತೆಯಾದ ರೋಗಗಳಿಗೆ ವಿವರವಾದ ಚಿಕಿತ್ಸಾ ಶಿಫಾರಸುಗಳು ಮತ್ತು ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳನ್ನು ಪಡೆಯಿರಿ.",
            "about.diseases": "ಪತ್ತೆಹಚ್ಚಬಹುದಾದ ರೋಗಗಳು",
            "about.symptoms": "ಸಾಮಾನ್ಯ ಲಕ್ಷಣಗಳು:",

            // Diseases
            "disease.bacterialBlight": "ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಬ್ಲೈಟ್",
            "disease.fusariumWilt": "ಫ್ಯುಸಾರಿಯಮ್ ವಿಲ್ಟ್",
            "disease.leafCurl": "ಎಲೆ ಸುರುಳಿ ವೈರಸ್",
            "disease.healthy": "ಆರೋಗ್ಯಕರ ಎಲೆ",

            // Severity
            "severity.healthy": "ಆರೋಗ್ಯಕರ",
            "severity.mild": "ಸೌಮ್ಯ",
            "severity.moderate": "ಮಧ್ಯಮ",
            "severity.severe": "ತೀವ್ರ",
            "severity.no detection": "ಎಲೆ ಪತ್ತೆಯಾಗಿಲ್ಲ",

            // Footer
            "footer.tagline": "ಸುಸ್ಥಿರ ಕೃಷಿಗಾಗಿ AI-ಚಾಲಿತ ಹತ್ತಿ ಎಲೆ ರೋಗ ಪತ್ತೆ.",
            "footer.product": "ಉತ್ಪನ್ನ",
            "footer.company": "ಕಂಪನಿ",
            "footer.resources": "ಸಂಪನ್ಮೂಲಗಳು",
            "footer.contact": "ಸಂಪರ್ಕಿಸಿ",
            "footer.privacy": "ಗೌಪ್ಯತೆ",
            "footer.documentation": "ದಾಖಲಾತಿ",
            "footer.api": "API",
            "footer.support": "ಬೆಂಬಲ",
            "footer.copyright": "© 2024 ಕಾಟನ್‌ವಿಷನ್ AI. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",

            // Recommendations - Structured by Disease
            "recommendations": {
                "bacterial_blight": [
                    {
                        "type": "chemical",
                        "title": "ತಾಮ್ರ ಆಧಾರಿತ ಬ್ಯಾಕ್ಟೀರಿಯನಾಶಕ",
                        "desc": "2-3 ಗ್ರಾಂ/ಲೀಟರ್ ನೀರಿಗೆ ತಾಮ್ರದ ಹೈಡ್ರಾಕ್ಸೈಡ್ ಅಥವಾ ತಾಮ್ರದ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ ಅನ್ನು ಅನ್ವಯಿಸಿ. 10-15 ದಿನಗಳ ಅಂತರದಲ್ಲಿ ಸಿಂಪಡಿಸಿ."
                    },
                    {
                        "type": "chemical",
                        "title": "ಸ್ಟ್ರೆಪ್ಟೋಸೈಕ್ಲಿನ್",
                        "desc": "10 ಲೀಟರ್ ನೀರಿಗೆ 1 ಗ್ರಾಂ ಸ್ಟ್ರೆಪ್ಟೋಸೈಕ್లిನ್ + 25 ಗ್ರಾಂ ತಾಮ್ರದ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ ಮಿಶ್ರಣ ಮಾಡಿ. ಬ್ಯಾಕ್ಟೀರಿಯಾದ ಸೋಂಕುಗಳ ವಿರುದ್ಧ ಪರಿಣಾಮಕಾರಿ."
                    },
                    {
                        "type": "organic",
                        "title": "ಬೇವು ಎಣ್ಣೆ ಸಿಂಪಡಣೆ",
                        "desc": "ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ 5 ಮಿಲಿ ಬೇವು ಎಣ್ಣೆಯನ್ನು ಮಿಶ್ರಣ ಮಾಡಿ. ಎಮಲ್ಸಿಫೈಯರ್ ಆಗಿ 1 ಮಿಲಿ ದ್ರವ ಸೋಪ್ ಸೇರಿಸಿ. ಪೀಡಿತ ಪ್ರದೇಶಗಳಿಗೆ ಸಿಂಪಡಿಸಿ."
                    },
                    {
                        "type": "preventive",
                        "title": "ಕ್ಷೇತ್ರ ನೈರ್ಮಲ್ಯ",
                        "desc": "ಸೋಂಕಿತ ಸಸ್ಯದ ಅವಶೇಷಗಳನ್ನು ತೆಗೆದುಹಾಕಿ ಮತ್ತು ಸುಟ್ಟುಹಾಕಿ. ಹೊಲದ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ಸ್ವಚ್ಛವಾಗಿಡಿ."
                    }
                ],
                "fusarium_wilt": [
                    {
                        "type": "chemical",
                        "title": "ಕಾರ್ಬೆಂಡಾಜಿಮ್",
                        "desc": "2 ಗ್ರಾಂ/ಲೀಟರ್ ಕಾರ್ಬೆಂಡಾಜಿಮ್ 50% WP ನೊಂದಿಗೆ ಮಣ್ಣನ್ನು ನೆನೆಸಿ. ಬೇರು ವಲಯದಲ್ಲಿ ಅನ್ವಯಿಸಿ."
                    },
                    {
                        "type": "organic",
                        "title": "ಟ್ರೈಕೋಡರ್ಮಾ ವಿರಿಡೆ",
                        "desc": "ಜೈವಿಕ ನಿಯಂತ್ರಣ ಶಿಲೀಂಧ್ರ. 5 ಗ್ರಾಂ/ಕೆಜಿ ಬೀಜ ಚಿಕಿತ್ಸೆ ಅಥವಾ 5 ಕೆಜಿ/ಹೆಕ್ಟೇರ್ ಮಣ್ಣಿನ ಅಪ್ಲಿಕೇಶನ್ ಅನ್ವಯಿಸಿ."
                    },
                    {
                        "type": "preventive",
                        "title": "ಸರಿಯಾದ ಒಳಚರಂಡಿ",
                        "desc": "ಉತ್ತಮ ಒಳಚರಂಡಿಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ. ಫ್ಯುಸಾರಿಯಮ್‌ಗೆ ಅನುಕೂಲಕರವಾದ ನೀರು ನಿಲ್ಲುವುದನ್ನು ತಪ್ಪಿಸಿ."
                    }
                ],
                "leaf_curl_virus": [
                    {
                        "type": "chemical",
                        "title": "ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್",
                        "desc": "0.5 ಮಿಲಿ/ಲೀಟರ್‌ನಲ್ಲಿ ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್ 17.8% SL ನೊಂದಿಗೆ ಬಿಳಿ ನೊಣ ವೆಕ್ಟರ್ ಅನ್ನು ನಿಯಂತ್ರಿಸಿ."
                    },
                    {
                        "type": "organic",
                        "title": "ಬೇವು ಎಣ್ಣೆ + ಬೆಳ್ಳುಳ್ಳಿ ಸಾರ",
                        "desc": "ಪ್ರತಿ ಲೀಟರ್‌ಗೆ 5 ಮಿಲಿ ಬೇವು ಎಣ್ಣೆ + 10 ಮಿಲಿ ಬೆಳ್ಳುಳ್ಳಿ ಸಾರವನ್ನು ಮಿಶ್ರಣ ಮಾಡಿ. ಬಿಳಿ ನೊಣಗಳನ್ನು ಹಿಮ್ಮೆಟ್ಟಿಸುತ್ತದೆ."
                    },
                    {
                        "type": "preventive",
                        "title": "ಹಳದಿ ಜಿಗುಟಾದ ಬಲೆಗಳು",
                        "desc": "ಬಿಳಿ ನೊಣಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಲು ಮತ್ತು ಹಿಡಿಯಲು ಎಕರೆಗೆ 15-20 ಬಲೆಗಳಲ್ಲಿ ಹಳದಿ ಜಿಗುಟಾದ ಬಲೆಗಳನ್ನು ಸ್ಥಾಪಿಸಿ."
                    }
                ],
                "healthy_leaf": [
                    {
                        "type": "preventive",
                        "title": "ಉತ್ತಮ ಅಭ್ಯಾಸಗಳನ್ನು ಮುಂದುವರಿಸಿ",
                        "desc": "ಪ್ರಸ್ತುತ ಕೃಷಿ ಪದ್ಧತಿಗಳನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಿ. ನಿಯಮಿತ ಮೇಲ್ವಿಚಾರಣೆ ಪ್ರಮುಖವಾಗಿದೆ."
                    },
                    {
                        "type": "preventive",
                        "title": "ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆ",
                        "desc": "ಸಸ್ಯದ ಆರೋಗ್ಯ ಮತ್ತು ರೋಗ ನಿರೋಧಕತೆಯನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಲು ಸಮತೋಲಿತ ಪೋಷಣೆಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ."
                    }
                ]
            },
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
