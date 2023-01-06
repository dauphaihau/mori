import React from 'react';

import { Box, Col, Text } from "core/components";
import { config } from "config";
import { aboutData } from 'assets/data/About';

export default function LongIntro() {

  const Content = ({ data }) => {
    return (
      <Box classes='flex-[0.7] pt-8'>
        <Text
          weight='bold'
          classes='text-2xl mb-3 tracking-wider'
          transforms='uppercase'
        >
          {data.title}
        </Text>
        <Text classes='text-primary-gray desktop:pr-32 mb-4'>
          {data.content}
        </Text>
        <Text classes='text-primary-gray desktop:pr-32'>
          {data.content2}
        </Text>
      </Box>
    )
  }

  return (
    <Col classes='gap-32 tablet:gap-44'>
      {
        aboutData.longIntroList.map((item, idx) => {
          return (
            <Box
              key={idx}
              classes={['flex flex-col laptop:flex-row',
                'laptop:gap-12 justify-around flex-col-reverse',
                idx % 2 == 0 && 'laptop:flex-row-reverse'
              ]}
            >
              <Content data={item}/>
              <Box
                classes={['image-frame mb-20 flex-1',
                  idx % 2 === 0 ?
                    `before:bg-[url('/images/about/image-frame-left.png')]`
                    : `before:bg-[url('/images/about/image-frame-right.png')]`
                ]}
              >
                <img alt='image-frame' src={config.hostStaticSource + item.srcImg}/>
              </Box>
            </Box>
          )
        })
      }
    </Col>
  );
}
