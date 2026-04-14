const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const OUT_LANDING = BASE;
const OUT_PRODUCTION = 'c:/Users/alzarena/Desktop/Antigravity/astro-connect/public';

// Languages to generate (bg already exists)
const LANGS = ['en', 'pt', 'fr', 'de', 'it', 'ru', 'tr', 'ar', 'ja', 'zh'];
const ALL_LANGS_SEO = ['es', 'en', 'bg', 'pt', 'fr', 'de', 'it', 'ru', 'tr', 'ar', 'ja', 'zh'];
const RTL = ['ar', 'he'];

// Translation map (base) - translates the hardcoded Spanish text in pages
// We use a global find-replace approach for each language
const TRANSLATIONS = {
  en: {
    // Nav
    'Carta Natal': 'Birth Chart',
    'Horoscopo': 'Horoscope',
    'Lecturas': 'Readings',
    'Premium': 'Premium',
    'Blog': 'Blog',
    'Aureum Books': 'Aureum Books',
    'Inicio': 'Home',
    // Common
    'Tu Guia Cosmica': 'Your Cosmic Guide',
    'Tu Guia Cósmica': 'Your Cosmic Guide',
    'Todos los derechos reservados': 'All rights reserved',
    'Politica de Privacidad': 'Privacy Policy',
    'Politica de Cookies': 'Cookie Policy',
    'Privacidad': 'Privacy',
    'Cookies': 'Cookies',
    'Gana Recompensas': 'Earn Rewards',
    'Gana Recompensas Compartiendo las Estrellas': 'Earn Rewards Sharing the Stars',
    'Invita a tus amigos a Astro Aureum y ambos ganan lecturas y meses Premium gratis': 'Invite your friends to Astro Aureum and both get free readings and Premium months',
    'Como Funciona': 'How It Works',
    'Comparte tu Enlace': 'Share your Link',
    'Copia tu enlace unico y compartelo con amigos, familia o redes sociales.': 'Copy your unique link and share it with friends, family or social media.',
    'Amigos se Registran': 'Friends Register',
    'Cuando alguien se registra con tu enlace, el sistema lo detecta.': 'When someone signs up with your link, the system detects it.',
    'Ambos Ganan': 'Both Earn',
    'Tu ganas Premium gratis y tu amigo recibe un descuento especial.': 'You get free Premium and your friend gets a special discount.',
    'Niveles de Recompensa': 'Reward Levels',
    '1 Amigo': '1 Friend',
    '3 Amigos': '3 Friends',
    '5 Amigos': '5 Friends',
    '10 Amigos': '10 Friends',
    '1 semana de Premium gratis': '1 week of free Premium',
    '1 mes de Premium gratis': '1 month of free Premium',
    'Lectura personalizada gratis (valor &euro;89)': 'Free personalized reading (value €89)',
    '3 meses Premium + lectura premium (valor &euro;175)': '3 months Premium + premium reading (value €175)',
    'Tu Enlace de Referido': 'Your Referral Link',
    'COPIAR ENLACE': 'COPY LINK',
    'Programa de Afiliados': 'Affiliate Program',
    'Eres influencer o creador? Gana': 'Are you an influencer or creator? Earn',
    '20% de comision': '20% commission',
    'por cada venta.': 'on each sale.',
    '20% comision': '20% commission',
    'Tracking': 'Tracking',
    'Pagos mensuales': 'Monthly payments',
    'APLICAR AHORA': 'APPLY NOW',
    // Carta natal
    'Calcula tu Carta Natal GRATIS': 'Calculate your Birth Chart FREE',
    'Descubre tu signo solar, lunar y ascendente con precision astronomica real': 'Discover your sun, moon and rising signs with real astronomical precision',
    'Tu nombre': 'Your name',
    'Como te llamas?': 'What is your name?',
    'Tu email (para recibir tu carta)': 'Your email (to receive your chart)',
    'Fecha de nacimiento': 'Date of birth',
    'Hora de nacimiento': 'Time of birth',
    'No la se': 'I do not know',
    'Ciudad de nacimiento': 'City of birth',
    'Pais': 'Country',
    'Selecciona': 'Select',
    'CALCULAR MI CARTA NATAL': 'CALCULATE MY BIRTH CHART',
    'Que Descubriras': 'What You Will Discover',
    'cartas calculadas': 'charts calculated',
    'Tradiciones': 'Traditions',
    'Calculando tu carta natal con Swiss Ephemeris...': 'Calculating your birth chart with Swiss Ephemeris...',
    'Tu Carta Natal': 'Your Birth Chart',
    'Planeta': 'Planet',
    'Signo': 'Sign',
    'Grado': 'Degree',
    'Significado': 'Meaning',
    'Luna estimada': 'Estimated Moon',
    'Ascendente': 'Ascendant',
    'Necesita hora exacta': 'Requires exact time',
    'Calculando...': 'Calculating...',
    'Esta es una version simplificada': 'This is a simplified version',
    'La carta natal completa incluye las 12 casas, aspectos exactos, nodos lunares, Quiron, Lilith y predicciones de 12 meses basadas en tus transitos personales.': 'The complete birth chart includes the 12 houses, exact aspects, lunar nodes, Chiron, Lilith and 12-month predictions based on your personal transits.',
    'Quieres tu carta COMPLETA con aspectos reales y predicciones?': 'Want your COMPLETE chart with real aspects and predictions?',
    'VER CARTA NATAL COMPLETA': 'VIEW COMPLETE BIRTH CHART',
    'desde &euro;89': 'from €89',
    'Tu esencia y personalidad': 'Your essence and personality',
    'Tus emociones profundas': 'Your deep emotions',
    'Tu imagen al mundo': 'Your image to the world',
    'Tu forma de amar': 'Your way of loving',
    'Tu energia vital': 'Your vital energy',
    'Tu comunicacion': 'Your communication',
    // Horoscopo
    'Horoscopo del Dia': 'Daily Horoscope',
    'Energia Cosmica del Dia': 'Cosmic Energy of the Day',
    'Amor': 'Love',
    'Dinero': 'Money',
    'Salud': 'Health',
    'Numeros de la suerte': 'Lucky numbers',
    'Signo compatible': 'Compatible sign',
    'Carta Natal Gratis': 'Free Birth Chart',
    'Descubre tu Sol, Luna y Ascendente con precision': 'Discover your Sun, Moon and Rising with precision',
    'CALCULAR GRATIS': 'CALCULATE FREE',
    'Lectura Premium': 'Premium Reading',
    '37 lecturas en 9 tradiciones desde': '37 readings in 9 traditions from',
    'VER LECTURAS': 'VIEW READINGS',
    // Lecturas
    'Todas': 'All',
    'Para Mi': 'For Me',
    'Para Nosotros': 'For Us',
    'Para Mi Futuro': 'For My Future',
    'Todos': 'All',
    'Esencial': 'Essential',
    'Profunda': 'Deep',
    'Completa': 'Complete',
    '37 lecturas': '37 readings',
    'Mapa del Alma': 'Soul Map',
    'OFERTA ESPECIAL': 'SPECIAL OFFER',
    'QUIERO MI MAPA DEL ALMA': 'I WANT MY SOUL MAP',
    'personas esta semana': 'people this week',
    'palabras': 'words',
    'Comprar': 'Buy',
    'Tambien te interesa:': 'You might also like:',
    // Sinastria Offer
    'Sinastria de Almas': 'Soul Synastry',
    'Oferta de Lanzamiento': 'Launch Offer',
    'OFERTA DE LANZAMIENTO': 'LAUNCH OFFER',
    // Buttons/generic
    'Gratis': 'Free',
    'Oferta': 'Offer',
    'Descubre': 'Discover'
  },
  pt: {
    'Carta Natal': 'Mapa Astral',
    'Horoscopo': 'Horoscopo',
    'Lecturas': 'Leituras',
    'Premium': 'Premium',
    'Blog': 'Blog',
    'Aureum Books': 'Aureum Books',
    'Inicio': 'Inicio',
    'Tu Guia Cosmica': 'Seu Guia Cosmico',
    'Tu Guia Cósmica': 'Seu Guia Cosmico',
    'Todos los derechos reservados': 'Todos os direitos reservados',
    'Politica de Privacidad': 'Politica de Privacidade',
    'Politica de Cookies': 'Politica de Cookies',
    'Privacidad': 'Privacidade',
    'Cookies': 'Cookies',
    'Gana Recompensas': 'Ganhe Recompensas',
    'Gana Recompensas Compartiendo las Estrellas': 'Ganhe Recompensas Compartilhando as Estrelas',
    'Invita a tus amigos a Astro Aureum y ambos ganan lecturas y meses Premium gratis': 'Convide seus amigos para Astro Aureum e ambos ganham leituras e meses Premium gratis',
    'Como Funciona': 'Como Funciona',
    'Comparte tu Enlace': 'Compartilhe seu Link',
    'Amigos se Registran': 'Amigos se Registram',
    'Ambos Ganan': 'Ambos Ganham',
    'Niveles de Recompensa': 'Niveis de Recompensa',
    '1 Amigo': '1 Amigo',
    '3 Amigos': '3 Amigos',
    '5 Amigos': '5 Amigos',
    '10 Amigos': '10 Amigos',
    'Tu Enlace de Referido': 'Seu Link de Indicacao',
    'COPIAR ENLACE': 'COPIAR LINK',
    'Calcula tu Carta Natal GRATIS': 'Calcule seu Mapa Astral GRATIS',
    'Descubre tu signo solar, lunar y ascendente con precision astronomica real': 'Descubra seu signo solar, lunar e ascendente com precisao astronomica real',
    'Tu nombre': 'Seu nome',
    'Fecha de nacimiento': 'Data de nascimento',
    'Hora de nacimiento': 'Hora de nascimento',
    'Ciudad de nacimiento': 'Cidade de nascimento',
    'Pais': 'Pais',
    'CALCULAR MI CARTA NATAL': 'CALCULAR MEU MAPA ASTRAL',
    'Que Descubriras': 'O que Descobrira',
    'Horoscopo del Dia': 'Horoscopo do Dia',
    'Amor': 'Amor',
    'Dinero': 'Dinheiro',
    'Salud': 'Saude',
    'Todas': 'Todas',
    'Para Mi': 'Para Mim',
    'Para Nosotros': 'Para Nos',
    'Para Mi Futuro': 'Para Meu Futuro',
    'Mapa del Alma': 'Mapa da Alma',
    'Comprar': 'Comprar'
  },
  fr: {
    'Carta Natal': 'Theme Natal',
    'Horoscopo': 'Horoscope',
    'Lecturas': 'Lectures',
    'Premium': 'Premium',
    'Blog': 'Blog',
    'Aureum Books': 'Aureum Books',
    'Inicio': 'Accueil',
    'Tu Guia Cosmica': 'Votre Guide Cosmique',
    'Tu Guia Cósmica': 'Votre Guide Cosmique',
    'Todos los derechos reservados': 'Tous droits reserves',
    'Politica de Privacidad': 'Politique de Confidentialite',
    'Politica de Cookies': 'Politique de Cookies',
    'Privacidad': 'Confidentialite',
    'Gana Recompensas': 'Gagnez des Recompenses',
    'Gana Recompensas Compartiendo las Estrellas': 'Gagnez des Recompenses en Partageant les Etoiles',
    'Invita a tus amigos a Astro Aureum y ambos ganan lecturas y meses Premium gratis': 'Invitez vos amis sur Astro Aureum et gagnez tous deux des lectures et mois Premium gratuits',
    'Como Funciona': 'Comment Ca Marche',
    'Comparte tu Enlace': 'Partagez votre Lien',
    'Amigos se Registran': 'Les Amis S inscrivent',
    'Ambos Ganan': 'Tous Deux Gagnent',
    'Niveles de Recompensa': 'Niveaux de Recompense',
    'Tu Enlace de Referido': 'Votre Lien de Parrainage',
    'COPIAR ENLACE': 'COPIER LIEN',
    'Calcula tu Carta Natal GRATIS': 'Calculez votre Theme Natal GRATUIT',
    'Descubre tu signo solar, lunar y ascendente con precision astronomica real': 'Decouvrez votre signe solaire, lunaire et ascendant avec une precision astronomique reelle',
    'Tu nombre': 'Votre nom',
    'Fecha de nacimiento': 'Date de naissance',
    'Hora de nacimiento': 'Heure de naissance',
    'Ciudad de nacimiento': 'Ville de naissance',
    'Pais': 'Pays',
    'CALCULAR MI CARTA NATAL': 'CALCULER MON THEME NATAL',
    'Horoscopo del Dia': 'Horoscope du Jour',
    'Amor': 'Amour',
    'Dinero': 'Argent',
    'Salud': 'Sante',
    'Mapa del Alma': 'Carte de l Ame',
    'Comprar': 'Acheter'
  },
  de: {
    'Carta Natal': 'Geburtshoroskop',
    'Horoscopo': 'Horoskop',
    'Lecturas': 'Lesungen',
    'Premium': 'Premium',
    'Blog': 'Blog',
    'Aureum Books': 'Aureum Books',
    'Inicio': 'Startseite',
    'Tu Guia Cosmica': 'Dein Kosmischer Fuhrer',
    'Tu Guia Cósmica': 'Dein Kosmischer Fuhrer',
    'Todos los derechos reservados': 'Alle Rechte vorbehalten',
    'Politica de Privacidad': 'Datenschutzerklarung',
    'Politica de Cookies': 'Cookie-Richtlinie',
    'Privacidad': 'Datenschutz',
    'Gana Recompensas': 'Belohnungen Verdienen',
    'Gana Recompensas Compartiendo las Estrellas': 'Belohnungen Verdienen durch Teilen der Sterne',
    'Como Funciona': 'Wie Es Funktioniert',
    'Comparte tu Enlace': 'Teile deinen Link',
    'Amigos se Registran': 'Freunde Registrieren Sich',
    'Ambos Ganan': 'Beide Gewinnen',
    'Niveles de Recompensa': 'Belohnungsstufen',
    'COPIAR ENLACE': 'LINK KOPIEREN',
    'Calcula tu Carta Natal GRATIS': 'Berechne dein Geburtshoroskop KOSTENLOS',
    'Tu nombre': 'Dein Name',
    'Fecha de nacimiento': 'Geburtsdatum',
    'Hora de nacimiento': 'Geburtszeit',
    'Ciudad de nacimiento': 'Geburtsort',
    'Pais': 'Land',
    'CALCULAR MI CARTA NATAL': 'MEIN HOROSKOP BERECHNEN',
    'Horoscopo del Dia': 'Tageshoroskop',
    'Amor': 'Liebe',
    'Dinero': 'Geld',
    'Salud': 'Gesundheit',
    'Mapa del Alma': 'Seelenkarte',
    'Comprar': 'Kaufen'
  },
  it: {
    'Carta Natal': 'Carta Astrale',
    'Horoscopo': 'Oroscopo',
    'Lecturas': 'Letture',
    'Premium': 'Premium',
    'Blog': 'Blog',
    'Aureum Books': 'Aureum Books',
    'Inicio': 'Home',
    'Tu Guia Cosmica': 'La Tua Guida Cosmica',
    'Tu Guia Cósmica': 'La Tua Guida Cosmica',
    'Todos los derechos reservados': 'Tutti i diritti riservati',
    'Politica de Privacidad': 'Politica sulla Privacy',
    'Politica de Cookies': 'Politica sui Cookie',
    'Privacidad': 'Privacy',
    'Gana Recompensas': 'Guadagna Ricompense',
    'Gana Recompensas Compartiendo las Estrellas': 'Guadagna Ricompense Condividendo le Stelle',
    'Como Funciona': 'Come Funziona',
    'Comparte tu Enlace': 'Condividi il tuo Link',
    'Amigos se Registran': 'Amici si Registrano',
    'Ambos Ganan': 'Entrambi Guadagnano',
    'Calcula tu Carta Natal GRATIS': 'Calcola la tua Carta Astrale GRATIS',
    'Tu nombre': 'Il tuo nome',
    'Fecha de nacimiento': 'Data di nascita',
    'Hora de nacimiento': 'Ora di nascita',
    'Ciudad de nacimiento': 'Citta di nascita',
    'Pais': 'Paese',
    'CALCULAR MI CARTA NATAL': 'CALCOLA LA MIA CARTA',
    'Horoscopo del Dia': 'Oroscopo del Giorno',
    'Amor': 'Amore',
    'Dinero': 'Denaro',
    'Salud': 'Salute',
    'Mapa del Alma': 'Mappa dell Anima',
    'Comprar': 'Acquista'
  },
  ru: {
    'Carta Natal': 'Натальная Карта',
    'Horoscopo': 'Гороскоп',
    'Lecturas': 'Чтения',
    'Premium': 'Премиум',
    'Blog': 'Блог',
    'Aureum Books': 'Aureum Books',
    'Inicio': 'Главная',
    'Tu Guia Cosmica': 'Ваш Космический Проводник',
    'Tu Guia Cósmica': 'Ваш Космический Проводник',
    'Todos los derechos reservados': 'Все права защищены',
    'Politica de Privacidad': 'Политика Конфиденциальности',
    'Politica de Cookies': 'Политика Cookies',
    'Privacidad': 'Конфиденциальность',
    'Gana Recompensas Compartiendo las Estrellas': 'Получай Награды Делясь Звездами',
    'Como Funciona': 'Как Это Работает',
    'Calcula tu Carta Natal GRATIS': 'Рассчитай Натальную Карту БЕСПЛАТНО',
    'Tu nombre': 'Ваше имя',
    'Fecha de nacimiento': 'Дата рождения',
    'Hora de nacimiento': 'Время рождения',
    'Ciudad de nacimiento': 'Город рождения',
    'Pais': 'Страна',
    'CALCULAR MI CARTA NATAL': 'РАССЧИТАТЬ КАРТУ',
    'Horoscopo del Dia': 'Гороскоп на День',
    'Amor': 'Любовь',
    'Dinero': 'Деньги',
    'Salud': 'Здоровье',
    'Mapa del Alma': 'Карта Души',
    'Comprar': 'Купить'
  },
  tr: {
    'Carta Natal': 'Dogum Haritasi',
    'Horoscopo': 'Burclar',
    'Lecturas': 'Okumalar',
    'Premium': 'Premium',
    'Blog': 'Blog',
    'Aureum Books': 'Aureum Books',
    'Inicio': 'Ana Sayfa',
    'Tu Guia Cosmica': 'Kozmik Rehberin',
    'Tu Guia Cósmica': 'Kozmik Rehberin',
    'Todos los derechos reservados': 'Tum haklari saklidir',
    'Politica de Privacidad': 'Gizlilik Politikasi',
    'Gana Recompensas Compartiendo las Estrellas': 'Yildizlari Paylasarak Odul Kazan',
    'Como Funciona': 'Nasil Calisir',
    'Calcula tu Carta Natal GRATIS': 'Dogum Haritani UCRETSIZ Hesapla',
    'Tu nombre': 'Adin',
    'Fecha de nacimiento': 'Dogum tarihi',
    'Hora de nacimiento': 'Dogum saati',
    'Ciudad de nacimiento': 'Dogum yeri',
    'Pais': 'Ulke',
    'CALCULAR MI CARTA NATAL': 'HARITAMI HESAPLA',
    'Horoscopo del Dia': 'Gunluk Burc',
    'Amor': 'Ask',
    'Dinero': 'Para',
    'Salud': 'Saglik',
    'Mapa del Alma': 'Ruh Haritasi',
    'Comprar': 'Satin Al'
  },
  ar: {
    'Carta Natal': 'خريطة الميلاد',
    'Horoscopo': 'الأبراج',
    'Lecturas': 'قراءات',
    'Premium': 'بريميوم',
    'Blog': 'مدونة',
    'Aureum Books': 'Aureum Books',
    'Inicio': 'الرئيسية',
    'Tu Guia Cosmica': 'دليلك الكوني',
    'Tu Guia Cósmica': 'دليلك الكوني',
    'Todos los derechos reservados': 'جميع الحقوق محفوظة',
    'Politica de Privacidad': 'سياسة الخصوصية',
    'Gana Recompensas Compartiendo las Estrellas': 'اكسب مكافآت بمشاركة النجوم',
    'Como Funciona': 'كيف يعمل',
    'Calcula tu Carta Natal GRATIS': 'احسب خريطة ميلادك مجاناً',
    'Tu nombre': 'اسمك',
    'Fecha de nacimiento': 'تاريخ الميلاد',
    'Hora de nacimiento': 'وقت الميلاد',
    'Ciudad de nacimiento': 'مدينة الميلاد',
    'Pais': 'الدولة',
    'CALCULAR MI CARTA NATAL': 'احسب خريطتي',
    'Horoscopo del Dia': 'برج اليوم',
    'Amor': 'الحب',
    'Dinero': 'المال',
    'Salud': 'الصحة',
    'Mapa del Alma': 'خريطة الروح',
    'Comprar': 'اشتري'
  },
  ja: {
    'Carta Natal': '出生図',
    'Horoscopo': '星占い',
    'Lecturas': 'リーディング',
    'Premium': 'プレミアム',
    'Blog': 'ブログ',
    'Aureum Books': 'Aureum Books',
    'Inicio': 'ホーム',
    'Tu Guia Cosmica': 'あなたの宇宙ガイド',
    'Tu Guia Cósmica': 'あなたの宇宙ガイド',
    'Todos los derechos reservados': '無断転載を禁じます',
    'Politica de Privacidad': 'プライバシーポリシー',
    'Gana Recompensas Compartiendo las Estrellas': '星を共有して報酬を獲得',
    'Como Funciona': '仕組み',
    'Calcula tu Carta Natal GRATIS': '出生図を無料で計算',
    'Tu nombre': 'お名前',
    'Fecha de nacimiento': '生年月日',
    'Hora de nacimiento': '出生時間',
    'Ciudad de nacimiento': '出生地',
    'Pais': '国',
    'CALCULAR MI CARTA NATAL': '出生図を計算',
    'Horoscopo del Dia': '今日の星占い',
    'Amor': '恋愛',
    'Dinero': 'お金',
    'Salud': '健康',
    'Mapa del Alma': '魂の地図',
    'Comprar': '購入'
  },
  zh: {
    'Carta Natal': '星盘',
    'Horoscopo': '星座运势',
    'Lecturas': '解读',
    'Premium': '高级会员',
    'Blog': '博客',
    'Aureum Books': 'Aureum Books',
    'Inicio': '首页',
    'Tu Guia Cosmica': '你的宇宙指南',
    'Tu Guia Cósmica': '你的宇宙指南',
    'Todos los derechos reservados': '版权所有',
    'Politica de Privacidad': '隐私政策',
    'Gana Recompensas Compartiendo las Estrellas': '分享星星赢取奖励',
    'Como Funciona': '运作方式',
    'Calcula tu Carta Natal GRATIS': '免费计算你的星盘',
    'Tu nombre': '姓名',
    'Fecha de nacimiento': '出生日期',
    'Hora de nacimiento': '出生时间',
    'Ciudad de nacimiento': '出生城市',
    'Pais': '国家',
    'CALCULAR MI CARTA NATAL': '计算我的星盘',
    'Horoscopo del Dia': '今日星座',
    'Amor': '爱情',
    'Dinero': '金钱',
    'Salud': '健康',
    'Mapa del Alma': '灵魂地图',
    'Comprar': '购买'
  }
};

