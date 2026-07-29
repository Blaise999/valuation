import {
  Award,
  Banknote,
  Building2,
  FileCheck2,
  Gavel,
  Home,
  Landmark,
  ShieldCheck,
  TrendingUp,
  Trees,
} from "lucide-react";

export const unsplashImages = {
  hero: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90",
  luxuryHome:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90",
  cityBuilding:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=90",
  land:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=90",
  interior:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90",
  documents:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=90",
  estate:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=90",
  map:
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=90",
};

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Request", href: "#request" },
];

export const heroStats = [
  { value: "01", label: "Property Valuation" },
  { value: "02", label: "Land Assessment" },
  { value: "03", label: "Estate Advisory" },
  { value: "04", label: "Legal Reports" },
];

export const credibilityItems = [
  {
    icon: FileCheck2,
    title: "Documented Reports",
    text: "Clear valuation reports prepared for property, legal, financial, and estate decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Confidential Handling",
    text: "Client property information, asset details, and documents are handled with discretion.",
  },
  {
    icon: Banknote,
    title: "Market-Based Opinion",
    text: "Valuation opinions guided by location, market activity, property condition, and asset potential.",
  },
  {
    icon: Award,
    title: "Professional Standard",
    text: "A polished process from request and inspection to analysis and final report delivery.",
  },
];

export const services = [
  {
    icon: Home,
    title: "Residential Valuation",
    text: "Accurate valuation reports for homes, apartments, duplexes, private residences, and residential estates.",
    image: unsplashImages.interior,
  },
  {
    icon: Building2,
    title: "Commercial Valuation",
    text: "Professional assessment for office buildings, shops, hotels, warehouses, plazas, schools, and mixed-use properties.",
    image: unsplashImages.cityBuilding,
  },
  {
    icon: Trees,
    title: "Land Valuation",
    text: "Market-backed assessment for land acquisition, sale, development planning, title decisions, and investment review.",
    image: unsplashImages.land,
  },
  {
    icon: Landmark,
    title: "Bank & Mortgage Reports",
    text: "Structured reports prepared for lending, collateral review, mortgage support, and institutional documentation.",
    image: unsplashImages.estate,
  },
  {
    icon: Gavel,
    title: "Probate & Legal Valuation",
    text: "Clear valuation support for inheritance, court matters, family estate settlement, insurance, and dispute resolution.",
    image: unsplashImages.documents,
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    text: "Property market opinions, rental assessment, development potential, and practical asset decision support.",
    image: unsplashImages.map,
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Initial Request",
    text: "The client submits property details, valuation purpose, location, and contact information.",
  },
  {
    number: "02",
    title: "Document Review",
    text: "We review ownership details, survey/title documents, building information, and available evidence.",
  },
  {
    number: "03",
    title: "Inspection & Market Study",
    text: "Physical inspection and market comparison help establish realistic value and asset condition.",
  },
  {
    number: "04",
    title: "Report Preparation",
    text: "A formal valuation report is prepared with professional reasoning, figures, and relevant notes.",
  },
];

export const valuationPurposes = [
  "Sale or purchase decision",
  "Mortgage or bank security",
  "Probate and inheritance",
  "Court or legal documentation",
  "Insurance valuation",
  "Rent assessment",
  "Investment planning",
  "Company asset reporting",
];

export const aboutPoints = [
  "Clean corporate identity",
  "Valuation request funnel",
  "Trust-building service layout",
  "Professional Unsplash imagery",
  "Report-focused messaging",
  "Ready for Supabase backend",
];
