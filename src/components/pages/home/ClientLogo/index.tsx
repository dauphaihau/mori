import React from 'react';
import Image from "next/image";
import SliderContainer, { SliderItem } from "./SliderItem";
import { Col, Text } from "core/components";

const ClientLogo: React.FC = () => {
  return (
    <Col
      justify='center'
      align='center'
      classes='py-16 tablet:py-24 mb-12 bg-gray-custom-50'
    >
      <Text h2 classes='mb-10'>As Recognized By</Text>

      <SliderContainer
        contentWidth={1980}
        initialOffsetX={0}
      >
        <SliderItem width={150}>
          <Image
            src='/images/logos/audubon.png'
            width={150}
            height={50}
            objectFit='contain'
            alt='Audubon'
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
            src='/images/logos/litentry.png'
            width={150}
            height={50}
            objectFit='contain'
            alt='Coinbase'
          />
        </SliderItem>
        <SliderItem width={150}>
          <Image
            src='/images/logos/picnic.png'
            width={150}
            height={50}
            objectFit='contain'
            alt='Coinbase'
          />
        </SliderItem>
        <SliderItem width={150}>
          <Image
            src='/images/logos/rainbow.png'
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
            src='/images/logos/litentry.png'
            width={150}
            height={50}
            objectFit='contain'
            alt='Coinbase'
          />
        </SliderItem>
        <SliderItem width={150}>
          <Image
            src='/images/logos/coinbase.png'
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

      </SliderContainer>

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
        {/*<SliderItem width={150}>*/}
        {/*  <Image*/}
        {/*    src='/images/logos/expensify.png'*/}
        {/*    width={150}*/}
        {/*    height={50}*/}
        {/*    objectFit='contain'*/}
        {/*    alt='Coinbase'*/}
        {/*  />*/}
        {/*</SliderItem>*/}
        {/*<SliderItem width={150}>*/}
        {/*  <Image*/}
        {/*    src='/images/logos/stori.png'*/}
        {/*    width={150}*/}
        {/*    height={50}*/}
        {/*    objectFit='contain'*/}
        {/*    alt='Coinbase'*/}
        {/*  />*/}
        {/*</SliderItem>*/}
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
  );

}

export default ClientLogo;
