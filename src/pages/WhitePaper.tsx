
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import TribalBackground from '@/components/TribalBackground';

const WhitePaper = () => {
  const [whitepaper, setWhitepaper] = useState<{ url: string; filename: string; updatedAt: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWhitepaper = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('whitepapers')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching whitepaper:', error);
          return;
        }

        if (data) {
          // Get the file URL from storage
          const { data: fileData } = await supabase.storage
            .from('whitepapers')
            .createSignedUrl(data.file_path, 60 * 60); // 1 hour expiry

          if (fileData) {
            setWhitepaper({
              url: fileData.signedUrl,
              filename: data.filename,
              updatedAt: new Date(data.updated_at).toLocaleDateString()
            });
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWhitepaper();
  }, []);

  return (
    <div className="min-h-screen bg-earth-900 text-vanilla-100 py-24">
      <TribalBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-display mb-8 text-vanilla-100">Vanilla Valley Whitepaper</h1>
          
          <Card className="bg-earth-800/70 border-earth-700 mb-8">
            <CardHeader>
              <CardTitle className="text-vanilla-100 flex items-center">
                <FileText className="mr-2 h-5 w-5 text-vanilla-400" />
                Project Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-vanilla-300 mb-6">
                Our whitepaper outlines the complete vision, tokenomics, and technical implementation of the Vanilla Valley ecosystem.
                This document provides detailed information for investors, partners, and community members.
              </p>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-10 h-10 border-4 border-vanilla-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-vanilla-400">Loading whitepaper...</p>
                </div>
              ) : whitepaper ? (
                <div className="bg-earth-700/50 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
                  <div>
                    <h3 className="font-medium text-vanilla-100 mb-1">{whitepaper.filename}</h3>
                    <p className="text-sm text-vanilla-400">Last updated: {whitepaper.updatedAt}</p>
                  </div>
                  <Button 
                    className="mt-4 md:mt-0 bg-vanilla-500 hover:bg-vanilla-600 text-earth-900"
                    onClick={() => window.open(whitepaper.url, '_blank')}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Whitepaper
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 border border-dashed border-earth-600 rounded-lg">
                  <FileText className="h-12 w-12 text-vanilla-500/50 mx-auto mb-3" />
                  <p className="text-vanilla-400">No whitepaper has been uploaded yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              className="border-earth-700 text-vanilla-300 hover:bg-earth-800 hover:text-vanilla-100"
              onClick={() => navigate('/')}
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhitePaper;
