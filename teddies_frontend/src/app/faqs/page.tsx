import { Metadata } from 'next';

import { getFaqs } from '@/api/faq/get-faq';
import FaqCard from '@/components/faq/FaqCard';
import Image from 'next/image';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: 'FAQs',
};

const FAQPage = async () => {
  const faqs = await getFaqs();

  return (
    <>
      <div className='py-20 w-[90%] mx-auto'>
        <h1>{`faq's`}</h1>
        <div className='flex flex-col gap-y-5 max-w-[1200px] mx-auto pt-5'>
          {faqs && faqs.length > 0 ? (
            faqs.map((faq, index) => {
              return (
                <Fragment key={faq.id}>
                  <FaqCard cardIndex={index} faqData={faq} />
                </Fragment>
              );
            })
          ) : (
            <div className='flex flex-col items-center md:flex-row md:justify-center'>
              <Image
                src={'/temp/clown_box.png'}
                alt='clown'
                width={0}
                height={0}
                sizes='100vw'
                priority
                className='w-[180px] md:w-[230px]'
              />
              <p className='text-xl font-bold text-secondary-gray md:text-2xl md:pl-10'>
                Coming Soon...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FAQPage;
