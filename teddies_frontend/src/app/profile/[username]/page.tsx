import ProfilePage from '@/components/profilePage/ProfilePage';
import { api } from '@/utils/axios';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
};

{
  /* <>
<ProfileTab />
<OrderTab />
</>

// wraper
// server component
// make tabs component */
}

const Profile = async ({ params }: { params: { username: string } }) => {
  const { username } = params;

  // Francois's code
  // const user = await api.get(
  //   `/api/users?filters[username]=${username}&populate[0][cart_items][populate]=*&populate[1][order][populate][0]=order_details`,
  // );

  // without cart items
  const orders = await api.get(
    `/api/users?filters[username]=${username}&populate[0]=cart_items&populate[orders][populate][0]=order_details`,
  );

  // all
  const user = await api.get(
    `/api/users?filters[username]=${username}&populate=*`,
  );

  if (user.status !== 200 || user.data.length !== 1) {
    return <div>Error!</div>;
  }

  return <ProfilePage user={user.data[0]} orders={orders.data[0].orders} />;
};

export default Profile;
