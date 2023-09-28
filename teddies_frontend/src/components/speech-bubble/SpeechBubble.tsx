import React from 'react';

interface SpeechBubbleProps {
  point?: 'right' | 'left';
  children: React.ReactNode;
  className?: string;
}

const SpeechBubble = ({
  point = 'right',
  children,
  className,
}: SpeechBubbleProps) => {
  return (
    <>
      <div
        className={`w-[90%] min-w-[250px] md:max-w-[400px] lg:max-w-[450px] ${
          point === 'right' ? 'bubble_right' : 'bubble_left'
        } ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export default SpeechBubble;
