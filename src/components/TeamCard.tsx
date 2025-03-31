
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Globe } from 'lucide-react';

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

const TeamCard = ({ name, role, bio, imageSrc, twitter, linkedin, website }: TeamCardProps) => {
  return (
    <div className="bg-earth-800/60 border border-earth-700 rounded-xl overflow-hidden hover-scale transition-all duration-300">
      <div className="aspect-square overflow-hidden">
        <img 
          src={imageSrc} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-display text-vanilla-100 mb-1">{name}</h3>
        <div className="text-vanilla-500 text-sm font-medium mb-3">{role}</div>
        <p className="text-vanilla-300 text-sm mb-4 line-clamp-3">{bio}</p>
        
        <div className="flex space-x-3">
          {twitter && (
            <Link to={twitter} className="text-vanilla-300 hover:text-vanilla-100 transition-colors">
              <Twitter size={18} />
            </Link>
          )}
          {linkedin && (
            <Link to={linkedin} className="text-vanilla-300 hover:text-vanilla-100 transition-colors">
              <Linkedin size={18} />
            </Link>
          )}
          {website && (
            <Link to={website} className="text-vanilla-300 hover:text-vanilla-100 transition-colors">
              <Globe size={18} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
