import React from 'react';

interface Props {
  by: string,
  children: JSX.Element
}

const Review: React.FC<Props> = ({ children, by }) => {
  return (
    <div className={`flex flex-col justify-center items-center text-center px-5`}>
      <div className='text-xl md:text-2xl leading-6 lg:leading-[3rem]'>
        &ldquo;{children}&rdquo;
      </div>
      <div className='mt-6'>&mdash; {by}</div>
    </div>
  );
}

export default Review;
