'use client';

import {
  faArrowUpFromBracket,
  faCaretDown,
  faCaretLeft,
  faCaretRight,
  faCaretUp,
  faClose,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { z } from 'zod';

import Button from '@/components/button/Button';
import Input from '@/components/form/Input';
import { User } from '@/types/user';
import { api } from '@/utils/axios';
import { imageUploader } from '@/utils/imageUploader';
import { AxiosResponse } from 'axios';

import { useWindowSize } from '@/customHooks/useWindowSize';
import { toastError, toastSuccess } from '@/utils/toasty';

const emailSchema = z.string().email();
const stepWidth = 5;
const profileSize = 200;

enum ImageDirection {
  landscape = 'landscape',
  portrait = 'portrait',
}

type CenterCoor = {
  x: number;
  y: number;
};

const ProfileTab = ({
  user,
  isImgLoading,
  hasProfile,
  setHasProfile,
  imageSrcWithTimestamp,
  setImageSrcWithTimestamp,
  file,
  setFile,
  hasProfileEdited,
  setHasProfileEdited,
  profileImage,
  setProfileImage,
}: {
  user: User;
  isImgLoading: boolean;
  hasProfile: boolean;
  setHasProfile: Dispatch<SetStateAction<boolean>>;
  imageSrcWithTimestamp: string;
  setImageSrcWithTimestamp: Dispatch<SetStateAction<string>>;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  hasProfileEdited: boolean;
  setHasProfileEdited: Dispatch<SetStateAction<boolean>>;
  profileImage: File | null;
  setProfileImage: Dispatch<SetStateAction<File | null>>;
}) => {
  const router = useRouter();
  const windowWidth = useWindowSize();
  const { username, email, id } = user;
  const nameArr = username.split('-');
  const appendedId = nameArr.slice(nameArr.length - 5).join('-');
  const firstAndLastName = username.replace('-' + appendedId, '');
  const firstName = firstAndLastName.split('-')[0];
  const lastName =
    firstAndLastName.split('-').length === 2
      ? firstAndLastName.split('-')[1]
      : '';
  const [isIconModalOn, setIsIconModalOn] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });
  const [canvasSize, setCavasSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [aspectRatio, setAspectRatio] = useState<{
    ratio: number;
    type: ImageDirection;
  } | null>(null);
  const [rangeValue, setRangeValue] = useState<number>(0);
  const [centerCoor, setCenterCoor] = useState<CenterCoor | null>(null);
  const [zoomRatio, setZoomRatio] = useState<number | null>(null);

  const [isCanvasSet, setIsCanvasSet] = useState(false);

  const [cropCoor, setCropCoor] = useState({
    clientX: 0,
    clientY: 0,
  });

  const [image, setImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState('default');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstNameValue, setFirstNameValue] = useState(firstName);
  const [lastNameValue, setLastNameValue] = useState(lastName);
  const [emailValue, setEmailValue] = useState(email);

  const [preFirstNameValue, setPreFirstNameValue] = useState(firstName);
  const [preLastNameValue, setPreLastNameValue] = useState(lastName);
  const [preEmailValue, setPreEmailValue] = useState(email);

  useEffect(() => {
    const cacheInvalidator = Math.floor(Math.random() * 10000000000);

    setImageSrcWithTimestamp(
      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,g_face,c_thumb,r_max/v${cacheInvalidator}/teddies_monsters/${imageSrc}`,
    );

    const imageFetcher = async () => {
      const jwt = Cookies.get('jwt');
      const response = await api.get(`/api/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (response.status === 200 && response.data.avatar) {
        const { avatar } = response.data;
        setImageSrc(avatar);
      } else {
        setImageSrc('default');
      }
    };
    imageFetcher();
  }, [imageSrc, setImageSrcWithTimestamp]);

  const canvasObj = useRef<HTMLCanvasElement>(null);
  const profileImgRef = useRef<HTMLImageElement>(null);
  const cropCircle = useRef<SVGSVGElement>(null);

  const setCoor = () => {
    if (cropCircle.current) {
      const { x, y } = cropCircle.current.getBoundingClientRect();

      setCropCoor({ clientX: x, clientY: y });
    }
  };

  const handleZoom = (e: ChangeEvent<HTMLInputElement>) => {
    const zoom = Number(e.target.value);
    setRangeValue(zoom);

    if (!zoom || !aspectRatio || !canvasSize || !centerCoor) return;

    const zoomRatio =
      aspectRatio.type === ImageDirection.landscape
        ? canvasSize.width / zoom
        : canvasSize.height / zoom;

    setZoomRatio(zoomRatio);

    const img = new window.Image();
    if (!isIconModalOn) return;

    if (!file) {
      setIsCanvasSet(false);
    }

    const canvas = canvasObj.current;
    let ctx: CanvasRenderingContext2D | null;
    if (canvas) {
      ctx = canvas.getContext('2d');

      const reader = new FileReader();

      reader.addEventListener('loadend', () => {
        if (ctx && reader.result) {
          img.src = reader.result as string;

          img.addEventListener('load', (e) => {
            if (!ctx || !canvasSize) return;

            ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
            ctx.drawImage(
              img,
              centerCoor.x - (imageSize.width / 2) * zoomRatio,
              centerCoor.y - (imageSize.height / 2) * zoomRatio,
              imageSize.width * zoomRatio,
              imageSize.height * zoomRatio,
              0,
              0,
              canvasSize.width,
              canvasSize.height,
            );

            setIsCanvasSet(true);
          });
        }
      });

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleMove = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    coor: CenterCoor,
  ) => {
    if (!aspectRatio || !canvasSize || !zoomRatio) return;

    const img = new window.Image();
    if (!isIconModalOn) return;

    if (!file) {
      setIsCanvasSet(false);
    }

    const canvas = canvasObj.current;
    let ctx: CanvasRenderingContext2D | null;
    if (canvas) {
      ctx = canvas.getContext('2d');

      const reader = new FileReader();

      reader.addEventListener('loadend', () => {
        if (ctx && reader.result) {
          img.src = reader.result as string;

          img.addEventListener('load', (e) => {
            if (!ctx || !canvasSize) return;

            ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
            ctx.drawImage(
              img,
              coor.x - (imageSize.width / 2) * zoomRatio,
              coor.y - (imageSize.height / 2) * zoomRatio,
              imageSize.width * zoomRatio,
              imageSize.height * zoomRatio,
              0,
              0,
              canvasSize.width,
              canvasSize.height,
            );

            setIsCanvasSet(true);
          });
        }
      });

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleCrop = async () => {
    if (canvasObj.current) {
      const { x, y } = canvasObj.current.getBoundingClientRect();

      const ctx = canvasObj.current.getContext('2d');

      const data = ctx?.getImageData(
        cropCoor.clientX - x,
        cropCoor.clientY - y,
        profileSize,
        profileSize,
      );

      if (data && data.data) {
        const profileCanvas = document.createElement('canvas');

        profileCanvas.width = profileSize;
        profileCanvas.height = profileSize;

        const profileCanvasContext = profileCanvas.getContext('2d');

        profileCanvasContext?.putImageData(data, 0, 0);

        const imgScr = profileCanvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream');

        profileCanvas.toBlob((blob) => {
          setImage(blob as File);
          setProfileImage(blob as File);
        });

        const profileImg = new window.Image();
        profileImg.width = profileSize;
        profileImg.height = profileSize;
        profileImg.src = imgScr;

        const imgContainer = document.getElementById('profileContainer');

        if (imgContainer) {
          imgContainer.style.zIndex = '20';
          const childArr = imgContainer.childNodes;

          while (childArr.length > 0) {
            imgContainer.removeChild(childArr[0]);
          }

          imgContainer?.appendChild(profileImg);
        }

        setHasProfile(true);
        setHasProfileEdited(true);
      }
    }
  };

  useEffect(() => {
    setCropCoor({
      clientX: window.innerWidth / 2 - 50,
      clientY: window.innerHeight / 2 - 50,
    });
  }, []);

  useEffect(() => {
    if (profileImage) {
      const imgContainer = document.getElementById('profileContainer');
      var reader = new FileReader();
      reader.addEventListener('loadend', () => {
        const profileImg = new window.Image();
        profileImg.width = profileSize;
        profileImg.height = profileSize;
        if (typeof reader.result === 'string') {
          profileImg.src = reader.result;
        }

        if (imgContainer) {
          imgContainer.style.zIndex = '20';
          const childArr = imgContainer.childNodes;

          while (childArr.length > 0) {
            imgContainer.removeChild(childArr[0]);
          }

          imgContainer?.appendChild(profileImg);
        }
      });

      reader.readAsDataURL(profileImage);
    }
  }, [profileImage]);

  useEffect(() => {
    if (isIconModalOn) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }
    const img = new window.Image();
    if (!isIconModalOn) return;

    if (!file) {
      setIsCanvasSet(false);
    }

    const canvas = canvasObj.current;

    let ctx: CanvasRenderingContext2D | null;
    if (canvas) {
      ctx = canvas.getContext('2d');

      const reader = new FileReader();

      reader.addEventListener('loadend', () => {
        if (ctx && reader.result) {
          img.src = reader.result as string;

          img.addEventListener('load', (e) => {
            const { width, height } = screen;
            const target = e.target as HTMLImageElement;

            const ratio = target?.width / target?.height;
            let canvasHeight, canvasWidth;

            if (ratio >= 1) {
              canvasWidth = width / 3;
              canvasHeight = canvasWidth * (target?.height / target?.width);
              setAspectRatio({ ratio, type: ImageDirection.landscape });
              setRangeValue(canvasWidth);
              setZoomRatio(canvasWidth / canvasWidth);
            } else {
              canvasHeight = height / 3;
              canvasWidth = canvasHeight * (target?.width / target?.height);
              setAspectRatio({ ratio, type: ImageDirection.portrait });
              setRangeValue(canvasHeight);
              setZoomRatio(canvasHeight / canvasHeight);
            }

            setImageSize({ width: target?.width, height: target?.height });
            setCavasSize({ width: canvasWidth, height: canvasHeight });
            setCenterCoor({ x: target?.width / 2, y: target?.height / 2 });

            if (!ctx) return;
            ctx.canvas.width = canvasWidth;
            ctx.canvas.height = canvasHeight;

            ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

            setIsCanvasSet(true);
          });
        }
      });

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }, [isIconModalOn, file]);

  useEffect(() => {
    const sendImg = async () => {
      try {
        if (isCanvasSet && image) {
          const response: AxiosResponse = await imageUploader(
            username,
            'teddies_monsters',
            image,
          );

          if (response.status === 200) {
            toastSuccess('Avater updated');
          }

          setImage(null);
        }
      } catch (e) {
        toastError('Sorry, failed to update avater');
      }
    };

    sendImg();
  }, [image, username, isCanvasSet]);

  const updateName = async (e: FocusEvent) => {
    if (e.target) {
      const target = e.target as HTMLInputElement;
      const value = target.value;
      const targetId = target.id;

      if (targetId === 'firstName' && value === preFirstNameValue) return;
      if (targetId === 'lastName' && value === preLastNameValue) return;

      if (targetId === 'firstName' && value === '') {
        toastError('First name cannot be empty');
        return;
      }

      if (value.includes('-')) {
        toastError('"-" cannot be included as a name');
        return;
      }

      const hyphenCaseValue =
        lastNameValue !== ''
          ? `${firstNameValue}-${lastNameValue}`
          : firstNameValue;
      const usernameToUpdate = `${hyphenCaseValue}-${appendedId}`;
      if (usernameToUpdate !== username) {
        try {
          const res = await api.put(`/api/users/${id}`, {
            username: usernameToUpdate,
          });
          if (res.status === 200) {
            try {
              const res = await api.put(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/cloudinary`,
                {
                  username,
                  folderName: 'teddies_monsters',
                },
              );
              if (res.status === 200 && profileImage) {
                const response: AxiosResponse = await imageUploader(
                  usernameToUpdate,
                  'teddies_monsters',
                  profileImage,
                );
                if (response.status === 200) {
                  if (targetId === 'firstName') {
                    setPreFirstNameValue(value);
                  }
                  if (targetId === 'lastName') {
                    setPreLastNameValue(value);
                  }
                  toastSuccess('Username updated');
                }
              }
            } catch (e) {
              toastSuccess('Avater error');
            } finally {
              router.push(`/profile/${usernameToUpdate}`);
            }
          }
        } catch (e) {
          toastError('Failed to update username');
        }
      }
    }
  };

  return (
    <div>
      <div className='flex flex-col-reverse md:flex-row justify-between md:h-[50vh]'>
        <div className='flex flex-col w-8/12/12'>
          <div className='w-full h-full'>
            <div className='h-full'>
              <div
                className='text-4xl font-LDRKaet mt-5 md:mt-0'
                onClick={() => toastSuccess('test')}
              >
                PERSONAL INFORMATION
              </div>
              <div className='flex flex-col justify-evenly h-full'>
                <div className='mt-5 md:mt-0'>
                  <div className='font-LDRKaet'>FIRST NAME</div>
                  <Input
                    id='firstName'
                    type='text'
                    placeholder='Name'
                    width='full'
                    value={firstNameValue}
                    onChange={(e) => {
                      setFirstNameValue(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target) {
                        const target = e.target as HTMLInputElement;
                        target.blur();
                      }
                    }}
                    onBlur={(e) => updateName(e)}
                  />
                </div>
                <div className='mt-5 md:mt-0'>
                  <div className='font-LDRKaet'>LAST NAME</div>
                  <Input
                    id='lastName'
                    type='text'
                    placeholder='Name'
                    width='full'
                    value={lastNameValue}
                    onChange={(e) => {
                      setLastNameValue(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target) {
                        const target = e.target as HTMLInputElement;
                        target.blur();
                      }
                    }}
                    onBlur={(e) => updateName(e)}
                  />
                </div>
                <div className='mt-5 md:mt-0'>
                  <div className='font-LDRKaet'>EMAIL</div>
                  <Input
                    type='text'
                    placeholder='Email'
                    width='full'
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target) {
                        const target = e.target as HTMLInputElement;
                        target.blur();
                      }
                    }}
                    onBlur={async (e: FocusEvent) => {
                      if (e.target) {
                        const target = e.target as HTMLInputElement;
                        const value = target.value;

                        if (value === preEmailValue) return;
                        try {
                          emailSchema.parse(value);
                          const res = await api.put(`/api/users/${id}`, {
                            email: value,
                          });
                          if (res.status === 200) {
                            setPreEmailValue(value);
                            toastError('Email has successfully changed');
                          }
                        } catch (error) {
                          toastError('Email is invalid');
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className='mb-10 md:mb-0'
          style={{
            height: windowWidth >= 768 ? profileSize + 'px' : '100px',
            width: windowWidth >= 768 ? profileSize + 'px' : '100px',
          }}
        >
          <ClipLoader size={70} color='#CE8C3D' loading={isImgLoading} />
          <div
            style={{
              display:
                (hasProfile && hasProfileEdited) || profileImage
                  ? 'block'
                  : 'none',
            }}
            className='relative'
          >
            <div id='profileContainer'></div>
            <Image
              src={'/temp/mask.png'}
              width={windowWidth >= 768 ? profileSize : 100}
              height={windowWidth >= 768 ? profileSize : 100}
              alt='profile mask'
              onClick={() => setIsIconModalOn(true)}
              className='absolute top-0 left-0'
            />
          </div>
          {hasProfile &&
            !hasProfileEdited &&
            !isImgLoading &&
            !profileImage && (
              <>
                <Image
                  src={imageSrcWithTimestamp}
                  width={windowWidth >= 768 ? profileSize : 100}
                  height={windowWidth >= 768 ? profileSize : 100}
                  alt='profile image'
                  onClick={() => setIsIconModalOn(true)}
                  key={new Date().getTime()}
                  loading='eager'
                />
              </>
            )}
          {!hasProfile && !isImgLoading && !profileImage && (
            <div>
              <Image
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,r_max/teddies_monsters/default`}
                width={profileSize}
                height={profileSize}
                alt='profile image'
                onClick={() => setIsIconModalOn(true)}
              />
            </div>
          )}
        </div>
      </div>
      {isIconModalOn && (
        <div
          className={`w-screen h-screen bg-primary-modalBackground bg-opacity-50 top-0 left-0 fixed grid place-content-center overscroll-contain`}
          onClick={(e) => setIsIconModalOn(false)}
        >
          <div
            className='relative grid place-content-center mt-16'
            style={{
              width: screen.width / 2 + 'px',
              height: screen.height / 2 + 'px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {!isCanvasSet && (
              <div
                onDragEnter={() => {}}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <div className='bg-primary-lightOrange w-full h-full absolute flex justify-center items-center'>
                  <FontAwesomeIcon
                    icon={faArrowUpFromBracket}
                    className='w-1/2 h-1/2'
                  />
                </div>
              </div>
            )}
            {!isCanvasSet && (
              <label className='w-full h-full'>
                <input
                  type='file'
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFile(e.target.files[0]);
                    }
                  }}
                  className='block content-none bg-black opacity-0'
                  value=''
                  style={{
                    width: screen.width / 2,
                    height: screen.height / 2,
                  }}
                />
              </label>
            )}
            <canvas
              id='canvas'
              className={`border-primary-orange border-solid border-8 ${
                !isCanvasSet && 'hidden'
              }`}
              style={
                canvasSize
                  ? {
                      width: canvasSize.width,
                      height: canvasSize.height,
                    }
                  : {
                      width: screen.width / 2 + 'px',
                      height: screen.height / 2 + 'px',
                    }
              }
              ref={canvasObj}
            ></canvas>
            {isCanvasSet && (
              <>
                <div className='relative'>
                  <FontAwesomeIcon
                    icon={faCaretUp}
                    className='absolute w-8 h-8 bg-white/70'
                    style={{
                      top: canvasSize
                        ? `calc(${-canvasSize.height}px + 10px)`
                        : 0,
                      left: canvasSize
                        ? `calc(${canvasSize.width / 2}px - 1rem)`
                        : 0,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCenterCoor((prev) => {
                        if (!prev || !zoomRatio || !canvasSize) return null;
                        const relativeCanvasSize = {
                          width: imageSize.width * zoomRatio,
                          height: imageSize.height * zoomRatio,
                        };
                        if (
                          prev.y - (relativeCanvasSize.height / 2 + stepWidth) <
                          -(canvasSize.height / 10)
                        )
                          return { x: prev.x, y: prev.y };
                        handleMove(e, { x: prev.x, y: prev.y - stepWidth });
                        return { x: prev.x, y: prev.y - stepWidth };
                      });
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    className='absolute w-8 h-8 bg-white/70'
                    style={{
                      top: canvasSize ? `calc(-3rem + 5px)` : 0,
                      left: canvasSize
                        ? `calc(${canvasSize.width / 2}px - 1rem)`
                        : 0,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCenterCoor((prev) => {
                        if (!prev || !zoomRatio || !canvasSize) return null;
                        const relativeCanvasSize = {
                          width: imageSize.width * zoomRatio,
                          height: imageSize.height * zoomRatio,
                        };
                        if (
                          prev.y + (relativeCanvasSize.height / 2 + stepWidth) >
                          imageSize.height + canvasSize.height / 10
                        )
                          return { x: prev.x, y: prev.y };
                        handleMove(e, { x: prev.x, y: prev.y + stepWidth });
                        return { x: prev.x, y: prev.y + stepWidth };
                      });
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faCaretLeft}
                    className='absolute w-8 h-8 bg-white/70'
                    style={{
                      top: canvasSize
                        ? `calc(${-(canvasSize.height / 2)}px - 1rem)`
                        : 0,
                      left: canvasSize ? 10 : 0,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCenterCoor((prev) => {
                        if (!prev || !zoomRatio || !canvasSize) return null;
                        const relativeCanvasSize = {
                          width: imageSize.width * zoomRatio,
                          height: imageSize.height * zoomRatio,
                        };
                        if (
                          prev.x - (relativeCanvasSize.width / 2 + stepWidth) <
                          -(canvasSize.width / 10)
                        )
                          return { x: prev.x, y: prev.y };
                        handleMove(e, { x: prev.x - stepWidth, y: prev.y });
                        return { x: prev.x - stepWidth, y: prev.y };
                      });
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className='absolute w-8 h-8 bg-white/70'
                    style={{
                      top: canvasSize
                        ? `calc(${-(canvasSize.height / 2)}px - 1rem)`
                        : 0,
                      left: canvasSize
                        ? `calc(${canvasSize.width}px - 3rem + 5px)`
                        : 0,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCenterCoor((prev) => {
                        if (!prev || !zoomRatio || !canvasSize) return null;
                        const relativeCanvasSize = {
                          width: imageSize.width * zoomRatio,
                          height: imageSize.height * zoomRatio,
                        };
                        if (
                          prev.x + (relativeCanvasSize.width / 2 + stepWidth) >
                          imageSize.width + canvasSize.width / 10
                        )
                          return { x: prev.x, y: prev.y };
                        handleMove(e, { x: prev.x + stepWidth, y: prev.y });
                        return { x: prev.x + stepWidth, y: prev.y };
                      });
                    }}
                  />
                  <FontAwesomeIcon
                    className='w-5 h-5 bg-white/70 absolute'
                    icon={faClose}
                    style={{
                      top: canvasSize ? -canvasSize.height + 20 : 0,
                      left: 20,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                  />
                </div>
                <motion.svg
                  drag
                  dragConstraints={{
                    left: canvasSize?.width ? -canvasSize?.width / 2 : 0,
                    right: canvasSize?.width
                      ? canvasSize?.width / 2 - profileSize
                      : 0,
                    top: canvasSize?.height ? -canvasSize?.height / 2 - 50 : 0,
                    bottom: canvasSize?.height
                      ? canvasSize?.height / 2 - 50 - profileSize
                      : 0,
                  }}
                  dragMomentum={false}
                  onDragEnd={setCoor}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  ref={cropCircle}
                  className='w-[200px] h-[200px] stroke-primary-orange stroke-2 fill-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center'
                >
                  <circle cx='100' cy='100' r='100' />
                </motion.svg>
                <div className='flex justify-center'>
                  <input
                    className='w-6/12 my-2'
                    type='range'
                    max={
                      aspectRatio?.type === ImageDirection.landscape
                        ? imageSize.width
                        : imageSize.height
                    }
                    min={canvasSize?.width ? canvasSize?.width / 3 : 10}
                    onChange={handleZoom}
                    value={rangeValue}
                  ></input>
                  <FontAwesomeIcon className='m-2' icon={faMagnifyingGlass} />
                </div>
              </>
            )}
            <Button
              onClick={async (event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                event.stopPropagation();
                setIsIconModalOn(false);
                await handleCrop();
              }}
            >
              <p>CONFIRM</p>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
