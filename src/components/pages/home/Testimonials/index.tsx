import React from 'react';
import Carousel from "context/carouselContext";
import CarouselItem from "./CarouselItem";
import Review from "./Review";
import { Box, Col, Text } from "core/components";
import { useFadeIn } from "core/hooks";
import { clns } from "core/helpers";

const Testimonials: React.FC = () => {
  const [ref, isVisible] = useFadeIn()
  return (
    <Box
      ref={ref}
      section
      classes={clns('pt-20',
        'fade-in-section',
        isVisible ? 'is-visible' : ''
      )}
    >
      <Col
        justify='center'
        align='center'
      >
        <Text h2>Testimonials</Text>
      </Col>
      <Carousel className='text-primary-gray py-10 lg:py-20'>
        <CarouselItem index={0}>
          <Review by='Vanessa Bird'>
            <Text span>
              Although the web site and all tools and information was Excellent, I, personally needed to talk to
              someone,
              i didnt feel confident with to order a product so very personal over the inter-net, but i do think in time
              things will change.
            </Text>
          </Review>
        </CarouselItem>
        <CarouselItem index={1}>
          <Review by='Vivienne M'>
            <Text span>
              When we first found Pastlives they seemed too good to be true. Professional, fast and ridiculously
              talented;
              the 3D AR Filter component they have developed for our React Native app is super smooth and responsive.
            </Text>
          </Review>
        </CarouselItem>
        <CarouselItem index={2}>
          <Review by='Charles R. Cheltenham'>
            <Text span>
              We would like to extend our appreciation and thank you for the detail and care that you put into your
              work,
              the casket that was provided for our father was elegant and beatiful. We appreciate very much your
              kindness
              and generosity during these difficult times.
            </Text>
          </Review>
        </CarouselItem>
        <CarouselItem index={3}>
          <Review by='Jason P. Heidelberg, Victoria'>
            <Text span>
              Thank you Steve, not just for arranging the coffin but for all the advice and help over the phone. Made a
              difficult task much easier than expected. Best wishes, Carron PS.
            </Text>
          </Review>
        </CarouselItem>
        <CarouselItem index={4}>
          <Review by='Sylvia Wearing'>
            <Text span>
              I ordered a coffin for my mother-in-law and feeling a bit anxious, rang early the next morning to check if
              it was ok, to find Steven had already been in touch with the undertaker to check on delivery arrangements.
              I
              was very impressed with the service and would recommend this company to anyone.
            </Text>
          </Review>
        </CarouselItem>
        <CarouselItem index={5}>
          <Review by='Peter'>
            <Text span>
              Dear Steven, I am delighted with the help you have given at this unusual time. The coffin is beautiful and
              both my sister and niece agree. Everything you promised happened, and all those things made this time
              easier. Thank you. Kind regards,
            </Text>
          </Review>
        </CarouselItem>
        <CarouselItem index={6}>
          <Review by='Sarah Carroll'>
            <Text span>
              I found the website through Google and was very glad I did. More people should be aware that you can
              actually buy your own coffin rather than just accepting those on offer from the funeral director.
            </Text>
          </Review>
        </CarouselItem>
        <CarouselItem index={7}>
          <Review by='Margaret Graham'>
            <Text span>
              Dear Steven, Hope you are very well. Just writing to let you know that the funeral went very well and
              everyone was extremely pleased and happy with the coffin you chose. Thanks again for your kindness,
              thoughtfulness and advise. Best wishes
            </Text>
          </Review>
        </CarouselItem>
      </Carousel>
    </Box>
  );
}

export default Testimonials;
