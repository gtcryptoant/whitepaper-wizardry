
export interface Farm {
  id: string;
  name: string;
  location: string;
  hectares: number;
  establishedDate: string;
  performance: {
    yield: number;
    quality: number;
    sustainability: number;
  };
  tokens: {
    symbol: string;
    totalSupply: number;
    circulatingSupply: number;
    price: number;
    holders: number;
  };
  stats: {
    monthlyYield: number[];
    annualRevenue: number;
    projectedGrowth: number;
    lastHarvest: string;
    nextHarvest: string;
  };
  imageUrl?: string;
}
