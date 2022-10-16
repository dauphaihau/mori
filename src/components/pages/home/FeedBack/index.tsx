import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import SliderContainer, { SliderItem } from "./SliderItem";
import { Col, Row, Text } from "core/components";
import FadeInSection from 'components/common/FadeInSection';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';

const CartTwitter = () => {
  return (
    <div className="min-w-screen h-auto  flex items-center justify-center px-5 py-5">
      {/*<div className="min-w-screen h-[400px]  flex items-center justify-center px-5 py-5 mt-10">*/}
      {/*<div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 py-5">*/}
      <div
        className="w-full h-full mx-auto rounded-lg bg-white shadow p-5 text-gray-800"
        style={{ maxWidth: '400px' }}
        // style="max-width: 400px"
      >
        <div className="w-full flex mb-4">
          <div className="overflow-hidden rounded-full w-12 h-12">
            <img
              src={`https://i.pravatar.cc/300?${Math.random()}`}
              alt=""
            />
          </div>
          <div className="flex-grow pl-3">
            <h6 className="font-bold text-md">Joe Blow</h6>
            <p className="text-xs text-gray-600">@joe.blow</p>
          </div>
          <div className="w-12 text-right">
            <i className="fa-brands fa-twitter text-blue-400 text-2xl"></i>
            {/*<i className="mdi mdi-twitter text-blue-400 text-3xl"></i>*/}
          </div>
        </div>
        <div className="w-full mb-4">
          <p className="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam obcaecati laudantium
            recusandae, debitis eum voluptatem ad, illo voluptatibus temporibus odio provident. Laboriosam accusamus
            necessitatibus tenetur praesentium ullam voluptates nulla reprehenderit? ?</p>
        </div>
        {/*<div className="w-full">*/}
        {/*  <p className="text-xs text-gray-500 text-right">Oct 15th 8:33pm</p>*/}
        {/*</div>*/}
      </div>
    </div>
  )
}

const CartTwitter2 = ({data}) => {
  return (
    <div className="min-w-screen h-auto flex items-center justify-center p-5">
      {/*<div className="min-w-screen h-[400px]  flex items-center justify-center px-5 py-5 mt-10">*/}
      {/*<div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 py-5">*/}
      <div
        className="w-full h-full mx-auto rounded-lg bg-white shadow p-5 text-gray-800"
        style={{ maxWidth: '400px' }}
        // style="max-width: 400px"
      >
        <div className="w-full flex mb-4">
          <div className="overflow-hidden rounded-full w-12 h-12">
            <img
              src={`https://i.pravatar.cc/300?${Math.random()}`}
              alt=""
            />
          </div>
          <div className="flex-grow pl-3">
            {/*<h6 className="font-bold text-md">Joe Blow</h6>*/}
            <h6 className="font-bold text-md">{data.author}</h6>
            <p className="text-xs text-gray-600">@joe.blow</p>
          </div>
          <div className="w-12 text-right">
            {/*<i className="mdi mdi-twitter text-blue-400 text-3xl"></i>*/}
            <i className="fa-brands fa-twitter text-blue-400 text-2xl"></i>
          </div>
        </div>
        <div className="w-full mb-4">
          <p className="text-sm">
            {data.feedback}
          {/*tweet*/}
            {/*🚀 With a bit of delay: a new and improved http://daafdaan.com. This is the 3rd website I’ve launched with*/}
            {/*@Framer Sites and I am super impressed. Can’t wait to do more.In the meantime, have a look, and if you wanna*/}
            {/*collaborate, send me a message! ✌️*/}
          </p>
        </div>
        {/*<div className="w-full">*/}
        {/*  <p className="text-xs text-gray-500 text-right">Oct 15th 8:33pm</p>*/}
        {/*</div>*/}
      </div>
    </div>
  )
}

const Carousell = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  return (
    <Carousel
      className='testtt'
      loop
      plugins={[autoplay.current]}
      speed={0.01}
      orientation="vertical"
      height={800}
      withControls={false}
      // withIndicators
      initialSlide={5}
      // slidesToScroll={6}
      sx={{ maxWidth: 320 }}
      mx="auto"
      slideSize="20%"
      // slideSize="33.333333%"
      slideGap="sm"
      // breakpoints={[
      //   { maxWidth: 'md', slideSize: '50%' },
      //   { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
      // ]}
      draggable={false}
      align="start"
      // align="start"
    >
      {
       data.map((item, index) => (
         <Carousel.Slide key={index}>
           <CartTwitter2 data={item}/>
         </Carousel.Slide>
       ))
      }
      {/*<Carousel.Slide><CartTwitter/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter2 author/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter2/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter2/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter2/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter2/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter2/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter2/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter2/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter2/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter2/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter2/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter/></Carousel.Slide>*/}
      {/*<Carousel.Slide><CartTwitter/></Carousel.Slide>*/}
    </Carousel>

  )
}

const FeedBack: React.FC = () => {
  return (
    <FadeInSection classes='py-16 tablet:py-24 mb-12 '>
      <Col
        justify='center'
        align='center'
      >
        <Text
          h2
          classes='mb-10'
        >Feedback</Text>
        <Row>
          <Carousell/>
          <Carousell/>
          <Carousell/>
          <Carousell/>
        </Row>
      </Col>
    </FadeInSection>
  );

}

export default FeedBack;

const data = [
  {
    author: 'Vanessa Bird',
    feedback: 'Although the web site and all tools and information was Excellent, I, personally needed to talk to someone, i didnt feel confident with to order a product so very personal over the inter-net, but i do think in time things will change.'
  },
  {
    author: 'Vivienne M',
    feedback: `When we first found Pastlives they seemed too good to be true. Professional, fast and ridiculously talented; the 3D AR Filter component they have developed for our React Native app is super smooth and responsive.`
  },
  {
    author: 'Charles R. Cheltenham',
    feedback: `We would like to extend our appreciation and thank you for the detail and care that you put into your work, the casket that was provided for our father was elegant and beatiful. We appreciate very much your kindness and generosity during these difficult times. `
  },
  {
    author: 'Jason P. Heidelberg, Victoria',
    feedback: `Thank you Steve, not just for arranging the coffin but for all the advice and help over the phone. Made a difficult task much easier than expected. Best wishes, Carron PS. `
  },
  {
    author: 'Sylvia Wearing',
    feedback: `I ordered a coffin for my mother-in-law and feeling a bit anxious, rang early the next morning to check if it was ok, to find Steven had already been in touch with the undertaker to check on delivery arrangements. I was very impressed with the service and would recommend this company to anyone. `
  },
  {
    author: 'Peter',
    feedback: ` Dear Steven, I am delighted with the help you have given at this unusual time. The coffin is beautiful and both my sister and niece agree. Everything you promised happened, and all those things made this time easier. Thank you. Kind regards, `
  },
  {
    author: 'Sarah Carroll',
    feedback: `🚀  I found the website through Google and was very glad I did. More people should be aware that you can actually buy your own coffin rather than just accepting those on offer from the funeral director. `
  },
  {
    author: 'Margaret Graham',
    feedback: ` Dear Steven, Hope you are very well. Just writing to let you know that the funeral went very well and everyone was extremely pleased and happy with the coffin you chose. Thanks again for your kindness, thoughtfulness and advise. Best wishes `
  },
]
