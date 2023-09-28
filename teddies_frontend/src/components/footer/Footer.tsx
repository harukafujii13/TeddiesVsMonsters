import Button from '@/components/button/Button';
import {
  FaDiscord,
  FaFacebookSquare,
  FaTiktok,
  FaTwitter,
} from 'react-icons/fa';
import { LuInstagram } from 'react-icons/lu';
import Input from '../form/Input';

const Footer = () => {
  return (
    <>
      <link
        rel='stylesheet'
        href='https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css'
      />

      <footer className='relative bg-black pt-8 pb-16 font-mulish'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap text-left lg:text-left'>
            <div className='w-full lg:w-6/12 px-4'>
              <h4 className='text-[20px] fonat-semibold text-primary-lightOrange mb-3'>
                GET NOTIFY WHEN NEW GAMES ARRIVE!
              </h4>
              <div className='w-full flex'>
                <Input
                  type={''}
                  width={'w-9/12'}
                  placeholder={'Enter your email'}
                />

                <Button
                  type='submit'
                  className=' mt-[8px] text-[3vw]  sm:text-[21px]  lg:text-[18px] mb:text-lg ml-2  text-center w-3/12'
                >
                  SUBSCRIBE
                </Button>
              </div>
              <div className='mt-6 lg:mb-0 mb-6'>
                <button
                  className='text-4xl text-primary-orange hover:text-primary-lightOrange shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-6'
                  type='button'
                >
                  <LuInstagram />
                </button>
                <button
                  className='text-4xl text-primary-orange hover:text-primary-lightOrange shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-6'
                  type='button'
                >
                  <FaTwitter />
                </button>
                <button
                  className='text-4xl text-primary-orange hover:text-primary-lightOrange shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-6'
                  type='button'
                >
                  <FaFacebookSquare />
                </button>

                <button
                  className='text-4xl text-primary-orange hover:text-primary-lightOrange shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-6'
                  type='button'
                >
                  <FaTiktok />
                </button>
                <button
                  className='text-4xl text-primary-orange hover:text-primary-lightOrange shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-6 '
                  type='button'
                >
                  <FaDiscord />
                </button>
              </div>
            </div>
            <div className='w-full lg:w-6/12 px-4'>
              <div className='flex flex-wrap items-top mb-6'>
                <div className='w-full lg:w-4/12  ml-auto'>
                  <ul className='list-unstyled'>
                    <li>
                      <a
                        className='text-[20px] text-primary-lightOrange hover:text-primary-orange font-semibold block pb-5 text-xl'
                        href='/about'
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        className='text-[20px]  text-primary-lightOrange hover:text-primary-orange font-semibold block pb-5 text-xl'
                        href='/contact'
                      >
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a
                        className='text-[20px]  text-primary-lightOrange hover:text-primary-orange font-semibold block pb-3 text-xl'
                        href='/rules'
                      >
                        Game Rules
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='w-full lg:w-6/12'>
                  <ul className='list-unstyled'>
                    <li>
                      <a
                        className='text-[20px]  text-primary-lightOrange hover:text-primary-orange font-semibold block pb-5 text-xl'
                        href='/faqs'
                      >
                        FAQs
                      </a>
                    </li>
                    <li>
                      <a
                        className='text-[20px]  text-primary-lightOrange hover:text-primary-orange font-semibold block pb-5 text-xl'
                        href='/privacy'
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        className='text-[20px]  text-primary-lightOrange hover:text-primary-orange font-semibold block pb-3 text-xl'
                        href='/terms'
                      >
                        Terms of Use
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-wrap items-center md:justify-between justify-center pt-5'>
            <div className='w-full md:w-4/12 px-4 mx-auto text-center'>
              <div className='text-sm text-primary-lightOrange font-semibold py-1'>
                © <span id='get-current-year'>2023 We make games</span>{' '}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
