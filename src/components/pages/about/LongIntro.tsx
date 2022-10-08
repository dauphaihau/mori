import React from 'react';
import { Box, Col, Text } from "core/components";
import { clns } from "core/helpers";
import aboutData from "assets/data/aboutData";

const LongIntro = () => {

  const Content = ({ data }) => {
    return (
      // <Box classes=' pt-10 w-1/5'>
      <Box classes='flex-[0.7] pt-8'>
        {/*<div className="w-3/5">*/}
        <Text
          weight='bold'
          classes='text-2xl mb-3 tracking-wider'
          transforms={'uppercase'}
        >
          {data.title}
        </Text>
        <p className='text-primary-gray desktop:pr-32 mb-4'>
          {data.content}
        </p>
        <p className='text-primary-gray desktop:pr-32'>
          {data.content2}
        </p>
      </Box>
    )
  }

  return (
    <Col classes='gap-44'>
      {
        aboutData.map((o, idx) => {
          return (
            <Box
              key={idx}
              classes={clns('flex flex-col laptop:flex-row',
                'laptop:gap-12 justify-around flex-col-reverse',
                idx % 2 == 0 && 'laptop:flex-row-reverse'
              )}
            >
              <Content data={o}/>
              <Box
                classes={clns('image-frame mb-20 flex-1',
                  idx % 2 === 0 ?
                    `before:bg-[url('/images/about/image-frame-left.png')]`
                    : `before:bg-[url('/images/about/image-frame-right.png')]`
                )}
              >
                <img src={o.image}/>

                {/*<NextImage*/}
                {/*  src='/images/history.jpg'*/}
                {/*  height={50}*/}
                {/*  width={100}*/}
                {/*  className='w-full h-auto z-10'*/}
                {/*  objectFit='contain'*/}
                {/*/>*/}
              </Box>
            </Box>
          )
        })
      }
    </Col>
  );
}

export default LongIntro;
