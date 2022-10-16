import React from 'react';
import Image from "next/image";
import SliderContainer, { SliderItem } from "./SliderItem";
import { Col, Text } from "core/components";
import FadeInSection from 'components/common/FadeInSection';

const ClientLogo: React.FC = () => {

  return (
    <FadeInSection classes='py-16 tablet:py-24 mb-12 bg-gray-custom-50'>
      <Col
        justify='center'
        align='center'
      >
        <Text
          h2
          classes='mb-10'
        >As Recognized By</Text>

        {

          <SliderContainer
            contentWidth={1980}
            initialOffsetX={0}
          >
            {
              data.map((item, index) => (
                <SliderItem width={150} key={index}>
                  <Image
                    src={item.srcUrl}
                    // src='/images/logos/audubon.png'
                    width={150}
                    height={50}
                    objectFit='contain'
                    alt={item.name}
                  />
                </SliderItem>
              ))
            }
          </SliderContainer>
        }

        {/*<SliderContainer*/}
        {/*  contentWidth={1980}*/}
        {/*  initialOffsetX={0}*/}
        {/*>*/}
        {/*  <SliderItem width={150}>*/}
        {/*    <Image*/}
        {/*      // src='https://www.musgrovewillowscoffins.co.uk/wp-content/uploads/2022/06/FFMA-coffin-logo.png'*/}
        {/*      src='https://bellacouche.com/wp-content/uploads/South-West-England-dark-302px.png'*/}
        {/*      // src='/images/logos/audubon.png'*/}
        {/*      width={150}*/}
        {/*      height={50}*/}
        {/*      objectFit='contain'*/}
        {/*      alt='Audubon'*/}
        {/*    />*/}
        {/*  </SliderItem>*/}
        {/*  */}
        {/*  <SliderItem width={150}>*/}
        {/*    <Image*/}
        {/*      src='/images/logos/exodus.png'*/}
        {/*      width={150}*/}
        {/*      height={50}*/}
        {/*      objectFit='contain'*/}
        {/*      alt='Coinbase'*/}
        {/*    />*/}
        {/*  </SliderItem>*/}
        {/*  <SliderItem width={150}>*/}
        {/*    <Image*/}
        {/*      src='/images/logos/litentry.png'*/}
        {/*      width={150}*/}
        {/*      height={50}*/}
        {/*      objectFit='contain'*/}
        {/*      alt='Coinbase'*/}
        {/*    />*/}
        {/*  </SliderItem>*/}
        {/*  <SliderItem width={150}>*/}
        {/*    <Image*/}
        {/*      src='/images/logos/picnic.png'*/}
        {/*      width={150}*/}
        {/*      height={50}*/}
        {/*      objectFit='contain'*/}
        {/*      alt='Coinbase'*/}
        {/*    />*/}
        {/*  </SliderItem>*/}
        {/*  <SliderItem width={150}>*/}
        {/*    <Image*/}
        {/*      src='/images/logos/rainbow.png'*/}
        {/*      width={150}*/}
        {/*      height={50}*/}
        {/*      objectFit='contain'*/}
        {/*      alt='Coinbase'*/}
        {/*    />*/}
        {/*  </SliderItem>*/}
        {/*  <SliderItem width={150}>*/}
        {/*    <Image*/}
        {/*      src='/images/logos/snapcalorie.png'*/}
        {/*      width={150}*/}
        {/*      height={50}*/}
        {/*      objectFit='contain'*/}
        {/*      alt='Coinbase'*/}
        {/*    />*/}
        {/*  </SliderItem>*/}
        {/*  <SliderItem width={150}>*/}
        {/*    <Image*/}
        {/*      src='/images/logos/walletconnect.png'*/}
        {/*      width={150}*/}
        {/*      height={50}*/}
        {/*      objectFit='contain'*/}
        {/*      alt='Coinbase'*/}
        {/*    />*/}
        {/*  </SliderItem>*/}
        {/*  <SliderItem width={150}>*/}
        {/*    <Image*/}
        {/*      src='/images/logos/extra.png'*/}
        {/*      width={150}*/}
        {/*      height={50}*/}
        {/*      objectFit='contain'*/}
        {/*      alt='Coinbase'*/}
        {/*    />*/}
        {/*  </SliderItem>*/}
        {/*  <SliderItem width={150}>*/}
        {/*    <Image*/}
        {/*      src='/images/logos/litentry.png'*/}
        {/*      width={150}*/}
        {/*      height={50}*/}
        {/*      objectFit='contain'*/}
        {/*      alt='Coinbase'*/}
        {/*    />*/}
        {/*  </SliderItem>*/}
        {/*  <SliderItem width={150}>*/}
        {/*    <Image*/}
        {/*      src='/images/logos/coinbase.png'*/}
        {/*      width={150}*/}
        {/*      height={50}*/}
        {/*      objectFit='contain'*/}
        {/*      alt='Coinbase'*/}
        {/*    />*/}
        {/*  </SliderItem>*/}
        {/*  <SliderItem width={150}>*/}
        {/*    <Image*/}
        {/*      src='/images/logos/expensify.png'*/}
        {/*      width={150}*/}
        {/*      height={50}*/}
        {/*      objectFit='contain'*/}
        {/*      alt='Coinbase'*/}
        {/*    />*/}
        {/*  </SliderItem>*/}

        {/*</SliderContainer>*/}

        <SliderContainer
          className='mt-8'
          contentWidth={1980}
          initialOffsetX={0}
        >
          <SliderItem width={150}>
            <Image
              src='/images/logos/status.png'
              width={150}
              height={50}
              objectFit='contain'
              alt='Coinbase'
            />
          </SliderItem>
          <SliderItem width={150}>
            <Image
              src='/images/logos/scribeware.png'
              width={150}
              height={50}
              objectFit='contain'
              alt='Coinbase'
            />
          </SliderItem>
          <SliderItem width={150}>
            <Image
              src='/images/logos/exodus.png'
              width={150}
              height={50}
              objectFit='contain'
              alt='Coinbase'
            />
          </SliderItem>
          <SliderItem width={150}>
            <Image
              src='/images/logos/snapcalorie.png'
              width={150}
              height={50}
              objectFit='contain'
              alt='Coinbase'
            />
          </SliderItem>
          <SliderItem width={150}>
            <Image
              src='/images/logos/walletconnect.png'
              width={150}
              height={50}
              objectFit='contain'
              alt='Coinbase'
            />
          </SliderItem>
          <SliderItem width={150}>
            <Image
              src='/images/logos/extra.png'
              width={150}
              height={50}
              objectFit='contain'
              alt='Coinbase'
            />
          </SliderItem>
          <SliderItem width={150}>
            <Image
              src='/images/logos/expensify.png'
              width={150}
              height={50}
              objectFit='contain'
              alt='Coinbase'
            />
          </SliderItem>
          <SliderItem width={150}>
            <Image
              src='/images/logos/stori.png'
              width={150}
              height={50}
              objectFit='contain'
              alt='Coinbase'
            />
          </SliderItem>
          <SliderItem width={150}>
            <Image
              src='/images/logos/tocsen.png'
              width={150}
              height={50}
              objectFit='contain'
              alt='Coinbase'
            />
          </SliderItem>
          <SliderItem width={150}>
            <Image
              src='/images/logos/tocsen.png'
              width={150}
              height={50}
              objectFit='contain'
              alt='Coinbase'
            />
          </SliderItem>
          <SliderItem width={150}>
            <Image
              src='/images/logos/tocsen.png'
              width={150}
              height={50}
              objectFit='contain'
              alt='Coinbase'
            />
          </SliderItem>
          <SliderItem width={150}>
            <Image
              src='/images/logos/tocsen.png'
              width={150}
              height={50}
              objectFit='contain'
              alt='Coinbase'
            />
          </SliderItem>
          <SliderItem width={150}>
            <Image
              src='/images/logos/tocsen.png'
              width={150}
              height={50}
              objectFit='contain'
              alt='Coinbase'
            />
          </SliderItem>
        </SliderContainer>
      </Col>
    </FadeInSection>
  );

}

