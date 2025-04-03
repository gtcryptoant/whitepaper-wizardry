
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FileText, Upload, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const WhitepaperManagement = () => {
  const [file, setFile] = useState<File | null>(null);
  const [currentWhitepaper, setCurrentWhitepaper] = useState<{ filename: string; updated_at: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCurrentWhitepaper();
  }, []);

  const fetchCurrentWhitepaper = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('whitepapers')
        .select('filename, updated_at')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') { // No data found error code
        console.error('Error fetching whitepaper:', error);
        return;
      }

      if (data) {
        setCurrentWhitepaper(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if file is a PDF
      if (selectedFile.type !== 'application/pdf') {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF document.",
        });
        return;
      }
      
      // Check file size (limit to 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
        });
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    try {
      setUploading(true);
      
      // Create a unique file path for storage
      const fileExt = file.name.split('.').pop();
      const fileName = `whitepaper-${Date.now()}.${fileExt}`;
      const filePath = `documents/${fileName}`;
      
      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('whitepapers')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Insert record in database
      const { error: insertError } = await supabase
        .from('whitepapers')
        .insert({
          filename: file.name,
          file_path: filePath,
          file_size: file.size,
          file_type: file.type
        });
        
      if (insertError) {
        throw insertError;
      }
      
      toast({
        title: "Whitepaper uploaded",
        description: "Your whitepaper has been updated successfully.",
      });
      
      // Refresh the current whitepaper data
      fetchCurrentWhitepaper();
      setFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('whitepaper-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error: any) {
      console.error('Error uploading whitepaper:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message || "There was an error uploading your whitepaper.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="bg-earth-800/60 border-earth-700">
      <CardHeader>
        <CardTitle className="text-vanilla-100">Whitepaper Management</CardTitle>
        <CardDescription className="text-vanilla-300">
          Upload or update the project whitepaper document
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {currentWhitepaper && (
            <div className="bg-earth-700/30 rounded-md p-4 border border-earth-600">
              <div className="flex items-start">
                <FileText className="h-5 w-5 text-vanilla-400 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-vanilla-100">{currentWhitepaper.filename}</h3>
                  <p className="text-sm text-vanilla-400">
                    Last updated: {new Date(currentWhitepaper.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <Label htmlFor="whitepaper-file" className="text-vanilla-200">
              {currentWhitepaper ? 'Update whitepaper' : 'Upload new whitepaper'}
            </Label>
            
            <div className="border-2 border-dashed border-earth-600 rounded-md p-6 text-center">
              <Input
                id="whitepaper-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf"
              />
              
              {file ? (
                <div className="space-y-2">
                  <div className="bg-vanilla-500/10 p-2 rounded inline-flex items-center">
                    <FileText className="h-4 w-4 text-vanilla-400 mr-2" />
                    <span className="text-vanilla-200 text-sm truncate max-w-xs">{file.name}</span>
                  </div>
                  <p className="text-xs text-vanilla-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <>
                  <label 
                    htmlFor="whitepaper-file" 
                    className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-earth-700 hover:bg-earth-600 cursor-pointer text-vanilla-200"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose PDF File
                  </label>
                  <p className="mt-3 text-sm text-vanilla-400">PDF files only, max 10MB</p>
                </>
              )}
            </div>
            
            {file && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-vanilla-300">
                  Click upload to replace the current whitepaper with this new version.
                </p>
                <Button 
                  onClick={handleUpload}
                  disabled={uploading}
                  className="bg-vanilla-500 hover:bg-vanilla-600 text-earth-900"
                >
                  {uploading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-earth-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>Upload Whitepaper</>
                  )}
                </Button>
              </div>
            )}
            
            <div className="pt-2">
              <div className="flex items-start text-amber-400 bg-amber-950/30 p-3 rounded-md">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <p className="text-sm">
                  The whitepaper will be publicly accessible to all visitors. Make sure it doesn't contain any confidential information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhitepaperManagement;
