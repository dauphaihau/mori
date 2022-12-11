import React, { useRef } from 'react';
import { Col, Row, Text } from "core/components";
import FadeInSection from 'components/common/FadeInSection';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useMediaQuery } from "core/hooks";

const CartTwitter = ({ data }) => {
  return (
    <div className="min-w-screen h-auto flex items-center justify-center p-5">
      <div className="
      w-full h-full mx-auto rounded-lg bg-white
      card-twitter--border card-twitter--shadow
       p-5 text-gray-800 max-w-[730px] laptop:max-w-[400px]">
        <div className="w-full flex mb-4">
          <div className="overflow-hidden rounded-full w-12 h-12">
            <img
              src={`https://i.pravatar.cc/300?${Math.random()}`}
              alt=""
            />
          </div>
          <div className="flex-grow pl-3">
            <h6 className="text-md">{data.author}</h6>
            <p className="text-xs text-gray-600">@joe.blow</p>
          </div>
          <div className="w-12 text-right">
            <i className="fa-brands fa-twitter text-blue-400 text-2xl"></i>
          </div>
        </div>
        <div className="w-full mb-4">
          <p className="text-sm">
            {data.feedback}
          </p>
        </div>
        {/*<div className="w-full">*/}
        {/*  <p className="text-xs text-gray-500 text-right">Oct 15th 8:33pm</p>*/}
        {/*</div>*/}
      </div>
    </div>
  )
}

const CarouselVertical = ({ data }) => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  return (
    <Carousel
      className='feedback-carousel-mask'
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
      // sx={{ maxWidth: 1020 }}
      mx="auto"
      // slideSize="20%"
      slideSize="33.333333%"
      slideGap="sm"
      breakpoints={[
        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
        // { maxWidth: 'md', slideSize: '80%' },
        // { maxWidth: 'lg', slideSize: '20%' },
      ]}
      draggable={false}
      align="start"
    >
      {
        data.map((item, index) => (
          <Carousel.Slide key={index}>
            <CartTwitter data={item}/>
          </Carousel.Slide>
        ))
      }
    </Carousel>

  )
}

const FeedBack: React.FC = () => {
  const matches = useMediaQuery('(min-width: 1280px)')
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
          <CarouselVertical data={data}/>
          {
            matches && (
              <>
                <CarouselVertical data={data2}/>
                <CarouselVertical data={data3}/>
                <CarouselVertical data={data4}/>
              </>
            )
          }
        </Row>
      </Col>
    </FadeInSection>
  );
}

export default FeedBack;

const data = [
  {
    author: 'Vanessa Bird',
    feedback: 'Although the web site and all tools and information was Excellent 🔥, I, personally needed to talk to someone, i didnt feel confident with to order a product so very personal over the inter-net, but i do think in time things will change.'
  },
  {
    author: 'Vivienne M',
    feedback: `When we first found Pastlives they seemed too good to be true. 😍 Professional, fast and ridiculously talented; the 3D AR Filter component they have developed for our React Native app is super smooth and responsive.`
  },
  {
    author: 'Charles ',
    feedback: `We would like to extend our appreciation and thank you for the detail and care that you put into your work, the casket that was provided for our father was elegant and beatiful. We appreciate very much your kindness and generosity during these difficult times. `
  },
  {
    author: 'Jason P. Heidelberg',
    feedback: `Thank you Steve ❣️, not just for arranging the coffin but for all the advice and help over the phone. Made a difficult task much easier than expected. Best wishes, Carron PS. `
  },
  {
    author: 'Sylvia Wearing',
    feedback: `I ordered a coffin for my mother-in-law and feeling a bit anxious, rang early the next morning to check if it was ok, to find Steven had already been in touch with the undertaker to check on delivery arrangements. I was very impressed with the service and would recommend this company to anyone. `
  },
  {
    author: 'Peter',
    feedback: `Dear Steven, I am delighted with the help you have given at this unusual time 🤯. The coffin is beautiful and both my sister and niece agree. Everything you promised happened, and all those things made this time easier. Thank you. Kind regards,✨ `
  },
  {
    author: 'Sarah Carroll',
    feedback: `🚀  I found the website through Google and was very glad I did. More people should be aware that you can actually buy your own coffin rather than just accepting those on offer from the funeral director. `
  },
  {
    author: 'Margaret Graham',
    feedback: ` Dear Steven, Hope you are very well. Just writing to let you know that the funeral went very well and everyone was extremely pleased and happy with the coffin you chose. Thanks again for your kindness, thoughtfulness and advise. Best wishes 🙏🏻`
  },
]

