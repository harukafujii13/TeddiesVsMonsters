import {
  FaDiscord,
  FaFacebookSquare,
  FaTiktok,
  FaTwitter,
} from 'react-icons/fa';
import { LuInstagram } from 'react-icons/lu';

const icons = [
  { icon: <LuInstagram /> },
  { icon: <FaTwitter /> },
  { icon: <FaFacebookSquare /> },
  { icon: <FaTiktok /> },
  { icon: <FaDiscord /> },
];

const SnsIcons = () => {
  return (
    <div className='hidden md:flex flex-row lg:gap-10 md:gap-8 gap-4  lg:text-4xl md:text-3xl text-primary-orange mr-6'>
      {icons.map((icon, index) => {
        return <div key={index}>{icon.icon}</div>;
      })}
    </div>
  );
};

export default SnsIcons;
