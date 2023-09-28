import React from 'react';

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <div className='grid lg:h-40 md:h-32 h-16 place-content-center'>
      <h1>{text}</h1>
    </div>
  );
};

export default Title;
