'use client';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { User } from '@/types/user';
import Title from '../title/title';
import OrderTab from './orderTab/OrderTab';
import ProfileTab from './profileTab/ProfileTab';

import { Order } from '@/types/user';

enum Panel {
  profile = 'profile',
  order = 'order',
}

export const profileCookie = 'profile-tab';

const ProfilePage = ({ user, orders }: { user: User; orders: Order[] }) => {
  const { username } = user;
  const [panel, setPanel] = useState(Panel.profile);

  // for profile tab //
  const [isImgLoading, setIsImgLoading] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [imageSrcWithTimestamp, setImageSrcWithTimestamp] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [hasProfileEdited, setHasProfileEdited] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const displayName = username.split('-')[0];

  useEffect(() => {
    const profileTab = Cookies.get(profileCookie);

    if (profileTab) {
      setPanel(profileTab === Panel.profile ? Panel.profile : Panel.order);
    }
  }, []);

  useEffect(() => {
    if (!hasProfileEdited && !profileImage) {
      setIsImgLoading(true);

      const cacheInvalidator = Math.floor(Math.random() * 10000000000);

      const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,g_face,c_thumb,r_max/v${cacheInvalidator}/teddies_monsters/${username}`;

      fetch(imageUrl)
        .then((res) => {
          if (res.status === 200) {
            const img = new window.Image();
            img.width = 100;
            img.height = 100;
            img.src = imageUrl;
            img.onload = () => {
              setHasProfile(true);
              res.blob().then((img) => setProfileImage(img as File));
            };
            setImageSrcWithTimestamp(imageUrl);
          } else {
            setImageSrcWithTimestamp(
              `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,g_face,c_thumb,r_max/v${cacheInvalidator}/teddies_monsters/default`,
            );
          }
        })
        .finally(() => {
          setIsImgLoading(false);
        });
    }
  }, [username, panel, hasProfileEdited, profileImage]);

  // for profile tab //

  return (
    <div className='mb-52'>
      <Title text={`Hello, ${displayName}`} />
      <div className='flex justify-center'>
        <div className='w-2/4 '>
          <div>
            <span
              className={`mx-4 cursor-pointer ${
                panel === Panel.profile && 'border-b-2 border-primary-orange'
              }`}
              onClick={() => {
                setPanel(Panel.profile);
                Cookies.set(profileCookie, Panel.profile);
              }}
            >
              Profile
            </span>
            <span
              className={`mx-4 cursor-pointer ${
                panel === Panel.order && 'border-b-2 border-primary-orange'
              }`}
              onClick={() => {
                setPanel(Panel.order);
                Cookies.set(profileCookie, Panel.order);
              }}
            >
              Order
            </span>
          </div>
          <div className='mt-10'>
            {panel === Panel.profile && (
              <ProfileTab
                user={user}
                isImgLoading={isImgLoading}
                hasProfile={hasProfile}
                setHasProfile={setHasProfile}
                imageSrcWithTimestamp={imageSrcWithTimestamp}
                setImageSrcWithTimestamp={setImageSrcWithTimestamp}
                file={file}
                setFile={setFile}
                hasProfileEdited={hasProfileEdited}
                setHasProfileEdited={setHasProfileEdited}
                profileImage={profileImage}
                setProfileImage={setProfileImage}
              />
            )}
            {panel === Panel.order && (
              <div>
                <OrderTab orders={orders} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
