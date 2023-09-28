import Link from 'next/link';
import Button from '../button/Button';

interface OrderCardProps {
  date?: string;
  orderId?: number;
  total?: string;
  status?: string;
}

const OrderCard = ({ date, orderId, total, status }: OrderCardProps) => {
  return (
    <>
      <div className='text-[16px] bg-primary-lightOrange border-primary-orange border-[1px] rounded-[10px] py-2 px-2 my-2'>
        <ul className='w-full grid grid-cols-5 items-center'>
          <li>{date}</li>
          <li>{orderId}</li>
          <li>{total}</li>
          <li>{status}</li>
          <li>
            <Link className='block' href={`/orderdetail/${orderId}`}>
              <Button className={'text-[1rem]'}>More detail</Button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default OrderCard;
