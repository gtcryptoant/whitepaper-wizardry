
export interface ProjectParameter {
  id: string;
  name: string;
  description: string;
  value: string;
  category: 'financial' | 'operational' | 'technical' | 'other';
  lastUpdated: string;
}

export interface ProjectStats {
  totalFarms: number;
  totalTokenHolders: number;
  totalHectares: number;
  averageYield: number;
  projectValue: number;
}
