import React from 'react';
import Carousel from "context/carouselContext";
import CarouselItem from "./CarouselItem";
import Review from "./Review";
import { Text } from "core/components";
import FadeInSection from "components/common/FadeInSection";

const Testimonials: React.FC = () => {
  return (
    <FadeInSection classes='pt-20'>
      <Text h2 classes='text-center'>Testimonials</Text>
      <Carousel className='text-primary-gray py-10 lg:py-20'>
        {
          data.map((item, index) => (
            <CarouselItem index={index} key={index}>
              <Review by={item.author}>
                <Text span>{item.feedback}</Text>
              </Review>
            </CarouselItem>
          ))
        }
      </Carousel>
    </FadeInSection>
  );
}

export default Testimonials;

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
