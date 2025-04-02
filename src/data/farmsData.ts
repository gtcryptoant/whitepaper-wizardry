
import { Farm } from '@/types/farm';

// This is temporary data storage. In a production app, this would be fetched from Supabase
export const initialFarms: Farm[] = [
  {
    id: "1",
    name: "Vanilla Valley Farm 1",
    location: "Dominican Republic",
    hectares: 20,
    establishedDate: "2023-01-15",
    performance: {
      yield: 12,
      quality: 95,
      sustainability: 90
    },
    tokens: {
      symbol: "VVT",
      totalSupply: 20000,
      circulatingSupply: 15000,
      price: 20,
      holders: 125
    },
    stats: {
      monthlyYield: [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1],
      annualRevenue: 500000,
      projectedGrowth: 15,
      lastHarvest: "2024-03-01",
      nextHarvest: "2024-06-01"
    },
    description: "A beautiful vanilla farm in the heart of the Dominican Republic, focusing on sustainable farming practices and producing high-quality vanilla beans. Our team of local farmers uses traditional methods combined with modern technology to ensure the best yield while preserving the environment.",
    vision: "To create a sustainable and profitable vanilla farm that benefits the local community while providing investors with stable returns."
  },
  {
    id: "2",
    name: "Vanilla Valley Farm 2",
    location: "Madagascar",
    hectares: 15,
    establishedDate: "2022-11-20",
    performance: {
      yield: 10,
      quality: 92,
      sustainability: 88
    },
    tokens: {
      symbol: "VVT",
      totalSupply: 15000,
      circulatingSupply: 12000,
      price: 18,
      holders: 90
    },
    stats: {
      monthlyYield: [0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2],
      annualRevenue: 400000,
      projectedGrowth: 12,
      lastHarvest: "2024-02-15",
      nextHarvest: "2024-05-15"
    },
    description: "Located in Madagascar, one of the world's premier vanilla-growing regions, this farm produces some of the highest quality vanilla beans available. We work closely with local communities to ensure sustainable farming practices while maximizing yield and quality.",
    vision: "To be a leading vanilla producer in Madagascar, using sustainable farming practices that protect the environment and support local communities."
  },
  {
    id: "3",
    name: "Vanilla Valley Farm 3",
    location: "Indonesia",
    hectares: 18,
    establishedDate: "2023-03-10",
    performance: {
      yield: 11,
      quality: 94,
      sustainability: 89
    },
    tokens: {
      symbol: "VVT",
      totalSupply: 18000,
      circulatingSupply: 14000,
      price: 19,
      holders: 110
    },
    stats: {
      monthlyYield: [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1],
      annualRevenue: 450000,
      projectedGrowth: 14,
      lastHarvest: "2024-02-28",
      nextHarvest: "2024-05-28"
    },
    description: "Our Indonesian farm is nestled in the perfect climate for growing premium vanilla. We've implemented innovative farming techniques that help us achieve excellent yields while maintaining the highest quality standards. Our partnership with local farmers creates sustainable livelihoods and ensures traditional knowledge is preserved.",
    vision: "To create a model vanilla farm that demonstrates how sustainable agriculture can generate strong returns for both investors and local communities."
  }
];
