
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface FarmFormData {
  name: string;
  location: string;
  hectares: number;
  establishedDate: string;
  symbol: string;
}

interface AddFarmFormProps {
  onSubmit: (data: FarmFormData) => void;
  onCancel: () => void;
}

const AddFarmForm = ({ onSubmit, onCancel }: AddFarmFormProps) => {
  const [formData, setFormData] = useState<FarmFormData>({
    name: '',
    location: '',
    hectares: 0,
    establishedDate: '',
    symbol: '',
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FarmFormData, string>>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'hectares') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    // Clear error when field is edited
    if (errors[name as keyof FarmFormData]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FarmFormData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Farm name is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.hectares || formData.hectares <= 0) {
      newErrors.hectares = 'Valid hectare count is required';
    }
    
    if (!formData.establishedDate) {
      newErrors.establishedDate = 'Establishment date is required';
    }
    
    if (!formData.symbol.trim()) {
      newErrors.symbol = 'Token symbol is required';
    } else if (!/^[A-Z0-9]{2,6}$/.test(formData.symbol.trim())) {
      newErrors.symbol = 'Symbol must be 2-6 uppercase letters/numbers';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Farm Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Golden Vanilla Estate"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Madagascar"
                className={errors.location ? "border-destructive" : ""}
              />
              {errors.location && (
                <p className="text-sm text-destructive">{errors.location}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="hectares">Hectares</Label>
              <Input
                id="hectares"
                name="hectares"
                type="number"
                min="0"
                step="0.1"
                value={formData.hectares || ''}
                onChange={handleChange}
                placeholder="25"
                className={errors.hectares ? "border-destructive" : ""}
              />
              {errors.hectares && (
                <p className="text-sm text-destructive">{errors.hectares}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="establishedDate">Establishment Date</Label>
              <Input
                id="establishedDate"
                name="establishedDate"
                type="date"
                value={formData.establishedDate}
                onChange={handleChange}
                className={errors.establishedDate ? "border-destructive" : ""}
              />
              {errors.establishedDate && (
                <p className="text-sm text-destructive">{errors.establishedDate}</p>
              )}
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <Label htmlFor="symbol">Token Symbol</Label>
            <Input
              id="symbol"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              placeholder="VVT"
              className={errors.symbol ? "border-destructive" : ""}
            />
            <p className="text-xs text-earth-700 dark:text-vanilla-400">
              2-6 characters, uppercase letters and numbers only (e.g., VVT, GP01)
            </p>
            {errors.symbol && (
              <p className="text-sm text-destructive">{errors.symbol}</p>
            )}
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="tribal-button">
            Add Farm
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddFarmForm;
