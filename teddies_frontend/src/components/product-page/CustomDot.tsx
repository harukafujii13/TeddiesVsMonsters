import { DotProps } from 'react-multi-carousel';

const CustomDot = ({ onClick, active }: DotProps) => {
  if (!onClick) return;

  return (
    <li>
      <button
        className={`mx-1 h-3 w-3 rounded-full ${
          active ? 'bg-primary-orange' : 'border border-primary-orange'
        }`}
        onClick={() => onClick()}
      />
    </li>
  );
};

export default CustomDot;
