
import React from 'react';
import { useForm } from 'react-hook-form';
import { Farm } from '@/types/farm';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface NewPartnerFormProps {
  onSubmit: (data: Farm) => void;
}

const NewPartnerForm: React.FC<NewPartnerFormProps> = ({ onSubmit }) => {
  const form = useForm<Partial<Farm>>({
    defaultValues: {
      name: '',
      location: '',
      hectares: 0,
      establishedDate: new Date().toISOString().split('T')[0],
      tokens: {
        symbol: '',
        totalSupply: 10000,
        circulatingSupply: 0,
        price: 10.0,
        holders: 1
      },
      performance: {
        yield: 75,
        quality: 80,
        sustainability: 70
      },
      stats: {
        monthlyYield: Array(12).fill(40),
        annualRevenue: 0,
        projectedGrowth: 10,
        lastHarvest: '',
        nextHarvest: ''
      }
    }
  });

  const handleSubmit = (data: Partial<Farm>) => {
    // Create a new farm with a unique ID
    const newFarm: Farm = {
      id: `farm${Date.now()}`, // Simple way to generate a unique ID
      name: data.name || 'New Farm',
      location: data.location || 'Unknown',
      hectares: data.hectares || 0,
      establishedDate: data.establishedDate || new Date().toISOString().split('T')[0],
      tokens: data.tokens || {
        symbol: '',
        totalSupply: 10000,
        circulatingSupply: 0,
        price: 10.0,
        holders: 1
      },
      performance: data.performance || {
        yield: 75,
        quality: 80,
        sustainability: 70
      },
      stats: data.stats || {
        monthlyYield: Array(12).fill(40),
        annualRevenue: 0,
        projectedGrowth: 10,
        lastHarvest: '',
        nextHarvest: ''
      }
    };

    onSubmit(newFarm);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-vanilla-200">Farm Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter farm name" 
                      className="bg-earth-700 border-earth-600 text-vanilla-50" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-vanilla-200">Location</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter farm location" 
                      className="bg-earth-700 border-earth-600 text-vanilla-50" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hectares"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-vanilla-200">Hectares</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      className="bg-earth-700 border-earth-600 text-vanilla-50" 
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="establishedDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-vanilla-200">Established Date</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      className="bg-earth-700 border-earth-600 text-vanilla-50" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <Card className="bg-earth-700/60 border-earth-600">
              <CardContent className="p-4">
                <h3 className="text-vanilla-100 font-medium mb-4">Token Settings</h3>
                
                <FormField
                  control={form.control}
                  name="tokens.symbol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-vanilla-200">Token Symbol</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="VNLA" 
                          className="bg-earth-600 border-earth-500 text-vanilla-50" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-4 bg-earth-600" />

                <h3 className="text-vanilla-100 font-medium mb-4">Initial Performance</h3>
                
                <FormField
                  control={form.control}
                  name="performance.yield"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-vanilla-200">Expected Yield (%)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="75" 
                          className="bg-earth-600 border-earth-500 text-vanilla-50" 
                          {...field}
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <FormField
                    control={form.control}
                    name="performance.quality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-vanilla-200">Quality (%)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="80" 
                            className="bg-earth-600 border-earth-500 text-vanilla-50" 
                            {...field}
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="performance.sustainability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-vanilla-200">Sustainability (%)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="70" 
                            className="bg-earth-600 border-earth-500 text-vanilla-50" 
                            {...field}
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => form.reset()}
            className="border-vanilla-400 text-vanilla-50 hover:bg-vanilla-500 hover:text-earth-900"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-cardano-500 hover:bg-cardano-600 text-white"
          >
            Add New Partner
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewPartnerForm;
