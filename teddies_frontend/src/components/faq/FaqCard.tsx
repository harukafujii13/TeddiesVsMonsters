import SpeechBubble from '@/components/speech-bubble/SpeechBubble';
import { FAQ } from '@/types/faq';
import Image from 'next/image';
import MonsterImage from '../../../public/temp/CavernFoot_1.png';
import BearImage from '../../../public/temp/GreenShadow_1.png';
import GhostImage from '../../../public/temp/ghost_single.png';

interface FaqCardProps {
  cardIndex: number;
  faqData: FAQ;
}

const FaqCard = ({ cardIndex, faqData }: FaqCardProps) => {
  const faq = faqData.attributes;
  const isEven = cardIndex % 2 === 0;

  const setCharacterImage = () => {
    const images = [BearImage, GhostImage, MonsterImage];

    if (cardIndex === 0) return images[0];
    return images[cardIndex % 3];
  };

  const speechGridClass = `sm:col-span-2 ${
    isEven ? ' md:col-start-2 md:row-start-1 md:text-start' : 'md:col-span-2'
  }`;

  const imageGridClass = isEven
    ? 'sm:row-start-2 md:row-span-2 md:col-start-1 md:row-start-1'
    : 'sm:row-start-2 sm:col-start-2 md:col-start-3 md:row-span-2';

  const resGrigClass = isEven
    ? 'sm:row-start-2 md:col-start-2 md:col-span-2'
    : 'sm:row-start-2 sm:col-start-1 md:col-span-2 md:row-start-2';

  return (
    <>
      <div
        className={`max-w-[800px] grid grid-cols-1 sm:grid-col-2 sm:grid-row-2 md:grid-col-3 ${
          isEven ? 'mr-auto' : 'ml-auto'
        }`}
      >
        <div className={`mb-6 text-center ${speechGridClass}`}>
          <SpeechBubble point={isEven ? 'left' : 'right'}>
            {faq.question}
          </SpeechBubble>
        </div>
        <Image
          src={setCharacterImage()}
          alt='green-bare'
          width={0}
          height={0}
          sizes='100vw'
          priority
          className={`w-[140px] min-w-[140px] mx-auto md:w-[200px] lg:w-[250px] ${imageGridClass}`}
        />
        <div
          className={`font-LDRKaet flex flex-col justify-center w-[90%] mx-auto sm:w-[400px] md:w-[500px] md:justify-start ${resGrigClass}`}
        >
          <p className='text-xl'>R:</p>
          <p className='text-primary-orange'>{faq.response}</p>
        </div>
      </div>
    </>
  );
};

export default FaqCard;
