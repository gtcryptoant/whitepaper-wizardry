
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Farm } from '@/types/farm';

// Sample initial farm data
const initialFarms = [
  {
    id: 'farm1',
    name: 'Madagascar Vanilla Estate',
    location: 'Madagascar, East Region',
    hectares: 25.5,
    establishedDate: '2021-03-15',
    performance: {
      yield: 87,
      quality: 92,
      sustainability: 78
    },
    tokens: {
      symbol: 'MDGV',
      totalSupply: 25000,
      circulatingSupply: 18750,
      price: 12.45,
      holders: 145
    },
    stats: {
      monthlyYield: [42, 45, 48, 50, 53, 55, 58, 60, 57, 54, 51, 48],
      annualRevenue: 320000,
      projectedGrowth: 12,
      lastHarvest: '2023-12-10',
      nextHarvest: '2024-06-15'
    },
    imageUrl: '/placeholder.svg'
  },
  {
    id: 'farm2',
    name: 'Tahiti Vanilla Gardens',
    location: 'Tahiti, French Polynesia',
    hectares: 18.7,
    establishedDate: '2022-02-08',
    performance: {
      yield: 82,
      quality: 95,
      sustainability: 88
    },
    tokens: {
      symbol: 'TAHV',
      totalSupply: 18700,
      circulatingSupply: 12500,
      price: 14.80,
      holders: 98
    },
    stats: {
      monthlyYield: [38, 40, 42, 45, 48, 51, 53, 55, 52, 48, 45, 42],
      annualRevenue: 276000,
      projectedGrowth: 15,
      lastHarvest: '2023-11-25',
      nextHarvest: '2024-05-20'
    },
    imageUrl: '/placeholder.svg'
  }
];

interface FarmState {
  farms: Farm[];
  addFarm: (farm: Farm) => void;
  updateFarm: (updatedFarm: Farm) => void;
  deleteFarm: (farmId: string) => void;
  getFarm: (farmId: string) => Farm | undefined;
  selectedFarmId: string | null;
  setSelectedFarmId: (farmId: string | null) => void;
  getFeaturedFarms: () => Farm[];
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const useFarmStore = create<FarmState>()(
  persist(
    (set, get) => ({
      farms: initialFarms,
      selectedFarmId: initialFarms.length > 0 ? initialFarms[0].id : null,
      isAdmin: false,
      
      addFarm: (farm) => set((state) => ({ 
        farms: [...state.farms, farm],
        selectedFarmId: farm.id
      })),
      
      updateFarm: (updatedFarm) => set((state) => ({
        farms: state.farms.map((farm) => 
          farm.id === updatedFarm.id ? updatedFarm : farm
        )
      })),
      
      deleteFarm: (farmId) => set((state) => {
        const newFarms = state.farms.filter((farm) => farm.id !== farmId);
        return {
          farms: newFarms,
          selectedFarmId: newFarms.length > 0 ? newFarms[0].id : null
        };
      }),
      
      getFarm: (farmId) => {
        return get().farms.find((farm) => farm.id === farmId);
      },
      
      setSelectedFarmId: (farmId) => set({ selectedFarmId: farmId }),
      
      getFeaturedFarms: () => {
        // Return top 3 farms sorted by quality
        return [...get().farms]
          .sort((a, b) => b.performance.quality - a.performance.quality)
          .slice(0, 3);
      },
      
      setIsAdmin: (isAdmin) => set({ isAdmin })
    }),
    {
      name: 'farm-storage',
    }
  )
);