const data2 = [
  {
    author: 'Jake',
    feedback: '"My family and I just want to thank you from the bottom of our heart. We thought we couldn’t afford a decent casket after we saw the prices at the funeral homes.. '
  },
  {
    author: 'Emily',
    feedback: `Our Son was a big collingwood fan and supporter. So we wanted a casket that allowed us to embrace this.`
  },
  {
    author: 'Victoria',
    feedback: `After a quick chat with the staff at Coffin World, we were able to get a lovely white metal casket with colours of the collingwood football club beautifully placed on it.`
  },
  {
    author: 'Ewelina Matysiak',
    feedback: `Absolutely lovely service and very happy with the coffin we have ordered. Thank you Steven for all your help.`
  },
  {
    author: 'Janine',
    feedback: `I just heard Steven on U105 there explaining this website which brought me to it. I wanted to say what a great idea you all have put together. I’ve been to enough funerals in my short life, and each one of them as sombre as the next. I love the idea of being able to plan your own so that people behind can just “celebrate” your life, rather than worry about arrangements. Good luck to you. Kind Regards.`
  },
  {
    author: 'Ann-Marie Stephenson',
    feedback: `I had no doubt that there would be no problem with the delivery to the funeral director having spoken to you. I’ll pop a review on Google, but I wanted to message you direct to say thank you.`
  },
  {
    author: 'Lisa Charman',
    feedback: `I would just like to say that everyone commented on the coffin I recently purchased from you (the cerise banana casket). They all said how beautiful it was and the guy at the mortuary said it was the nicest one of it’s kind he’d ever seen. Thank you. Kind regards`
  },
]

const data3 = [
  {
    author: 'Charlotte',
    feedback: ` Very nice people to deal with, made the choice simple and easy and right for us `
  },
  {
    author: 'Sharon',
    feedback: `I am delighted with the help you have given at this unusual time. The coffin is beautiful and both my sister and niece agree. Everything you promised happened, and all those things made this time easier. Thank you. Kind regards, `
  },
  {
    author: 'Vincent',
    feedback: `After a quick chat with the staff at Coffin World, we were able to get a lovely white metal casket with colours of the collingwood football club beatifully placed on it.`
  },
  {
    author: 'Vanessa',
    feedback: `Absolutely lovely service and very happy with the coffin we have ordered. Thank you Steven for all your help.`
  },
  {
    author: 'Holtham',
    feedback: `Now I have my normal head back on and things have calmed down I realised I had not said a very big Thank You to you for all your help.`
  },
  {
    author: 'Ben',
    feedback: `Now I have my normal head back on and things have calmed down I realised I had not said a very big Thank You to you for all your help.`
  },
  {
    author: 'Pat',
    feedback: `The coffin you supplied for |John was superb. Exactly what he would have wanted. It caused a lot of interest on the island. I was very pleased with it and could not have wanted better. `
  },
  {
    author: 'David',
    feedback: `The whole experience of “doing” the funeral ourselves was incredibly special. We popped my mother in her coffin in the back of the landcover and took her to the funeral ourselves.`
  },
]

const data4 = [
  {
    author: 'Hardin',
    feedback: `At what was an extremely stressful time due to other issues with the funeral directors your service was impeccable, professional to the end and we thank you for helping us through this`
  },
  {
    author: 'Solomon',
    feedback: `This was a fantastic resource when planning my father’s funeral- the first people i spoke to who weren’t horrified that I wanted to organise it myself. The help, advice and support on all aspects of the project were wonderful.`
  },
  {
    author: 'Hai',
    feedback: `After a quick chat with the staff at Coffin World, we were able to get a lovely white metal casket with colours of the collingwood football club beatifully placed on it.`
  },
  {
    author: 'Vicky',
    feedback: `I’ll pop a review on Google, but I wanted to message you direct to say thank you.`
  },
  {
    author: 'Roger',
    feedback: `The service we had from Kevin and his team was excellent in in every way. I would not hesitate to recommend them. You helped to make a sad day a celebration.`
  },
  {
    author: 'Mon',
    feedback: `We ordered the Poplar Wood Casket with Satin Cherry Finish, and we were very happy with the look, feel and overall quality. It’s sad to lose someone you love, but at least with Mori you don’t get ripped off and you allow your loved one to have a classy funeral.`
  },
  {
    author: 'Eliot',
    feedback: `The casket that I purchased from Mori was extremely well worth the money. It was beautiful and well built and half the price that the funeral home was charging.`
  },
  {
    author: 'Dan',
    feedback: `Great price for a great casket. Looked just as good as it did online. Easy to order. Casket was delivered within a few days. No damages upon delivery. Highly recommend Mori!`
  },
]
