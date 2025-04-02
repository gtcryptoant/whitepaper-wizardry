
import { Farm } from '@/types/farm';

export const farmsData: Farm[] = [
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
    description: "A beautiful vanilla farm in the heart of the Dominican Republic.",
    vision: "To create a sustainable and profitable vanilla farm that benefits the local community."
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
    description: "A sustainable vanilla farm in Madagascar, known for its high-quality beans.",
    vision: "To be a leading vanilla producer in Madagascar, using sustainable farming practices."
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
    description: "An innovative vanilla farm in Indonesia, focused on community development.",
    vision: "To empower local farmers in Indonesia through sustainable vanilla farming."
  }
];
