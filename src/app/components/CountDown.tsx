"use client"
import dynamic from 'next/dynamic';

const Countdown = dynamic(() => import('react-countdown'), { ssr: false });

const endingDate = new Date("2025-05-25");

const CountDown = () => {
  return (
    <Countdown
      className='font-bold text-5xl text-yellow-300'
      date={endingDate}
    />
  );
};

export default CountDown;