export default ClientLogo;

const data = [
  {
    name: 'Fibreshed',
    srcUrl: 'https://bellacouche.com/wp-content/uploads/South-West-England-dark-302px.png'
  },
  // {
  //   name: 'Good Funeral Guild Member',
  //   srcUrl: 'https://bellacouche.com/wp-content/uploads/Good-Funeral-Guild-Member.jpg'
  // },
  // {
  //   name: '3-Monument-Builders-of-NA-Logo',
  //   srcUrl: 'https://www.milanomonuments.com/hs-fs/hubfs/logo%202018/3-Monument-Builders-of-NA-Logo.png?width=164&name=3-Monument-Builders-of-NA-Logo.png'
  // },
  // {
  //   name: '6-NOIA-Foundation-Logo-1',
  //   srcUrl: 'https://www.milanomonuments.com/hs-fs/hubfs/logo%202018/6-NOIA-Foundation-Logo-1.png?width=200&name=6-NOIA-Foundation-Logo-1.png'
  // },
  {
    name: 'Fibreshed',
    srcUrl: 'https://bellacouche.com/wp-content/uploads/South-West-England-dark-302px.png'
  },
  {
    name: 'Fibreshed',
    srcUrl: 'https://bellacouche.com/wp-content/uploads/South-West-England-dark-302px.png'
  },
  {
    name: 'Fibreshed',
    srcUrl: 'https://bellacouche.com/wp-content/uploads/South-West-England-dark-302px.png'
  },
]
