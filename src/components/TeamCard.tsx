
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Twitter, Linkedin, Link } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

const TeamCard: React.FC<TeamMemberProps> = ({
  name,
  role,
  bio,
  imageSrc,
  twitter,
  linkedin,
  website
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="perspective-container w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={cn(
          "tilt-card w-full bg-white dark:bg-earth-900/80 border border-vanilla-200 dark:border-earth-800",
          "rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
        )}
      >
        <div className="aspect-[3/4] overflow-hidden relative">
          <div 
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-transform duration-500",
              isHovered ? "scale-110" : "scale-100"
            )}
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />
          
          <div className="absolute bottom-0 left-0 w-full p-5 text-white">
            <div className="transform transition-transform duration-500">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-xl font-display mb-1">{name}</h3>
                  <p className="text-vanilla-200 text-sm">{role}</p>
                </div>
                <div className="flex space-x-2">
                  {twitter && (
                    <a href={twitter} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                  {linkedin && (
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {website && (
                    <a href={website} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                      <Link className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-500 ease-in-out",
                  isHovered ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <p className="text-sm text-vanilla-100">{bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
