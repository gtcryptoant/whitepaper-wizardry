
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, ChevronDown, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import TribalBackground from '@/components/TribalBackground';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { initRevealAnimations } from '@/utils/revealAnimation';
import Navbar from '@/components/Navbar';

const WhitePaper = () => {
  const [whitepaper, setWhitepaper] = useState<{ url: string; filename: string; updatedAt: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const sections = [
    { id: 'welcome', title: '1. Welcome to Vanilla Valley' },
    { id: 'introduction', title: '2. Introduction' },
    { id: 'first-edition', title: 'First Edition Collection' },
    { id: 'project-structure', title: 'Project Structure' },
    { id: 'token-ecosystem', title: 'Token Ecosystem' },
    { id: 'roadmap', title: 'RoadMap' },
    { id: 'team', title: 'Team and Partners' },
    { id: 'regulatory', title: 'Regulatory Framework' },
    { id: 'faq', title: 'FAQ' }
  ];

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
    
    // Initialize animations
    const cleanupReveal = initRevealAnimations();
    return () => {
      cleanupReveal();
    };
  }, []);

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
    
    // Scroll to section after expanding
    if (activeSection !== sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleDownload = () => {
    if (whitepaper) {
      window.open(whitepaper.url, '_blank');
      toast({
        title: "Download started",
        description: "The whitepaper PDF is now downloading"
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-earth-900 text-vanilla-100">
      <Helmet>
        <title>VV Whitepaper | Vanilla Valley</title>
        <meta name="description" content="Read the Vanilla Valley whitepaper to learn about our sustainable vanilla farming project using blockchain technology." />
      </Helmet>
      
      <TribalBackground />
      <Navbar />
      
      <div className="container mx-auto px-4 relative z-10 pt-24 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center mb-12 text-center reveal-on-scroll">
            <h1 className="text-4xl md:text-5xl font-display mb-6 text-vanilla-100 tribal-glow">Vanilla Valley Whitepaper</h1>
            <p className="text-xl text-vanilla-300 max-w-3xl">
              Tokenizing sustainable vanilla farming for a regenerative future
            </p>
            
            {whitepaper && (
              <Button 
                onClick={handleDownload}
                className="mt-8 bg-vanilla-500 hover:bg-vanilla-600 text-earth-900 hover-scale"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Full PDF
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents - Desktop */}
            <div className="hidden lg:block sticky top-24 self-start">
              <Card className="bg-earth-800/70 border-earth-700">
                <CardHeader>
                  <CardTitle className="text-vanilla-100">Contents</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <a 
                        key={section.id}
                        href={`#${section.id}`}
                        className="block py-2 px-3 text-vanilla-300 hover:text-vanilla-100 hover:bg-earth-700/50 rounded-md transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        {section.title}
                      </a>
                    ))}
                  </nav>
                  
                  <div className="mt-6 pt-4 border-t border-earth-700">
                    <Button
                      variant="outline"
                      className="w-full border-earth-700 text-vanilla-300 hover:bg-earth-700 hover:text-vanilla-100"
                      onClick={() => navigate('/dashboard')}
                    >
                      Return to Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3" ref={contentRef}>
              <div className="space-y-8">
                {/* Welcome Section */}
                <section id="welcome" className="reveal-on-scroll">
                  <Card className="bg-earth-800/70 border-earth-700 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-earth-700/70 to-earth-800/40 cursor-pointer" onClick={() => toggleSection('welcome')}>
                      <CardTitle className="text-vanilla-100 flex items-center justify-between">
                        <span>1. Welcome to Vanilla Valley</span>
                        <ChevronDown className={cn("h-5 w-5 text-vanilla-400 transition-transform", activeSection === 'welcome' ? 'rotate-180' : '')} />
                      </CardTitle>
                    </CardHeader>
                    <div className={cn("transition-all duration-500 ease-in-out overflow-hidden", 
                      activeSection === 'welcome' || activeSection === null ? 'max-h-[3000px]' : 'max-h-0')}>
                      <CardContent className="pt-6">
                        <p className="text-vanilla-200 mb-4">
                          Welcome to Vanilla Valley, where tradition meets innovation to redefine the vanilla industry. Nestled in the fertile Hermanas Mirabal province of the Dominican Republic—a region celebrated for its rich agricultural heritage—we are cultivating a future where sustainability, profitability, and community empowerment thrive together.
                        </p>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Our Roots</h3>
                        <p className="text-vanilla-200 mb-4">
                          Vanilla Valley builds on the success of the Blue Mountain Forest Vanilla Farm, which spans nearly 40 hectares of lush rainforest. With 25,000 vanilla orchids flourishing, and 7,000 already producing harvest set to deliver four tons of premium green organic vanilla in the 2023/24 harvest. By growing vanilla in its natural habitat, we protect the trees of the rainforest while cultivating some of the finest organic vanilla in the world.
                        </p>
                        <p className="text-vanilla-200 mb-4">
                          Over the past five years, we've worked tirelessly to establish a profitable and sustainable vanilla farm. Along the way, we've partnered with organisations who recognized the exceptional quality of our product and saw its vast potential. Their encouragement inspired a bold vision: leveraging the existing organic farming infrastructure of the Dominican Republic to teach local farmers how to grow vanilla alongside their current crops.
                        </p>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">The Opportunity</h3>
                        <p className="text-vanilla-200 mb-4">
                          This idea sparked a new way forward. By integrating vanilla cultivation with existing agricultural practices, we will:
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-vanilla-200 space-y-2">
                          <li>Increase organic vanilla production through the Cacao farming infrastructure.</li>
                          <li>Enhance biodiversity in our forests and land.</li>
                          <li>Empower local farmers with fair wages, providing education and tools for sustainable practices.</li>
                          <li>Provide Finance access to farmers for start up costs.</li>
                        </ul>
                        <p className="text-vanilla-200 mb-4">
                          Drawing on the knowledge and experience we've gained, we realized that empowering small-scale farmers through access to financing is key to unlocking the full potential of vanilla cultivation. Our vision is to support these farmers by financing their projects, establishing their vanilla farms, and providing guidance on cultivation and harvesting. In return, we offer a guaranteed purchase of their vanilla at a fixed price. This collaborative model not only ensures sustainable growth for the farmers but also offers you the opportunity to be part of this impactful journey by financing their success.
                        </p>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">The Vanilla Valley Token (VVT)</h3>
                        <p className="text-vanilla-200 mb-4">
                          The Vanilla Valley Token (VVT) is our innovative solution to empower small-scale farmers and cooperatives. By providing the necessary funding for farm development up to year four—when the first vanilla harvests begin—VVT ensures the resources needed for farmers to establish thriving vanilla operations. Beyond funding, it offers a transparent and seamless way to distribute profits from harvests back to the investor community and participating farmers.
                        </p>
                        <p className="text-vanilla-200 mb-6">
                          By supporting Vanilla Valley, you're supporting a vision that harnesses blockchain technology to drive regenerative agriculture, enhance livelihoods, and build equitable opportunities for small-scale farmers and cooperatives.
                        </p>
                        
                        <div className="bg-earth-700/30 border border-earth-600 rounded-lg p-4 text-vanilla-100">
                          <p className="italic">
                            "This white paper outlines our vision in detail, providing the information you need to understand the opportunity, assess its potential, and determine how this initiative aligns with your values and aspirations."
                          </p>
                          <p className="mt-4">
                            Together, let's cultivate a future where farmers flourish, communities thrive, and sustainability and profitability go hand in hand.
                          </p>
                          <p className="mt-2 font-medium">
                            Welcome to Vanilla Valley.
                          </p>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </section>
                
                {/* Introduction Section */}
                <section id="introduction" className="reveal-on-scroll">
                  <Card className="bg-earth-800/70 border-earth-700 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-earth-700/70 to-earth-800/40 cursor-pointer" onClick={() => toggleSection('introduction')}>
                      <CardTitle className="text-vanilla-100 flex items-center justify-between">
                        <span>2. Introduction</span>
                        <ChevronDown className={cn("h-5 w-5 text-vanilla-400 transition-transform", activeSection === 'introduction' ? 'rotate-180' : '')} />
                      </CardTitle>
                    </CardHeader>
                    <div className={cn("transition-all duration-500 ease-in-out overflow-hidden", 
                      activeSection === 'introduction' ? 'max-h-[3000px]' : 'max-h-0')}>
                      <CardContent className="pt-6">
                        <p className="text-vanilla-200 mb-4">
                          The global vanilla industry is in need of transformation, burdened by environmental, social, and economic challenges. With 80% of production concentrated in Madagascar, the supply chain is highly vulnerable to climate change, natural disasters, and political instability. Monoculture farming practices exacerbate the problem, leading to deforestation, biodiversity loss, and soil degradation. At the same time, farmers face financial instability, unpredictable market prices, and limited access to fair trade opportunities, threatening the long-term sustainability of vanilla production.
                        </p>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Concentration of Production</h3>
                        <p className="text-vanilla-200 mb-4">
                          Madagascar accounts for approximately 80% of the world's vanilla supply. This heavy reliance on a single source makes the global supply chain highly susceptible to various disruptions.
                        </p>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Environmental Challenges</h3>
                        <ul className="list-disc pl-6 mb-4 text-vanilla-200 space-y-2">
                          <li><span className="font-medium">Climate Vulnerability:</span> Madagascar's vanilla production is highly vulnerable to climate change and natural disasters. The region has experienced devastating cyclones, such as those in 2024, which have significantly impacted vanilla cultivation.</li>
                          <li><span className="font-medium">Monoculture Practices:</span> The prevalence of monoculture farming in vanilla cultivation has led to environmental degradation, including deforestation, biodiversity loss, and soil degradation.</li>
                        </ul>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Economic and Social Challenges</h3>
                        <ul className="list-disc pl-6 mb-6 text-vanilla-200 space-y-2">
                          <li><span className="font-medium">Market Volatility:</span> The vanilla market is characterized by significant price volatility, which affects the economic stability of farmers.</li>
                          <li><span className="font-medium">Farmer Livelihoods:</span> Small-scale farmers often face financial instability due to unpredictable market prices and limited access to fair trade opportunities. This economic uncertainty threatens the long-term sustainability of vanilla production.</li>
                        </ul>
                        
                        <div className="bg-earth-700/30 border border-earth-600 rounded-lg p-4 text-vanilla-100 mb-6">
                          <p>
                            Let's face it, these combined challenges underscore the need for transformation within the vanilla industry to promote environmental sustainability, economic stability, and social equity.
                          </p>
                        </div>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">A New Way Forward</h3>
                        <p className="text-vanilla-200 mb-4">
                          The Vanilla Valley Project offers a simple solution, which is only possible now because of the emergence of blockchain technology. By blending blockchain technology with sustainable farming practices we can transforms the vanilla supply chain while benefiting farmers, ecosystems, and investors alike.
                        </p>
                        <p className="text-vanilla-200 mb-4">
                          Here's how it works: We tokenize vanilla orchids, enabling farmers in the Dominican Republic to grow vanilla alongside existing crops like cacao. This integration fosters biodiverse ecosystems, ensures fair wages, and provides farmers with stable incomes. By returning vanilla cultivation to its natural rainforest habitat in the Caribbean, we also promote reforestation and regenerative agroforestry.
                        </p>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Our Mission and Vision</h3>
                        <p className="text-vanilla-200 mb-4">
                          At Vanilla Valley, our mission is to evolve vanilla farming by producing premium-quality vanilla in its native habitat while supporting sustainable practices, fair wages, and thriving ecosystems.
                        </p>
                        <p className="text-vanilla-200 mb-4">
                          Our vision is to create a replicable model that aligns ethical impact with scalable profitability, setting a new benchmark for sustainable agriculture.
                        </p>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">What We Aim to Achieve</h3>
                        <p className="text-vanilla-200 mb-2">Through Vanilla Valley, we strive to:</p>
                        <ul className="list-disc pl-6 mb-4 text-vanilla-200 space-y-2">
                          <li>Enhance biodiversity by growing vanilla alongside cacao, creating balanced and thriving ecosystems.</li>
                          <li>Empower farmers with fair and stable wages, recognising their critical role in sustainable farming.</li>
                          <li>Build a scalable model for profitable agriculture, paving the way for future regenerative ventures.</li>
                        </ul>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Why It Matters</h3>
                        <p className="text-vanilla-200 mb-4">
                          Investors are key to solving the critical challenges facing the vanilla industry and the communities that depend on it. By supporting Vanilla Valley, you're directly contributing to solutions for environmental degradation, economic instability, and biodiversity loss. Your investment drives the cultivation of premium organic vanilla in biodiverse, regenerative ecosystems, while empowering farmers with fair wages and stable incomes.
                        </p>
                        <p className="text-vanilla-200">
                          This model not only addresses the vulnerabilities of the vanilla supply chain but also bridges the gap between economic opportunity and environmental stewardship. Together, we're building a resilient future where sustainability and profitability reinforce one another, ensuring lasting benefits for communities, ecosystems, and investors alike.
                        </p>
                      </CardContent>
                    </div>
                  </Card>
                </section>
                
                {/* First Edition Collection */}
                <section id="first-edition" className="reveal-on-scroll">
                  <Card className="bg-earth-800/70 border-earth-700 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-earth-700/70 to-earth-800/40 cursor-pointer" onClick={() => toggleSection('first-edition')}>
                      <CardTitle className="text-vanilla-100 flex items-center justify-between">
                        <span>First Edition Collection</span>
                        <ChevronDown className={cn("h-5 w-5 text-vanilla-400 transition-transform", activeSection === 'first-edition' ? 'rotate-180' : '')} />
                      </CardTitle>
                    </CardHeader>
                    <div className={cn("transition-all duration-500 ease-in-out overflow-hidden", 
                      activeSection === 'first-edition' ? 'max-h-[3000px]' : 'max-h-0')}>
                      <CardContent className="pt-6">
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Project Overview and Achievements</h3>
                        <p className="text-vanilla-200 mb-4">
                          The First Edition Collection marked the beginning of Vanilla Valley's journey, successfully combining sustainable agriculture with blockchain innovation. This inaugural project demonstrated the feasibility of tokenizing real-world assets while providing tangible value to both investors and the farming community.
                        </p>
                        <ul className="list-disc pl-6 mb-6 text-vanilla-200 space-y-2">
                          <li><span className="font-medium">Tokenization of 4,000 Vanilla Plants:</span> The First Edition involved the successful tokenization of 4,000 vanilla orchids, each in their 6th year of maturity. These plants were divided into 800 NFT tokens, with each token representing ownership of 5 vanilla orchids.</li>
                        </ul>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Project Highlights</h3>
                        <ul className="list-disc pl-6 mb-6 text-vanilla-200 space-y-2">
                          <li><span className="font-medium">NFT-Based Investment:</span> Each NFT token was priced at $350, offering investors a unique opportunity to own a share of the vanilla farming process while earning passive income from the plants' harvest.</li>
                          <li><span className="font-medium">Blockchain Integration:</span> Leveraging the Cardano blockchain, this project ensured secure, transparent, and traceable transactions, reinforcing investor confidence.</li>
                          <li><span className="font-medium">Early Adoption and Success:</span> The First Edition Collection was a sold-out success, attracting investors who aligned with Vanilla Valley's mission of combining sustainability with profitability.</li>
                          <li><span className="font-medium">First Harvest Payout:</span> Investors received their first payout in 2024, marking a key milestone and demonstrating the potential for long-term returns from Vanilla Valley Tokens (VVT).</li>
                        </ul>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Achievements and Impact</h3>
                        <ol className="list-decimal pl-6 mb-6 text-vanilla-200 space-y-4">
                          <li>
                            <span className="font-medium">Foundation for Vanilla Valley Token (VVT):</span> The First Edition laid the groundwork for launching the VVT ecosystem, proving the viability of tokenized investments tied to real-world assets. This success attracted further interest from both institutional and retail investors.
                          </li>
                          <li>
                            <span className="font-medium">Sustainability in Action:</span> By tokenizing vanilla orchids grown in a biodiverse and sustainable environment, this project emphasized the importance of environmentally responsible farming practices. The 6th-year maturity of the plants ensured that the orchids were already productive, offering immediate returns to investors.
                          </li>
                          <li>
                            <span className="font-medium">Demonstration of Blockchain Potential:</span> Integrating the Cardano blockchain provided transparency and security, demonstrating how blockchain technology could support regenerative agriculture. The project showcased how NFTs could represent ownership of physical assets, providing a scalable model for future expansions.
                          </li>
                          <li>
                            <span className="font-medium">Investor Confidence:</span> The sold-out status of the collection and the timely 2024 payout strengthened investor confidence in Vanilla Valley's vision, setting the stage for subsequent presale campaigns and larger-scale projects.
                          </li>
                        </ol>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Key Figures</h3>
                        <ul className="list-disc pl-6 mb-6 text-vanilla-200 space-y-2">
                          <li><span className="font-medium">4,000 Orchids Tokenized:</span> Matured to their 6th year, ensuring consistent productivity and returns.</li>
                          <li><span className="font-medium">800 NFT Tokens:</span> Each token backed by 5 vanilla orchids.</li>
                          <li><span className="font-medium">$350 Token Price:</span> Offering an accessible entry point for early adopters.</li>
                          <li><span className="font-medium">Blockchain:</span> Cardano, chosen for its low fees, scalability, and environmental efficiency.</li>
                          <li><span className="font-medium">Payouts:</span> First harvest distribution completed in 2024, delivering on the project's promise of passive income.</li>
                        </ul>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Legacy and Future Growth</h3>
                        <p className="text-vanilla-200 mb-4">
                          The First Edition Collection demonstrated Vanilla Valley's ability to merge agriculture with blockchain, setting the stage for larger-scale projects like the Vanilla Valley Token (VVT). By creating a sustainable, transparent, and profitable ecosystem, this inaugural project provided a replicable model for future ventures, inspiring confidence in Vanilla Valley's long-term vision.
                        </p>
                        <p className="text-vanilla-200 mb-4">
                          This achievement not only validated the project's mission but also laid the foundation for expanding Vanilla Valley's reach, attracting a growing community of investors, and building a future where sustainability and profitability go hand in hand.
                        </p>
                        <p className="text-vanilla-200">
                          <span className="font-medium">Policy ID:</span> 4b702fbf22b5c48a2bd6fe867f90b49387053218cf50d8efffdef8d5
                        </p>
                      </CardContent>
                    </div>
                  </Card>
                </section>
                
                {/* Project Structure Section */}
                <section id="project-structure" className="reveal-on-scroll">
                  <Card className="bg-earth-800/70 border-earth-700 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-earth-700/70 to-earth-800/40 cursor-pointer" onClick={() => toggleSection('project-structure')}>
                      <CardTitle className="text-vanilla-100 flex items-center justify-between">
                        <span>Project Structure</span>
                        <ChevronDown className={cn("h-5 w-5 text-vanilla-400 transition-transform", activeSection === 'project-structure' ? 'rotate-180' : '')} />
                      </CardTitle>
                    </CardHeader>
                    <div className={cn("transition-all duration-500 ease-in-out overflow-hidden", 
                      activeSection === 'project-structure' ? 'max-h-[3000px]' : 'max-h-0')}>
                      <CardContent className="pt-6">
                        <p className="text-vanilla-200 mb-6">
                          The Vanilla Valley Project follows a structured approach to vanilla farming, ensuring efficiency, sustainability, and subsequently profitability for investors. The key components of the project's structure include farm development, contract farming, monitoring, and reporting.
                        </p>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Farm Development</h3>
                        <p className="text-vanilla-200 mb-4">
                          The project begins with the selection of suitable land and its preparation for vanilla cultivation. This includes:
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-vanilla-200 space-y-2">
                          <li><span className="font-medium">Land preparation:</span> Soil testing, irrigation system installation, and trellis setup for vanilla vines.</li>
                          <li><span className="font-medium">Vanilla planting:</span> Planting of high-quality Vanilla planifolia orchids, which thrive in the warm, humid conditions of the Dominican Republic.</li>
                        </ul>
                        <p className="text-vanilla-200 mb-6">
                          The plants are nurtured using organic methods, with careful attention to watering, pest control, and fertilization. Vanilla orchids typically take 3-4 years to reach maturity, at which point they begin producing high-value vanilla beans.
                        </p>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Contract Farming Model</h3>
                        <p className="text-vanilla-200 mb-4">
                          Vanilla Valley adopts a contract farming approach, partnering with local farmers to manage vanilla cultivation. Farmers are provided with:
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-vanilla-200 space-y-2">
                          <li>Inputs such as seedlings, tools, and technical support.</li>
                          <li>Training programs led by agricultural experts to enhance their skills in organic farming methods.</li>
                        </ul>
                        <p className="text-vanilla-200 mb-6">
                          In return, farmers manage the daily care of the vanilla plants and receive a share of the profits, ensuring financial stability and fostering their commitment to the project's success.
                        </p>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Monitoring and Reporting</h3>
                        <p className="text-vanilla-200 mb-6">
                          A robust monitoring and control system ensures farm efficiency and transparency. Regular inspections, blockchain-based recordkeeping, and detailed investor reports provide insights into farm operations, plant health, and overall progress.
                        </p>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Investment Allocation</h3>
                        <p className="text-vanilla-200 mb-4">
                          Funds are allocated to critical components of the project:
                        </p>
                        <ul className="list-disc pl-6 mb-6 text-vanilla-200 space-y-2">
                          <li><span className="font-medium">30% Plant Acquisition:</span> Purchase of high-quality seedlings, transportation, and planting costs.</li>
                          <li><span className="font-medium">20% Farm Infrastructure:</span> Development of irrigation systems, trellises, and storage facilities.</li>
                          <li><span className="font-medium">15% Technical Support and Training:</span> Salaries for agricultural experts and farmer training programs.</li>
                          <li><span className="font-medium">15% Farmer Salaries:</span> Guaranteed payments to farmers for their role in cultivation.</li>
                          <li><span className="font-medium">10% Monitoring and Reporting:</span> Blockchain integration and regular inspections to ensure transparency.</li>
                          <li><span className="font-medium">10% Contingency Fund:</span> Reserved for unforeseen expenses, such as adverse weather or crop diseases.</li>
                        </ul>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Function of the Native Token: Vanilla Valley Token (VVT)</h3>
                        <p className="text-vanilla-200 mb-4">
                          The Vanilla Valley Token (VVT) is the native utility token of the Vanilla Valley Project, with the following primary functions:
                        </p>
                        <ol className="list-decimal pl-6 mb-4 text-vanilla-200 space-y-2">
                          <li>
                            <span className="font-medium">Ownership Representation:</span> Each VVT represents tokenized ownership of a vanilla orchid, linking holders to a tangible agricultural asset. Covering:
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                              <li>Land costs</li>
                              <li>Cultivation and care of vanilla orchids</li>
                              <li>Administration and processing fees</li>
                            </ul>
                          </li>
                          <li><span className="font-medium">Dividend Distribution:</span> VVT holders earn a share of the profits from vanilla harvest sales.</li>
                          <li><span className="font-medium">Farm Growth:</span> Each Farm Starts at 1000 Plants per Hectare, increasing to a maximum of 2500 per Hectare harvest producing plants.</li>
                          <li><span className="font-medium">Liquidity and Tradability:</span> VVT can be bought, sold, or traded directly Cardano Marketplaces, allowing investors flexibility in managing their assets.</li>
                          <li><span className="font-medium">Sustainability Support:</span> By holding VVT, investors contribute to reforestation and sustainable farming practices embedded in the project's operations.</li>
                        </ol>
                        <p className="text-vanilla-200 mb-6">
                          In essence, VVT serves as a financial, operational, and sustainability-driven cornerstone of the Vanilla Valley ecosystem.
                        </p>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Supply and distribution:</h3>
                        <ul className="list-disc pl-6 mb-6 text-vanilla-200 space-y-2">
                          <li><span className="font-medium">Max Supply:</span> 250,000<br/>Represents the maximum vanilla orchids when each farm is at full capacity. A maximum of 2500 plants per hectare.</li>
                          <li><span className="font-medium">Initial supply:</span> 100,000<br/>Represents the initial amount of plants available for project launch.</li>
                          <li><span className="font-medium">Community Rewards:</span> 150,000<br/>The Remaining token to be distributed as rewards to our investor community as farm value grows.</li>
                        </ul>
                        <p className="text-vanilla-200 mb-6">
                          <span className="font-medium">Increase of circulating supply</span> - As each plant reaches maturity it then produces baby orchids. When the baby orchids have matured to produce harvest, a VVT token will be distributed to exiting holders. Hence the Supply would increase by 1 token.
                        </p>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Token Growth and Value Appreciation</h3>
                        <p className="text-vanilla-200 mb-4">
                          The Vanilla Valley Token (VVT) is designed to offer a dynamic and multi-faceted growth model that combines plant value appreciation, harvest income, and natural plant propagation. Over time, each VVT token increases in value through the following mechanisms:
                        </p>
                        <ol className="list-decimal pl-6 mb-6 text-vanilla-200 space-y-4">
                          <li>
                            <span className="font-medium">Plant Value Growth</span><br/>
                            Each VVT token is backed by a physical vanilla orchid, whose value appreciates as the orchid grows. The plant's value increases by $2 for every pair of leaves it develops, with an average annual growth of 15 pairs, resulting in an estimated $30 appreciation per year. Growth of the plant is verified through a transparent auditing system linked to the orchid's growth, ensuring accuracy and trust.<br/><br/>
                            Token holders can realize this value by selling and trading their tokens on a dedicated NFT marketplace.
                          </li>
                          <li>
                            <span className="font-medium">Harvest Income</span><br/>
                            Starting in year four, each vanilla plant produces a harvest, generating passive income for token holders. For every kilogram of green vanilla beans harvested, holders earn $7.50.<br/><br/>
                            These payouts are automatically airdropped to wallets holding VVT tokens.
                          </li>
                          <li>
                            <span className="font-medium">Propagation and New Token Airdrops</span><br/>
                            Vanilla orchids naturally propagate by producing side shoots or "baby plants" within 4-7 years. These new plants are tokenized and released from the project's treasury as additional tokens. Eligible wallets receive these new tokens as free airdrops, representing ownership of the vanilla orchid.<br/><br/>
                            Each new token starts with an initial value of $30 and follows the same growth and harvest patterns as the original plant, further enhancing the long-term returns for investors.
                          </li>
                        </ol>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Let's take a closer look…</h3>
                        <p className="text-vanilla-200 mb-4">
                          The table below shows the projected return on investment for your initial VVT over the first 16 years of the investment.
                        </p>
                        <p className="text-vanilla-200 mb-4">
                          Price Per VVToken: $30<br/>
                          The table below outlines the value growth of 1 VVT token over the first 16 years of your investment.
                        </p>
                        
                        <div className="overflow-x-auto mb-8">
                          <table className="min-w-full bg-earth-700/30 rounded-lg">
                            <thead>
                              <tr className="bg-earth-700/70 text-vanilla-100">
                                <th className="px-4 py-2 text-left">Year</th>
                                <th className="px-4 py-2 text-left">Harvest Kilo</th>
                                <th className="px-4 py-2 text-left">Annual Harvest Payout</th>
                                <th className="px-4 py-2 text-left">Accumulated Received Payout</th>
                                <th className="px-4 py-2 text-left">Plant Value</th>
                                <th className="px-4 py-2 text-left">Total Value Initial Token</th>
                              </tr>
                            </thead>
                            <tbody className="text-vanilla-200">
                              <tr className="border-t border-earth-600">
                                <td className="px-4 py-2">1</td>
                                <td className="px-4 py-2">0</td>
                                <td className="px-4 py-2">0</td>
                                <td className="px-4 py-2">$ 0</td>
                                <td className="px-4 py-2">$ 30</td>
                                <td className="px-4 py-2">$ 30</td>
                              </tr>
                              <tr className="border-t border-earth-600">
                                <td className="px-4 py-2">2</td>
                                <td className="px-4 py-2">0</td>
                                <td className="px-4 py-2">0</td>
                                <td className="px-4 py-2">$ 0</td>
                                <td className="px-4 py-2">$ 60</td>
                                <td className="px-4 py-2">$ 60</td>
                              </tr>
                              <tr className="border-t border-earth-600">
                                <td className="px-4 py-2">3</td>
                                <td className="px-4 py-2">0</td>
                                <td className="px-4 py-2">0</td>
                                <td className="px-4 py-2">$ 0</td>
                                <td className="px-4 py-2">$ 90</td>
                                <td className="px-4 py-2">$ 90</td>
                              </tr>
                              <tr className="border-t border-earth-600">
                                <td className="px-4 py-2">4</td>
                                <td className="px-4 py-2">1</td>
                                <td className="px-4 py-2">7.5</td>
                                <td className="px-4 py-2">$ 7.50</td>
                                <td className="px-4 py-2">$ 120</td>
                                <td className="px-4 py-2">$ 127.50</td>
                              </tr>
                              <tr className="border-t border-earth-600">
                                <td className="px-4 py-2">5</td>
                                <td className="px-4 py-2">2</td>
                                <td className="px-4 py-2">15</td>
                                <td className="px-4 py-2">$ 22.50</td>
                                <td className="px-4 py-2">$ 150</td>
                                <td className="px-4 py-2">$ 172.50</td>
                              </tr>
                              <tr className="border-t border-earth-600">
                                <td className="px-4 py-2">6</td>
                                <td className="px-4 py-2">2</td>
                                <td className="px-4 py-2">15</td>
                                <td className="px-4 py-2">$ 37.50</td>
                                <td className="px-4 py-2">$ 210</td>
                                <td className="px-4 py-2">$ 247.50</td>
                              </tr>
                              <tr className="border-t border-earth-600">
                                <td className="px-4 py-2">16</td>
                                <td className="px-4 py-2">6</td>
                                <td className="px-4 py-2">45</td>
                                <td className="px-4 py-2">$ 397.50</td>
                                <td className="px-4 py-2">$ 810</td>
                                <td className="px-4 py-2">$ 1,207.50</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">The story in words:</h3>
                        <ul className="list-disc pl-6 mb-6 text-vanilla-200 space-y-2">
                          <li>By the end of Year 3, due to physical growth. The plant's real world value reaches $90.</li>
                          <li>In Year 4, your plant produces its first harvest, typically the smallest. This marks the start of your passive income, with an estimated payout of $8, depending on harvest quantity. Meanwhile, the plant's value grows to $120, giving each original token a total real-world value of $128.</li>
                          <li>In Year 6, your harvest quantity increases, with a passive income payout of $39—exceeding your initial investment per token. Your plant is now mature and valued at $219. Additionally, you receive a free airdrop of a new token, backed by a baby vanilla orchid, valued at $30. The total real-world value of each original token is $249.</li>
                          <li>In Year 9, your original plant reaches close to peak productivity, generating a harvest payout of $98 per VVT token and increasing its value to $368. You also receive your first $8 payout from the baby plant's harvest, which is now valued at $120. The total real-world value of each original token is $495.</li>
                        </ul>
                        <p className="text-vanilla-200">
                          Plants grow at different rates depending on various factors. The numbers we've shared are projections based on our research and experience growing vanilla in this region. While they provide a good estimate, actual growth and production may vary.
                        </p>
                      </CardContent>
                    </div>
                  </Card>
                </section>
                
                {/* Token Ecosystem Section */}
                <section id="token-ecosystem" className="reveal-on-scroll">
                  <Card className="bg-earth-800/70 border-earth-700 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-earth-700/70 to-earth-800/40 cursor-pointer" onClick={() => toggleSection('token-ecosystem')}>
                      <CardTitle className="text-vanilla-100 flex items-center justify-between">
                        <span>Token Ecosystem</span>
                        <ChevronDown className={cn("h-5 w-5 text-vanilla-400 transition-transform", activeSection === 'token-ecosystem' ? 'rotate-180' : '')} />
                      </CardTitle>
                    </CardHeader>
                    <div className={cn("transition-all duration-500 ease-in-out overflow-hidden", 
                      activeSection === 'token-ecosystem' ? 'max-h-[3000px]' : 'max-h-0')}>
                      <CardContent className="pt-6">
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Vanilla Nomads - The RWA Investment club</h3>
                        <h4 className="text-lg font-medium text-vanilla-300 mb-3">A Community for Purpose-Driven Wealth Creation</h4>
                        <p className="text-vanilla-200 mb-4">
                          VValley Valley Nomads is a blockchain-powered community that connects entrepreneurs, professionals, and innovators committed to financial independence, sustainable wealth creation, and social impact. Members embrace a nomadic mindset, seeking opportunities to grow wealth responsibly while driving positive change globally.
                        </p>
                        <p className="text-vanilla-200 mb-4">
                          By leveraging blockchain technology, Valley Nomads provides access to decentralized investment opportunities tied to real-world assets (RWAs). These secure, transparent investments generate passive income while supporting projects that align with global sustainability goals.
                        </p>
                        <p className="text-vanilla-200 mb-6">
                          Our flagship venture, the Vanilla Valley Token (VVT), enables members to invest in sustainable vanilla farming in the Dominican Republic. By tokenizing vanilla orchids, we provide a transparent and scalable way for our community to support regenerative agriculture while earning rewards tied to organic vanilla production. VVT is the foundation of a broader vision to redefine wealth creation—aligning financial growth with sustainability and collective prosperity.
                        </p>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">What We Stand For</h3>
                        <ul className="list-disc pl-6 mb-6 text-vanilla-200 space-y-2">
                          <li><span className="font-medium">Empowering Financial Freedom:</span> We provide access to innovative, income-generating investments that align with your values.</li>
                          <li><span className="font-medium">Driving Positive Impact:</span> Every investment supports environmental restoration, fair trade, and sustainable development.</li>
                          <li><span className="font-medium">Fostering Collective Success:</span> Together, we are building a decentralized portfolio of RWAs designed to grow wealth and create lasting change.</li>
                        </ul>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Community Vision</h3>
                        <p className="text-vanilla-200 mb-6">
                          To build a $1 billion decentralized portfolio of global, income-generating RWAs, creating long-term passive income for members while ensuring that both individuals and the planet flourish.
                        </p>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Membership Collection: Your Gateway to Impact and Opportunity</h3>
                        <p className="text-vanilla-200 mb-4">
                          Our Community Collection is a limited-edition PFP (Profile Picture) series, each a unique piece of digital art crafted by renowned NFT artist. Beyond the art, these tokens serve as an exclusive pass to participate passively in the Vanilla Valley ecosystem and gain first access to future real-world asset (RWA) investment opportunities.
                        </p>
                        <p className="text-vanilla-200 mb-6">
                          <span className="font-medium">Collection Details:</span><br/>
                          Quantity: 10,000 Tokens<br/>
                          Price: 200 ADA
                        </p>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Utility and Benefits</h3>
                        <ul className="list-disc pl-6 mb-6 text-vanilla-200 space-y-2">
                          <li><span className="font-medium">Exclusive Access:</span> Unlock premium organic vanilla products from our sustainable farms, directly connecting you to the impact you support.</li>
                          <li><span className="font-medium">Passive income:</span> Holders receive airdrops of 5 Vanilla Valley Tokens (VVT), providing access to financial returns and supporting environmental initiatives.</li>
                          <li><span className="font-medium">Active Participation:</span> Join reforestation efforts, visit your farm, biodiversity preservation campaigns, and ecological restoration projects to make a tangible difference.</li>
                          <li><span className="font-medium">First Access to RWA Opportunities:</span> Gain priority entry to future ethical investment opportunities that merge financial growth with sustainability.</li>
                        </ul>
                        
                        <div className="bg-earth-700/30 border border-earth-600 rounded-lg p-4 text-vanilla-100">
                          <p>
                            Our Community Tokens provide the opportunity to join a community, that's aligned with a clear and actionable shared vision for a sustainable, equitable future where financial success and environmental impact go hand in hand. Together, we're shaping a new standard for investment and innovation.
                          </p>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </section>
                
                {/* Roadmap Section */}
                <section id="roadmap" className="reveal-on-scroll">
                  <Card className="bg-earth-800/70 border-earth-700 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-earth-700/70 to-earth-800/40 cursor-pointer" onClick={() => toggleSection('roadmap')}>
                      <CardTitle className="text-vanilla-100 flex items-center justify-between">
                        <span>RoadMap</span>
                        <ChevronDown className={cn("h-5 w-5 text-vanilla-400 transition-transform", activeSection === 'roadmap' ? 'rotate-180' : '')} />
                      </CardTitle>
                    </CardHeader>
                    <div className={cn("transition-all duration-500 ease-in-out overflow-hidden", 
                      activeSection === 'roadmap' ? 'max-h-[3000px]' : 'max-h-0')}>
                      <CardContent className="pt-6">
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Completed:</h3>
                        <ul className="list-disc pl-6 mb-6 text-vanilla-200 space-y-2">
                          <li>Establish Contract Farming Agreements with local farmers and co-operatives, providing them with resources, training, and support for vanilla cultivation.</li>
                          <li>First Edition Collection - Sold Out.</li>
                          <li>120,000 Vanilla Orchids ready for planting</li>
                        </ul>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">2025: Project Growth</h3>
                        <h4 className="text-lg font-medium text-vanilla-300 mb-2">Q1 2025:</h4>
                        <ul className="list-disc pl-6 mb-4 text-vanilla-200 space-y-2">
                          <li>Release of the updated Whitepaper outlining project goals and strategies.</li>
                          <li>Completion of Re-branding to align with project vision and community values.</li>
                          <li>Asset Creation for marketing, token imagery, and NFT representation.</li>
                          <li>Pre-sale of Vanilla Valley Tokens to early investors.</li>
                        </ul>
                        
                        <h4 className="text-lg font-medium text-vanilla-300 mb-2">Q2 2025:</h4>
                        <ul className="list-disc pl-6 mb-4 text-vanilla-200 space-y-2">
                          <li>Launch of the Vanilla Valley Platform.</li>
                          <li>Launch of Website and Social Media.</li>
                          <li>Close of Pre-Sale.</li>
                          <li>B2C Campaign</li>
                        </ul>
                        
                        <h4 className="text-lg font-medium text-vanilla-300 mb-2">Q3 2025:</h4>
                        <ul className="list-disc pl-6 mb-4 text-vanilla-200 space-y-2">
                          <li>Valley Nomads Mint</li>
                        </ul>
                        
                        <h4 className="text-lg font-medium text-vanilla-300 mb-2">Q4 2025:</h4>
                        <ul className="list-disc pl-6 mb-4 text-vanilla-200 space-y-2">
                          <li>Implementation</li>
                          <li>Expand Community Engagement, including workshops and events to promote sustainable farming and environmental awareness.</li>
                          <li>Explore Strategic Partnerships with eco-friendly brands to boost product distribution and awareness.</li>
                        </ul>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">2026: Project Implementation</h3>
                        <h4 className="text-lg font-medium text-vanilla-300 mb-2">Q1 2026:</h4>
                        <h4 className="text-lg font-medium text-vanilla-300 mb-2">Q2 2026:</h4>
                        <h4 className="text-lg font-medium text-vanilla-300 mb-2">Q3 2026:</h4>
                        <h4 className="text-lg font-medium text-vanilla-300 mb-2">Q4 2026:</h4>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">2027 and Beyond: Growth and Sustainability</h3>
                        <ul className="list-disc pl-6 mb-6 text-vanilla-200 space-y-2">
                          <li>Scale farming operations to additional regions in the Dominican Republic, increasing production capacity.</li>
                          <li>Introduce New RWA Investment Opportunities, allowing diversification for Valley Nomads Token holders.</li>
                          <li>Expand Global Outreach to markets in Europe and Asia, emphasizing the project's commitment to sustainability.</li>
                          <li>Enhance Blockchain Features, including AI-powered analytics for yield predictions and supply chain optimization.</li>
                        </ul>
                      </CardContent>
                    </div>
                  </Card>
                </section>
                
                {/* Team Section */}
                <section id="team" className="reveal-on-scroll">
                  <Card className="bg-earth-800/70 border-earth-700 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-earth-700/70 to-earth-800/40 cursor-pointer" onClick={() => toggleSection('team')}>
                      <CardTitle className="text-vanilla-100 flex items-center justify-between">
                        <span>Team and Partners</span>
                        <ChevronDown className={cn("h-5 w-5 text-vanilla-400 transition-transform", activeSection === 'team' ? 'rotate-180' : '')} />
                      </CardTitle>
                    </CardHeader>
                    <div className={cn("transition-all duration-500 ease-in-out overflow-hidden", 
                      activeSection === 'team' ? 'max-h-[3000px]' : 'max-h-0')}>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div className="bg-earth-700/30 p-4 rounded-lg border border-earth-600">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">Andreas Harb – Co-Founder / Sales</h3>
                            <p className="text-vanilla-200">
                              A visionary entrepreneur and Chief Engineer, Andreas has been building businesses since the age of 18. With a deep passion for exploration, he has traveled to 117 countries, gathering insights from diverse cultures and industries. Since 2019, he has been pioneering vanilla cultivation across three Caribbean islands, driven by a mission to create sustainable agricultural ecosystems. As the founder of Puronilla, a family-run business, Andreas is committed to shaping the future of vanilla production through innovation and tradition.
                            </p>
                          </div>
                          
                          <div className="bg-earth-700/30 p-4 rounded-lg border border-earth-600">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">Sascha Stockem – Commercial Executive</h3>
                            <p className="text-vanilla-200">
                              With over 15 years of experience in retail, wholesale, and e-commerce, Sascha has led market expansions across Europe, bridging the gap between physical and digital commerce. His passion for Community Living and Regenerative Business Practices fuels his mission to build sustainable and impactful ventures. Sascha thrives on connecting people, ideas, and opportunities to drive meaningful change in the marketplace.
                            </p>
                          </div>
                          
                          <div className="bg-earth-700/30 p-4 rounded-lg border border-earth-600">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">Martin Zinn – Co-Founder / Corporate Development</h3>
                            <p className="text-vanilla-200">
                              Based in Zurich, Martin is the architect behind the group's NFT strategy and financial framework. With a keen eye for legal and corporate structuring, he ensures that blockchain technology is seamlessly integrated into the business model. His expertise in digital assets and corporate development positions him at the forefront of innovation, shaping the future of tokenized investments.
                            </p>
                          </div>
                          
                          <div className="bg-earth-700/30 p-4 rounded-lg border border-earth-600">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">Anthony Roberts – Blockchain Project Manager</h3>
                            <p className="text-vanilla-200">
                              A blockchain investor and educator since 2020, Anthony—better known as Ant—is passionate about leveraging NFTs to empower artists and build socially conscious businesses. He views blockchain as a transformative economic revolution, capable of driving positive global change. With a commitment to fostering adoption and innovation, Ant is dedicated to making decentralized technologies more accessible and impactful.
                            </p>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Key Partners:</h3>
                        
                        <div className="space-y-6 mb-6">
                          <div className="bg-earth-700/30 p-6 rounded-lg border border-earth-600">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">Puronilla - Implementation Partner</h3>
                            <p className="text-vanilla-200 mb-4">
                              Puronilla is a leading agricultural company with a proven track record in sustainable farming and vanilla cultivation. Born in Zurich Switzerland and, based in the Dominican Republic, Puronilla specializes in implementing innovative farming solutions that prioritize environmental conservation, community empowerment, and premium crop production.
                            </p>
                            <p className="text-vanilla-200 mb-4">
                              As the project implementation partner for the Vanilla Valley initiative, Puronilla is responsible for overseeing all aspects of farm development, including land preparation, vanilla orchid cultivation, and adherence to organic farming practices. Their team of experts ensures high-quality standards at every stage, from planting to harvest, enabling the project to achieve its goals of sustainability and profitability.
                            </p>
                            <p className="text-vanilla-200 mb-4">
                              With extensive experience and a deep commitment to social and environmental impact, Puronilla is the backbone of the Vanilla Valley project, ensuring its successful execution and long-term growth.
                            </p>
                            <a 
                              href="https://www.puronilla.com/" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center text-vanilla-400 hover:text-vanilla-300"
                            >
                              Visit Puronilla <ExternalLink className="ml-1 h-4 w-4" />
                            </a>
                          </div>
                          
                          <div className="bg-earth-700/30 p-6 rounded-lg border border-earth-600">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">Dennree Biomärkte - Retail Partner</h3>
                            <p className="text-vanilla-200 mb-4">
                              Dennree Biomärkte is one of Europe's leading organic food retailers, renowned for its commitment to sustainability, high-quality products, and ethical sourcing. With approximately 400 own stores across Germany and Austria, plus 400 partner stores where Dennree serves as the major supplier, Dennree connects conscious consumers with organic and eco-friendly products, promoting a healthier lifestyle and environmental stewardship.
                            </p>
                            <p className="text-vanilla-200 mb-4">
                              As a key partner of the Vanilla Valley project, Dennree Biomärkte plays a vital role in ensuring the distribution of premium organic vanilla to European markets. By leveraging their extensive network and reputation, Dennree not only provides a reliable market for the vanilla but also amplifies the project's commitment to fair trade and sustainable agriculture.
                            </p>
                            <p className="text-vanilla-200 mb-4">
                              Their collaboration with Vanilla Valley underscores a shared vision of supporting small-scale farmers, preserving biodiversity, and delivering exceptional quality to consumers.
                            </p>
                            <a 
                              href="https://www.dennree.de/" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center text-vanilla-400 hover:text-vanilla-300"
                            >
                              Visit Dennree <ExternalLink className="ml-1 h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </section>
                
                {/* Regulatory Framework Section */}
                <section id="regulatory" className="reveal-on-scroll">
                  <Card className="bg-earth-800/70 border-earth-700 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-earth-700/70 to-earth-800/40 cursor-pointer" onClick={() => toggleSection('regulatory')}>
                      <CardTitle className="text-vanilla-100 flex items-center justify-between">
                        <span>Regulatory Framework</span>
                        <ChevronDown className={cn("h-5 w-5 text-vanilla-400 transition-transform", activeSection === 'regulatory' ? 'rotate-180' : '')} />
                      </CardTitle>
                    </CardHeader>
                    <div className={cn("transition-all duration-500 ease-in-out overflow-hidden", 
                      activeSection === 'regulatory' ? 'max-h-[3000px]' : 'max-h-0')}>
                      <CardContent className="pt-6">
                        <p className="text-vanilla-200 mb-6">
                          The Vanilla Valley Project operates in full compliance with the legal and regulatory framework of the Dominican Republic, ensuring a solid foundation for operations and investor confidence. The project is structured as a cooperative, allowing small-scale farmers to become stakeholders and share in the economic benefits. This model not only aligns with local agricultural and cooperative laws but also promotes inclusive, community-driven development.
                        </p>
                        <p className="text-vanilla-200 mb-6">
                          To uphold international standards of transparency and financial integrity, blockchain technology is employed to create an immutable record of all transactions. This ensures verifiable compliance with global financial regulations, enhances investor protections, and safeguards against fraud and mismanagement.
                        </p>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Licensing and Permissions</h3>
                        <p className="text-vanilla-200 mb-4">
                          All required permits for land use, organic farming, cooperative registration, and commercial operations have been secured from the relevant Dominican Republic authorities. The Vanilla Valley Project operates in strict adherence to:
                        </p>
                        <ul className="list-disc pl-6 mb-6 text-vanilla-200 space-y-2">
                          <li><span className="font-medium">National Agricultural and Environmental Regulations</span> – Ensuring sustainable and legally compliant farming practices.</li>
                          <li><span className="font-medium">Organic Certification Standards</span> – Meeting international benchmarks for organic vanilla cultivation.</li>
                          <li><span className="font-medium">Blockchain and Financial Compliance</span> – Aligning with anti-money laundering (AML) and know-your-customer (KYC) requirements to facilitate secure and transparent transactions.</li>
                        </ul>
                        <p className="text-vanilla-200 mb-6">
                          Additionally, our NFT issuance follows legal guidelines for digital asset classification and investor rights, ensuring regulatory clarity in the tokenized economy.
                        </p>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Investor Protections</h3>
                        <p className="text-vanilla-200 mb-4">
                          Investor security and financial integrity are top priorities. The Vanilla Valley Project implements multiple layers of protection to ensure sustainable returns and mitigate risks:
                        </p>
                        <ol className="list-decimal pl-6 mb-6 text-vanilla-200 space-y-2">
                          <li><span className="font-medium">Smart Contracts:</span> Self-executing contracts automate fund allocation, farm operations, and profit distribution, minimizing human errors and ensuring the enforcement of agreements.</li>
                          <li><span className="font-medium">Blockchain Transparency:</span> All transactions related to NFT ownership, vanilla yield tracking, and profit distribution are recorded on a tamper-proof ledger, granting investors real-time insights into their assets.</li>
                          <li><span className="font-medium">Legal and Financial Oversight:</span> A structured governance model ensures compliance with legal, financial, and operational best practices.</li>
                          <li><span className="font-medium">Due Diligence:</span> Extensive assessments are conducted at every stage—from soil quality and farming methodologies to logistics and supply chain management—to optimize returns and minimize exposure to risk.</li>
                        </ol>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Risk Management and Contingencies</h3>
                        <p className="text-vanilla-200 mb-4">
                          Vanilla farming, like any agricultural venture, faces inherent risks such as environmental challenges, price volatility, and crop health issues. To ensure long-term sustainability and protect investor interests, the Vanilla Valley Project has implemented the following risk mitigation strategies:
                        </p>
                        <ul className="list-disc pl-6 mb-6 text-vanilla-200 space-y-2">
                          <li><span className="font-medium">Insurance Coverage:</span> Policies safeguard against crop failures, natural disasters, and unforeseen disruptions.</li>
                          <li><span className="font-medium">Diversification:</span> Multiple cultivation sites reduce dependency on single-location farming, spreading risk and increasing resilience.</li>
                          <li><span className="font-medium">Contingency Fund:</span> A portion of project funds is allocated for unexpected expenses or emergencies, ensuring operational continuity.</li>
                          <li><span className="font-medium">Supply Chain Resilience:</span> Partnerships with multiple buyers and distributors mitigate market fluctuations and price dependency.</li>
                        </ul>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Environmental and Social Compliance</h3>
                        <p className="text-vanilla-200 mb-4">
                          Sustainability is at the core of the Vanilla Valley Project, integrating environmental responsibility with social impact to create a regenerative and equitable agricultural ecosystem. Our commitment extends beyond compliance, actively fostering resilience in both the environment and the communities we work with.
                        </p>
                        
                        <h4 className="text-lg font-medium text-vanilla-300 mb-2">Environmental Stewardship</h4>
                        <ul className="list-disc pl-6 mb-6 text-vanilla-200 space-y-2">
                          <li><span className="font-medium">Agroforestry and Regenerative Farming:</span> We implement agroforestry practices that integrate vanilla cultivation with native tree species, promoting biodiversity, improving soil health, and reducing deforestation. This method enhances natural pest control, maintains soil fertility, and supports carbon sequestration, aligning with global climate action goals.</li>
                          <li><span className="font-medium">Water Conservation and Irrigation Efficiency:</span> Sustainable water management is a priority. We employ drip irrigation systems and rainwater harvesting to optimize water use, reducing waste and ensuring efficient hydration of vanilla crops in a changing climate.</li>
                          <li><span className="font-medium">Soil Health and Organic Farming:</span> By maintaining organic certification, we ensure that no synthetic pesticides, herbicides, or chemical fertilizers are used. Instead, we apply composting, mulching, and natural fertilizers to enhance soil structure, encourage microbial activity, and improve long-term productivity.</li>
                          <li><span className="font-medium">Carbon Footprint Reduction:</span> The project actively reduces its environmental footprint by minimizing transport emissions through localized processing and distribution. We also explore carbon credit programs that reward sustainable agricultural practices.</li>
                        </ul>
                        
                        <h4 className="text-lg font-medium text-vanilla-300 mb-2">Social Responsibility and Community Development</h4>
                        <ul className="list-disc pl-6 mb-6 text-vanilla-200 space-y-2">
                          <li><span className="font-medium">Empowering Small-Scale Farmers:</span> The cooperative structure allows local farmers to become stakeholders in the project, ensuring they receive fair wages, profit-sharing opportunities, and financial security. This model fosters long-term economic sustainability for the farming community.</li>
                          <li><span className="font-medium">Education and Skill Development:</span> We provide training programs on regenerative agriculture, blockchain literacy, and financial management, equipping farmers and their families with the skills to thrive in an evolving economy. Workshops and mentorship initiatives further support knowledge transfer and innovation.</li>
                          <li><span className="font-medium">Women's Empowerment and Inclusion:</span> The project actively promotes gender equity by supporting female farmers, providing leadership training, and ensuring equal opportunities in decision-making roles within the cooperative.</li>
                          <li><span className="font-medium">Fair Trade and Ethical Labor Practices:</span> Our operations adhere to international fair trade standards, ensuring that all labor practices are ethical, free from exploitation, and compliant with local labor laws. By prioritizing ethical sourcing and transparent supply chains, we contribute to a more just and equitable agricultural industry.</li>
                        </ul>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mb-3">Partnerships and Compliance</h3>
                        <p className="text-vanilla-200 mb-6">
                          Our implementation partner, Puronilla, upholds the highest standards of sustainability and ethical sourcing. The organization is certified under international organic and fair trade frameworks, ensuring that the Vanilla Valley Project aligns with environmental and social best practices. Additionally, we collaborate with NGOs, government agencies, and research institutions to continuously improve sustainability metrics and expand community benefits.
                        </p>
                        <p className="text-vanilla-200">
                          By integrating these environmental and social commitments, the Vanilla Valley Project not only enhances vanilla farming practices but also sets a precedent for responsible, blockchain-powered agricultural investment.
                        </p>
                      </CardContent>
                    </div>
                  </Card>
                </section>
                
                {/* FAQ Section */}
                <section id="faq" className="reveal-on-scroll">
                  <Card className="bg-earth-800/70 border-earth-700 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-earth-700/70 to-earth-800/40 cursor-pointer" onClick={() => toggleSection('faq')}>
                      <CardTitle className="text-vanilla-100 flex items-center justify-between">
                        <span>FAQ</span>
                        <ChevronDown className={cn("h-5 w-5 text-vanilla-400 transition-transform", activeSection === 'faq' ? 'rotate-180' : '')} />
                      </CardTitle>
                    </CardHeader>
                    <div className={cn("transition-all duration-500 ease-in-out overflow-hidden", 
                      activeSection === 'faq' ? 'max-h-[3000px]' : 'max-h-0')}>
                      <CardContent className="pt-6">
                        <div className="space-y-6">
                          <div className="border-b border-earth-700 pb-4">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">What is Vanilla Valley?</h3>
                            <p className="text-vanilla-200">
                              Vanilla Valley is a blockchain-powered initiative that integrates sustainable vanilla farming with tokenized investment opportunities. By tokenizing vanilla orchids, we enable investors to participate in regenerative agriculture while earning rewards linked to organic vanilla production.
                            </p>
                          </div>
                          
                          <div className="border-b border-earth-700 pb-4">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">What problem does it solve?</h3>
                            <p className="text-vanilla-200">
                              We makes it easier for small-scale farmers to enter the vanilla market while supporting sustainability and transparency in the supply chain.
                            </p>
                          </div>
                          
                          <div className="border-b border-earth-700 pb-4">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">What are the key tokens in the project?</h3>
                            <p className="text-vanilla-200">
                              Vanilla Valley has two types of tokens: VVT for investing in vanilla farming, and Valley Nomads Token for community perks.
                            </p>
                          </div>
                          
                          <div className="border-b border-earth-700 pb-4">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">How many tokens are there?</h3>
                            <p className="text-vanilla-200">
                              300,000 VVT utility tokens and 10,000 Valley Nomads membership tokens.
                            </p>
                          </div>
                          
                          <div className="border-b border-earth-700 pb-4">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">What is the price of Vanilla Valley Tokens?</h3>
                            <p className="text-vanilla-200">
                              $24 per VVT during pre-sale, and $30 per VVT during the public sale.
                            </p>
                          </div>
                          
                          <div className="border-b border-earth-700 pb-4">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">How much does a Valley Nomads Token cost?</h3>
                            <p className="text-vanilla-200">
                              $200, which includes an airdrop of 5 VVT tokens.
                            </p>
                          </div>
                          
                          <div className="border-b border-earth-700 pb-4">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">Do I need to own a membership token to own a VVT token?</h3>
                            <p className="text-vanilla-200">
                              You can own VVT tokens and Valley Nomads tokens independently. They have separate utilities.
                            </p>
                          </div>
                          
                          <div className="border-b border-earth-700 pb-4">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">How do I buy Vanilla Valley Tokens?</h3>
                            <p className="text-vanilla-200">
                              Purchase them during the pre-sale or mint them from the website during the public sale.
                            </p>
                          </div>
                          
                          <div className="border-b border-earth-700 pb-4">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">How do I buy Vanilla Nomads Tokens?</h3>
                            <p className="text-vanilla-200">
                              Purchase them from our website during the public sale.
                            </p>
                          </div>
                          
                          <div className="border-b border-earth-700 pb-4">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">Are tokens tradeable?</h3>
                            <p className="text-vanilla-200">
                              Yes, both VVT and Valley Nomads tokens can be traded on NFT marketplaces.
                            </p>
                          </div>
                          
                          <div className="border-b border-earth-700 pb-4">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">Do Vanilla Valley Tokens have utility beyond financial return?</h3>
                            <p className="text-vanilla-200">
                              Yes, they support sustainable farming and reforestation initiatives.
                            </p>
                          </div>
                          
                          <div className="border-b border-earth-700 pb-4">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">What is the utility of Valley Nomads Tokens?</h3>
                            <p className="text-vanilla-200">
                              They provide benefits like an airdrop of 5 VVT tokens, access to RWA investments, discounts on partner products, and other exclusive perks.
                            </p>
                          </div>
                          
                          <div className="border-b border-earth-700 pb-4">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">What role does the blockchain play in this project?</h3>
                            <p className="text-vanilla-200">
                              Blockchain reduces administrative costs, provides transparency and traceability, and automates profit distribution through smart contracts. Blockchain also allows Investors to access liquidity outside of harvest dividends via NFT Marketplaces.
                            </p>
                          </div>
                          
                          <div className="border-b border-earth-700 pb-4">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">Which blockchain is used?</h3>
                            <p className="text-vanilla-200">
                              We use the Cardano blockchain, chosen for its security, scalability, and infrastructure to support our project goals.
                            </p>
                          </div>
                          
                          <div className="border-b border-earth-700 pb-4">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">How does Vanilla Valley generate revenue for investors?</h3>
                            <p className="text-vanilla-200">
                              Revenue is generated through:
                            </p>
                            <ul className="list-disc pl-6 mt-2 text-vanilla-200 space-y-1">
                              <li>The sale of organic vanilla at premium market prices.</li>
                              <li>Yield-based rewards distributed to VVT token holders.</li>
                              <li>Secondary market trading of VVT tokens on NFT marketplaces.</li>
                            </ul>
                          </div>
                          
                          <div className="border-b border-earth-700 pb-4">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">What are the risks associated with investing in Vanilla Valley?</h3>
                            <p className="text-vanilla-200">
                              Like any agricultural investment, risks include:
                            </p>
                            <ul className="list-disc pl-6 mt-2 text-vanilla-200 space-y-1">
                              <li>Crop failure due to environmental factors (mitigated through insurance and diversification).</li>
                              <li>Market volatility affecting vanilla prices (managed by securing long-term buyers).</li>
                              <li>Regulatory risks in the evolving blockchain landscape (ensured through compliance with local and international regulations).</li>
                            </ul>
                          </div>
                          
                          <div className="border-b border-earth-700 pb-4">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">Is there a minimum investment requirement?</h3>
                            <p className="text-vanilla-200">
                              No, investors can purchase any amount of VVT tokens during the pre-sale or public sale. However, Valley Nomads Tokens (VNT) are limited to 10,000 units and offer additional perks.
                            </p>
                          </div>
                          
                          <div className="border-b border-earth-700 pb-4">
                            <h3 className="text-lg font-medium text-vanilla-100 mb-2">Can I sell my Vanilla Valley Tokens at any time?</h3>
                            <p className="text-vanilla-200">
                              Yes, both VVT and Valley Nomads Tokens can be sold or traded on secondary NFT marketplaces, allowing investors flexibility and liquidity.
                            </p>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-medium text-vanilla-100 mt-8 mb-3">Official Links</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-vanilla-200">Vanilla Valley:</span>
                            <a 
                              href="https://www.vanillavalley.io/" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-vanilla-400 hover:text-vanilla-300 hover:underline"
                            >
                              https://www.vanillavalley.io/
                            </a>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-vanilla-200">Puronilla:</span>
                            <a 
                              href="https://www.puronilla.com/" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-vanilla-400 hover:text-vanilla-300 hover:underline"
                            >
                              https://www.puronilla.com/
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </section>
              </div>
              
              <div className="flex justify-end mt-10">
                <Button
                  variant="outline"
                  className="border-earth-700 text-vanilla-300 hover:bg-earth-700 hover:text-vanilla-100"
                  onClick={scrollToTop}
                >
                  Back to Top
                </Button>
              </div>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="lg:hidden mt-8 mb-4">
            <Button
              variant="outline"
              className="w-full border-earth-700 text-vanilla-300 hover:bg-earth-700 hover:text-vanilla-100"
              onClick={() => navigate('/dashboard')}
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhitePaper;
