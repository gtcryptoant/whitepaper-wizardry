
import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TokenomicsChart from '@/components/TokenomicsChart';
import RoadmapTimeline from '@/components/RoadmapTimeline';
import TeamCard from '@/components/TeamCard';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Globe, Leaf, TrendingUp, Wallet } from 'lucide-react';

const Index = () => {
  // Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15 }
    );

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-vanilla-50 dark:bg-earth-900 text-earth-900 dark:text-vanilla-100">
      <Navbar />
      <HeroSection />

      {/* Vision Section */}
      <section id="vision" className="section bg-white dark:bg-earth-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise"></div>
        <div className="container-padding relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-title reveal-on-scroll">Our Vision</h2>
            <p className="section-subtitle reveal-on-scroll">
              Vanilla Valley is reimagining how agricultural assets are owned, traded, and valued in the digital age, creating a more transparent and profitable ecosystem for farmers, investors, and consumers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Transparent Supply Chain",
                description: "Track vanilla from farm to table with immutable blockchain records, ensuring authenticity and fair trade practices."
              },
              {
                icon: <Wallet className="h-8 w-8" />,
                title: "Fractional Ownership",
                description: "Enable global investors to own shares in high-value vanilla farms through tokenization, democratizing access to agricultural investments."
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Yield Generation",
                description: "Earn passive income through vanilla harvests, with profits distributed automatically via smart contracts to token holders."
              },
              {
                icon: <Leaf className="h-8 w-8" />,
                title: "Sustainable Farming",
                description: "Support environmentally responsible growing practices while maintaining the highest quality vanilla production."
              },
              {
                icon: <BarChart3 className="h-8 w-8" />,
                title: "Market Efficiency",
                description: "Reduce intermediaries and create more direct relationships between producers and consumers of vanilla products."
              },
              {
                icon: <ArrowRight className="h-8 w-8" />,
                title: "Community Governance",
                description: "Participate in key decisions through DAO voting mechanisms, giving stakeholders a voice in the project's future."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-vanilla-50 dark:bg-earth-900/50 border border-vanilla-200 dark:border-earth-800 rounded-xl p-6 hover-scale reveal-on-scroll"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-vanilla-100 dark:bg-earth-800 rounded-full p-3 inline-block mb-4 text-vanilla-600 dark:text-vanilla-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display mb-2">{feature.title}</h3>
                <p className="text-earth-700 dark:text-vanilla-200">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-vanilla-200 dark:border-earth-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1 reveal-on-scroll">
                <h3 className="text-2xl font-display mb-4">Real Assets, Digital Innovation</h3>
                <p className="text-earth-700 dark:text-vanilla-200 mb-6">
                  Vanilla Valley bridges the gap between traditional agriculture and blockchain technology. By tokenizing vanilla farms, we create a new asset class that combines the stability of real-world agriculture with the liquidity and accessibility of digital assets.
                </p>
                <p className="text-earth-700 dark:text-vanilla-200 mb-6">
                  Our model ensures farmers receive fair compensation while investors gain exposure to an uncorrelated asset class with attractive yields. The transparency of blockchain technology creates trust in a market historically plagued by opacity and intermediaries.
                </p>
                <Button className="bg-vanilla-500 hover:bg-vanilla-600 text-earth-900 hover:text-earth-950">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="order-1 lg:order-2 reveal-on-scroll">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-vanilla-300 to-vanilla-500 rounded-2xl blur opacity-30"></div>
                  <div className="glass-card rounded-2xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1601050591292-a856e3842ec4?q=80&w=1000" 
                      alt="Vanilla plantation" 
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="pill">Madagascar Region</span>
                        </div>
                        <span className="text-sm font-medium text-earth-700 dark:text-vanilla-300">Farm #0281</span>
                      </div>
                      <h3 className="text-xl font-display mb-2">Premium Bourbon Vanilla Farm</h3>
                      <p className="text-earth-700 dark:text-vanilla-200 mb-4">5 hectares of certified organic vanilla cultivation with established vines and consistent production history.</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-earth-600 dark:text-vanilla-300">Annual Yield</span>
                          <p className="font-medium">11.2%</p>
                        </div>
                        <div>
                          <span className="text-earth-600 dark:text-vanilla-300">Harvest Cycle</span>
                          <p className="font-medium">9 months</p>
                        </div>
                        <div>
                          <span className="text-earth-600 dark:text-vanilla-300">Token Price</span>
                          <p className="font-medium">$175 USDC</p>
                        </div>
                        <div>
                          <span className="text-earth-600 dark:text-vanilla-300">Available Supply</span>
                          <p className="font-medium">1,280 / 2,000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="section bg-vanilla-50 dark:bg-earth-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise"></div>
        <div className="container-padding relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-title reveal-on-scroll">Tokenomics</h2>
            <p className="section-subtitle reveal-on-scroll">
              The Vanilla Valley token ($VNLA) is designed with careful consideration to create a sustainable economy that rewards community participation while funding ongoing development and farm acquisitions.
            </p>
          </div>

          <TokenomicsChart />

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 reveal-on-scroll">
            <div className="bg-white dark:bg-earth-950 border border-vanilla-200 dark:border-earth-800 rounded-xl p-8">
              <h3 className="text-2xl font-display mb-4">Token Utility</h3>
              <ul className="space-y-4">
                {[
                  "Governance voting rights in the Vanilla Valley DAO",
                  "Access to exclusive farm investment opportunities",
                  "Staking rewards from protocol fees and farm yields",
                  "Discounted fees on the marketplace platform",
                  "Priority allocation in new farm tokenization events"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-vanilla-100 dark:bg-earth-800 rounded-full p-1 mr-3 mt-1">
                      <div className="w-3 h-3 bg-vanilla-500 dark:bg-vanilla-600 rounded-full"></div>
                    </div>
                    <span className="text-earth-700 dark:text-vanilla-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-earth-950 border border-vanilla-200 dark:border-earth-800 rounded-xl p-8">
              <h3 className="text-2xl font-display mb-4">Staking Mechanism</h3>
              <p className="text-earth-700 dark:text-vanilla-200 mb-6">
                Stake your $VNLA tokens to earn rewards from multiple sources:
              </p>
              <div className="space-y-4">
                {[
                  { title: "Protocol Fees", value: "2.5% APY" },
                  { title: "Farm Yield Distribution", value: "5-9% APY" },
                  { title: "Liquidity Provision Bonus", value: "1-3% APY" },
                  { title: "Governance Participation", value: "0.5% APY" }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between pb-3 border-b border-vanilla-200 dark:border-earth-800">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-vanilla-700 dark:text-vanilla-500">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="section bg-white dark:bg-earth-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise"></div>
        <div className="container-padding relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-title reveal-on-scroll">Project Roadmap</h2>
            <p className="section-subtitle reveal-on-scroll">
              Our strategic vision for Vanilla Valley unfolds across several key phases, each designed to expand our ecosystem while delivering increasing value to our token holders and farm partners.
            </p>
          </div>

          <RoadmapTimeline />
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section bg-vanilla-50 dark:bg-earth-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise"></div>
        <div className="container-padding relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-title reveal-on-scroll">Our Team</h2>
            <p className="section-subtitle reveal-on-scroll">
              Vanilla Valley brings together experts in agriculture, blockchain technology, and sustainable finance to create a revolutionary platform for real asset tokenization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 reveal-on-scroll">
            {[
              {
                name: "Marcus Chen",
                role: "Founder & CEO",
                bio: "Former agricultural investment analyst with 12 years of experience in vanilla production and supply chain management across Madagascar and Indonesia.",
                imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
                twitter: "#",
                linkedin: "#"
              },
              {
                name: "Sophia Laurent",
                role: "CTO",
                bio: "Blockchain architect with previous experience at Ethereum Foundation. Led development of multiple successful DeFi protocols with focus on real-world asset integration.",
                imageSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
                twitter: "#",
                linkedin: "#"
              },
              {
                name: "Rahim Nkosi",
                role: "Head of Farm Relations",
                bio: "Third-generation vanilla farmer and agricultural scientist specializing in sustainable farming practices and yield optimization in tropical environments.",
                imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
                twitter: "#",
                linkedin: "#"
              },
              {
                name: "Amelia Reyes",
                role: "CFO",
                bio: "Former investment banker specializing in agricultural commodities and derivatives. Led financial strategy for multiple successful commodity tokenization projects.",
                imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
                twitter: "#",
                linkedin: "#"
              }
            ].map((member, index) => (
              <div key={index} className="reveal-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
                <TeamCard {...member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section id="join" className="section bg-gradient-to-b from-vanilla-100 to-white dark:from-earth-950 dark:to-earth-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise"></div>
        <div className="container-padding relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title reveal-on-scroll">Join the Vanilla Valley Community</h2>
            <p className="text-xl text-earth-700 dark:text-vanilla-200 mb-10 max-w-3xl mx-auto reveal-on-scroll">
              Be part of a revolutionary movement that's redefining agricultural investment and creating sustainable value for farmers, investors, and the planet.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16 reveal-on-scroll">
              <Button className="text-lg px-8 py-6 bg-vanilla-500 hover:bg-vanilla-600 text-earth-900 hover:text-earth-950">
                Join Whitelist <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="text-lg px-8 py-6 border-earth-700 text-earth-700 hover:bg-earth-50 dark:border-vanilla-300 dark:text-vanilla-300 dark:hover:bg-earth-800">
                Read Full Whitepaper
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 reveal-on-scroll">
              {[
                { label: "Discord Community", value: "7,500+ Members" },
                { label: "Twitter Followers", value: "12,400+" },
                { label: "Total Committed", value: "$3.2M USDC" },
                { label: "Launch Date", value: "August 2023" }
              ].map((stat, index) => (
                <div key={index} className="bg-white dark:bg-earth-950 border border-vanilla-200 dark:border-earth-800 rounded-xl p-6 hover-scale">
                  <div className="text-3xl font-display text-vanilla-700 dark:text-vanilla-500 mb-2">{stat.value}</div>
                  <div className="text-earth-700 dark:text-vanilla-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earth-900 text-vanilla-100 py-12">
        <div className="container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <h3 className="text-xl font-display mb-4">Vanilla Valley</h3>
              <p className="text-vanilla-300 mb-6">
                Tokenizing real vanilla farms for sustainable growth and community-driven value.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-vanilla-300 hover:text-vanilla-100 transition-colors">Twitter</a>
                <a href="#" className="text-vanilla-300 hover:text-vanilla-100 transition-colors">Discord</a>
                <a href="#" className="text-vanilla-300 hover:text-vanilla-100 transition-colors">Telegram</a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#vision" className="text-vanilla-300 hover:text-vanilla-100 transition-colors">Vision</a></li>
                <li><a href="#tokenomics" className="text-vanilla-300 hover:text-vanilla-100 transition-colors">Tokenomics</a></li>
                <li><a href="#roadmap" className="text-vanilla-300 hover:text-vanilla-100 transition-colors">Roadmap</a></li>
                <li><a href="#team" className="text-vanilla-300 hover:text-vanilla-100 transition-colors">Team</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-vanilla-300 hover:text-vanilla-100 transition-colors">Whitepaper</a></li>
                <li><a href="#" className="text-vanilla-300 hover:text-vanilla-100 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-vanilla-300 hover:text-vanilla-100 transition-colors">FAQ</a></li>
                <li><a href="#" className="text-vanilla-300 hover:text-vanilla-100 transition-colors">Press Kit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Subscribe to Updates</h4>
              <p className="text-vanilla-300 mb-4">Stay informed about our latest developments and opportunities.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-earth-800 border border-earth-700 text-vanilla-100 rounded-l-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-vanilla-500 w-full"
                />
                <button className="bg-vanilla-500 hover:bg-vanilla-600 text-earth-900 px-4 rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-earth-800 mt-10 pt-6 text-center text-vanilla-400 text-sm">
            <p>&copy; 2023 Vanilla Valley. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