// Source pages in Spanish
const SOURCE_PAGES = [
  { src: 'sinastria-oferta.html', out: 'index.html' },
  { src: 'carta-natal-gratis.html', out: 'carta-natal.html' },
  { src: 'horoscopo-diario.html', out: 'horoscopo.html' },
  { src: 'lecturas.html', out: 'lecturas.html' }
];

function generateHreflangTags(currentLang, pageName) {
  const tags = [];
  // Spanish base
  const esUrl = pageName === 'index.html' ? '' : '/' + pageName;
  tags.push(`<link rel="alternate" hreflang="es" href="https://astroaureum.com${esUrl}" />`);
  tags.push(`<link rel="alternate" hreflang="x-default" href="https://astroaureum.com${esUrl}" />`);
  // Bulgarian
  tags.push(`<link rel="alternate" hreflang="bg" href="https://astroaureum.com/bg/${pageName === 'index.html' ? '' : pageName}" />`);
  // Other languages
  LANGS.forEach(l => {
    tags.push(`<link rel="alternate" hreflang="${l}" href="https://astroaureum.com/${l}/${pageName === 'index.html' ? '' : pageName}" />`);
  });
  return tags.join('\n');
}

function translateHTML(html, lang, dict, pageName) {
  // Change lang attribute
  html = html.replace(/<html\s+lang="es"/, `<html lang="${lang}"${RTL.includes(lang) ? ' dir="rtl"' : ''}`);

  // Change og:locale
  const ogLocales = {
    en: 'en_US', pt: 'pt_BR', fr: 'fr_FR', de: 'de_DE', it: 'it_IT',
    ru: 'ru_RU', tr: 'tr_TR', ar: 'ar_SA', ja: 'ja_JP', zh: 'zh_CN'
  };
  html = html.replace(/content="es_ES"/g, `content="${ogLocales[lang] || lang}"`);

  // Apply translations (longer keys first to avoid partial matches)
  const keys = Object.keys(dict).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    const val = dict[key];
    const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    html = html.replace(regex, val);
  }

  // Update image paths (add ../ since we're in a subfolder)
  html = html.replace(/src="home-assets\//g, 'src="../home-assets/');
  html = html.replace(/src="assets\//g, 'src="../assets/');
  html = html.replace(/src="sinastria\//g, 'src="../sinastria/');
  html = html.replace(/url\('home-assets\//g, "url('../home-assets/");
  html = html.replace(/url\('assets\//g, "url('../assets/");
  html = html.replace(/url\('sinastria\//g, "url('../sinastria/");

  // Nav links: keep absolute paths but point to this language version
  html = html.replace(/href="\/carta-natal-gratis\.html"/g, `href="/${lang}/carta-natal.html"`);
  html = html.replace(/href="\/horoscopo-diario\.html"/g, `href="/${lang}/horoscopo.html"`);
  html = html.replace(/href="\/lecturas\.html"/g, `href="/${lang}/lecturas.html"`);
  html = html.replace(/href="\/"/g, `href="/${lang}/"`);

  // Add hreflang tags before </head>
  const hreflangTags = generateHreflangTags(lang, pageName);
  html = html.replace(/<\/head>/, hreflangTags + '\n</head>');

  return html;
}

let generated = 0;
let errors = 0;

for (const lang of LANGS) {
  const dict = TRANSLATIONS[lang];
  if (!dict) { console.error(`No translations for ${lang}`); continue; }

  // Create folders
  const landingDir = path.join(OUT_LANDING, lang);
  const prodDir = path.join(OUT_PRODUCTION, lang);
  if (!fs.existsSync(landingDir)) fs.mkdirSync(landingDir, { recursive: true });
  if (!fs.existsSync(prodDir)) fs.mkdirSync(prodDir, { recursive: true });

  for (const page of SOURCE_PAGES) {
    const srcPath = path.join(BASE, page.src);
    if (!fs.existsSync(srcPath)) { console.error(`Missing source: ${page.src}`); errors++; continue; }

    try {
      let html = fs.readFileSync(srcPath, 'utf8');
      html = translateHTML(html, lang, dict, page.out);

      fs.writeFileSync(path.join(landingDir, page.out), html);
      fs.writeFileSync(path.join(prodDir, page.out), html);
      generated++;
      console.log(`OK: /${lang}/${page.out}`);
    } catch (e) {
      console.error(`Error ${lang}/${page.out}:`, e.message);
      errors++;
    }
  }
}

console.log(`\nGenerated ${generated} pages, ${errors} errors`);
