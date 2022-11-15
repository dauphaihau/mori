import React from 'react';
import { Box, Col, Text } from "core/components";
import { clns } from "core/helpers";
import { config } from "config";

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
        data.map((o, idx) => {
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
                <img src={config.hostStaticSource + o.image}/>

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

const data = [
  {
    title: 'The History',
    // content: `Our story begins in the 1920s when Arthur ‘Sam’ Mori bought a cottage with a small plot of land on the
    // Somerset Levels for £100 – primarily as the deal included an industrial boiler. Nearly 100 years and four
    // generations laTer, Mori Willows supplies willow and willow products to customers all over the world.
    // `,
    content: `Our story begins in the 1911s when Tommy 'Shelby' Mori bought a cottage with a small plot of land on the
    Somerset Levels for £100 – primarily as the deal included an industrial boiler. 
    `,
    content2: `Today, Mori Willows grow more than 60 different varieties of willow on 200 acres of Somerset farmland. Many of the tried and tested processes (including boiling) are still used by the Mori family. `,
    image: '/about/history_nvpavc.webp'
  },
  {
    title: 'The Family',
    content: `At the heart of the business are Michael and Ellen Mori and their children Jack and Holly. `,
    content2: `Each brings a unique set of skills to the company. With a new generation comes fresh ideas. The marrying of traditional processes with modern innovations has proved to be a winning combination.`,
    image: '/about/family_k9oicp.webp'
  },
  {
    title: 'The Team',
    content: `Alongside the Mori family is a dedicated team which includes an incredibly talented group of willow weavers.`,
    content2: `Everyone who works at Mori Willows is passionate about the products they make and the service that they provide. There is a real commitment to continuing the ancient traditions of willow growing and weaving. Mike and Ellen are happy to pass on their extensive knowledge.`,
    image: '/about/team_whbdsz.webp'
  },
  {
    title: 'The Awards',
    content: `The quality of our products and services has been recognised with numerous awards.`,
    content2: `Michael Mori has been awarded membership as a Yeoman of the Worshipful Company of Basketmakers. This prestigious accolade recognises the workmanship and skills of a very select band of craftsmen. There are only 35 Yeoman members.`,
    image: '/about/history_nvpavc.webp'
  },
]
