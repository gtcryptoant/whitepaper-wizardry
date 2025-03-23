
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock } from 'lucide-react';

interface MilestoneProps {
  title: string;
  quarter: string;
  description: string;
  completed?: boolean;
  active?: boolean;
}

const roadmapData = [
  {
    title: 'Initial Concept & Foundation',
    quarter: 'Q3 2023',
    description: 'Whitepaper publication, token economics design, and smart contract development.',
    completed: true,
  },
  {
    title: 'Vanilla Valley Token Launch',
    quarter: 'Q4 2023',
    description: 'Token generation event, initial exchange listings, and staking mechanism launch.',
    completed: true,
  },
  {
    title: 'Vanilla Farm Acquisitions',
    quarter: 'Q1 2024',
    description: 'First batch of vanilla farm tokenization, with establishment of production protocols.',
    completed: false,
  },
  {
    title: 'Marketplace Launch',
    quarter: 'Q2 2024',
    description: 'Release of the decentralized marketplace for trading tokenized vanilla assets.',
    completed: false,
  },
  {
    title: 'Ecosystem Expansion',
    quarter: 'Q3 2024',
    description: 'Integration with DeFi protocols, cross-chain compatibility, and secondary markets.',
    completed: false,
  },
  {
    title: 'Global Scaling',
    quarter: 'Q4 2024',
    description: 'Expansion to additional vanilla producing regions and diversification of assets.',
    completed: false,
  },
];

const Milestone: React.FC<MilestoneProps> = ({ title, quarter, description, completed, active }) => {
  return (
    <div 
      className={cn(
        "relative pl-8 pb-10 transition-all duration-300 ease-in-out",
        active ? "scale-[1.02]" : ""
      )}
    >
      {/* Timeline vertical line */}
      <div className="absolute left-0 top-1 w-px h-full bg-vanilla-300 dark:bg-earth-700"></div>
      
      {/* Circle indicator */}
      <div className={cn(
        "absolute left-[-8px] top-1 flex items-center justify-center w-4 h-4 rounded-full border-2",
        completed 
          ? "bg-vanilla-500 border-vanilla-500" 
          : "bg-white dark:bg-earth-800 border-vanilla-300 dark:border-earth-700"
      )}>
        {completed && (
          <CheckCircle className="h-5 w-5 text-earth-900" />
        )}
      </div>

      {/* Content */}
      <div 
        className={cn(
          "bg-white/50 dark:bg-earth-900/50 backdrop-blur-sm rounded-lg p-5 border transition-all",
          active || completed 
            ? "border-vanilla-300 dark:border-vanilla-700 shadow-md" 
            : "border-vanilla-200 dark:border-earth-800"
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-xl">{title}</h3>
          <span className="pill flex items-center gap-1">
            {completed ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
            {quarter}
          </span>
        </div>
        <p className="text-earth-700 dark:text-vanilla-200">{description}</p>
      </div>
    </div>
  );
};

export const RoadmapTimeline = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(Array(roadmapData.length).fill(false));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            setVisibleItems(prev => {
              const newState = [...prev];
              newState[index] = entry.isIntersecting;
              return newState;
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
    );

    itemRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="relative max-w-3xl mx-auto">
      {roadmapData.map((milestone, index) => (
        <div 
          key={index}
          ref={el => itemRefs.current[index] = el}
          className={cn(
            "transition-all duration-700 transform",
            visibleItems[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            index % 2 === 0 ? "transition-delay-100" : "transition-delay-300"
          )}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <Milestone
            title={milestone.title}
            quarter={milestone.quarter}
            description={milestone.description}
            completed={milestone.completed}
            active={activeIndex === index}
          />
        </div>
      ))}
    </div>
  );
};

export default RoadmapTimeline;
