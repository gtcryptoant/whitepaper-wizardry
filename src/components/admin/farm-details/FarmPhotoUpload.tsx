
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImagePlus, Upload, Image as ImageIcon, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Farm } from '@/types/farm';

interface FarmPhotoUploadProps {
  farm: Farm;
  onPhotoUpload: (imageUrl: string) => void;
}

const FarmPhotoUpload = ({ farm, onPhotoUpload }: FarmPhotoUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(farm.imageUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size and type
    if (file.size > 2 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please select an image smaller than 2MB."
      });
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please select an image file."
      });
      return;
    }
    
    // Create a preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Simulate an upload (in a real app, you'd upload to your backend)
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      
      // For this demo, we'll just use the preview URL as the "uploaded" image URL
      // In a real app, you'd get back a URL from your server/storage service
      onPhotoUpload(reader.result as string);
      
      toast({
        title: "Photo uploaded",
        description: "Farm photo has been updated successfully."
      });
    }, 1500);
  };
  
  const removePicture = () => {
    setPreviewUrl(null);
    onPhotoUpload('/placeholder.svg');
    toast({
      title: "Photo removed",
      description: "Farm photo has been removed."
    });
  };
  
  return (
    <Card className="bg-earth-800/50 border-earth-700">
      <CardContent className="p-6">
        <h3 className="text-xl font-medium text-vanilla-100 mb-4">Farm Photos</h3>
        <p className="text-vanilla-300 mb-6">
          Upload high-quality images of your farm to showcase in the marketplace and investor dashboard.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-vanilla-200 font-medium mb-3">Main Farm Image</h4>
            
            {previewUrl ? (
              <div className="relative rounded-lg overflow-hidden border border-earth-600 h-64">
                <img 
                  src={previewUrl} 
                  alt="Farm preview" 
                  className="w-full h-full object-cover"
                />
                <Button 
                  size="sm" 
                  variant="destructive" 
                  className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                  onClick={removePicture}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center border border-dashed border-earth-600 rounded-lg bg-earth-900/30 h-64 p-6">
                <ImageIcon className="h-16 w-16 text-vanilla-400 mb-4" />
                <p className="text-vanilla-300 text-center mb-4">No farm image uploaded yet</p>
              </div>
            )}
            
            <div className="mt-4">
              <Input
                id="farm-photo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="farm-photo">
                <Button 
                  variant="outline" 
                  className="w-full border-vanilla-300 text-vanilla-300 hover:bg-earth-700"
                  disabled={isUploading}
                  asChild
                >
                  <span>
                    {isUploading ? (
                      <>Uploading...</>
                    ) : (
                      <>
                        <ImagePlus className="mr-2 h-4 w-4" />
                        {previewUrl ? 'Change Image' : 'Upload Image'}
                      </>
                    )}
                  </span>
                </Button>
              </label>
            </div>
          </div>
          
          <div>
            <h4 className="text-vanilla-200 font-medium mb-3">Tips for Great Farm Photos</h4>
            <ul className="space-y-2 text-vanilla-300">
              <li className="flex items-start">
                <span className="mr-2 text-vanilla-400">•</span>
                <span>Show the vanilla plants in their natural environment</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-vanilla-400">•</span>
                <span>Include photos during different growth stages if possible</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-vanilla-400">•</span>
                <span>Good lighting helps showcase the quality of your farm</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-vanilla-400">•</span>
                <span>Show any sustainable farming practices you use</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-vanilla-400">•</span>
                <span>Include wide shots of the entire farm when possible</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FarmPhotoUpload;
