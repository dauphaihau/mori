import CardNews from 'components/pages/news/CardNews';
import { Text, Grid, Box } from 'core/components';
import { getPlaiceholder } from "plaiceholder";
import { extractImgSrc } from "@plaiceholder/tailwindcss/utils";

// import { imageList, imageListItem } from "@plaiceholder/ui";

// const getImagesFromPlaiceholders = (classNames) =>
//   Promise.all(
// // const getImagesFromPlaiceholders = (...classNames) =>
//     classNames.map(async (className) => {
//       const { img } = await getPlaiceholder(extractImgSrc(className));
//
//       return { className, ...img };
//     })
//   );

// export const getStaticProps = async () => {
//   const result = data.map((item) => `plaiceholder-[${item.srcUrl}]`)
//   const images = await getImagesFromPlaiceholders(
//     result
//     // "plaiceholder-[/assets/images/unsplash/alexander-ant-oR7HxvOe2YE.jpg]",
//     // "plaiceholder-[/assets/images/unsplash/alexander-ant-r7xdS9hjYYE.jpg]",
//     // "plaiceholder-[/assets/images/unsplash/solen-feyissa-0KXl7T2YU0I.jpg]",
//     // "plaiceholder-[/assets/images/unsplash/solen-feyissa-ju3ZBdiXzmA.jpg]",
//     // "plaiceholder-[/assets/images/unsplash/solen-feyissa-tek55norwaQ.jpg]",
//     // "plaiceholder-[/assets/images/unsplash/solen-feyissa-WX1siNmyR4.jpg]"
//   );
//
//   return {
//     props: {
//       images,
//       title: 'Tailwind',
//       heading: 'Multiple',
//     },
//   };
// };

const NewsPage = ({ images, products }) => {
  return (
    <Box classes='pb-28 layout'>
      {/*<Box classes='bg-gray-custom-52a pb-28'>*/}
      <Box classes='my-16 text-center'>
        <Text
          h1
          weight='light'
          transforms='uppercase'
          classes='text-3xl laptop:text-5xl tracking-wider'
        >News</Text>
      </Box>
      <Grid
        md={2}
        lg={3}
        gap={12}
        classes='max-w-6xl mx-auto gap-x-12 gap-y-20'
      >
        {data.map((item, index) => (
          <CardNews
            key={index}
            data={item}
          />
        ))}
      </Grid>
    </Box>
  )
}

export default NewsPage;

const data = [
  {
    title: 'Willow is the eco-friendly choice for a coffin.',
    srcUrl: '/images/news/eco-friendly.png',
    content: 'The Somerset Levels provide ideal conditions for this sustainable and renewable crop. Willow is one of the fastest growing plants. During the summer months a willow rod can grow by over 10 feet! A willow cutting takes around 3 years to become established. The willow stump should then provide numerous rods which can be harvested every year for about 60 years.'
  },
  {
    title: 'Funeral Planners or Wedding Planners ?',
    srcUrl: '/images/news/funeral-planners.jpg',
    content: 'Custom CoffinThe biggest difference between these two key life events is the timeframe. You potentially have months or years to plan and prepare a wedding, but only a few days or at most weeks, to plan and prepare a funeral. So it makes sense to have a Funeral Director (also referred to as Funeral Planner or Funeral Consultant) on board to assist you and your family when the time comes.'
  },
  {
    title: 'Every process is important',
    srcUrl: '/images/news/flower.png',
    content: 'We’re passionate about willow, this is reflected in everything we do, from the tiny tender shoots we plant and nurture, to the final piece of willow we craft into a wicker coffin as a finishing touch. Every detail matters and this ensures we deliver nothing less than an exceptional product.'
  },
  {
    title: 'Registering a death',
    srcUrl: '/images/news/register-a-death.jpg',
    content: 'It’s not a process that everyone is familiar with. If you suffer a sudden bereavement or someone close passes away after a lengthy illness, you have to register the death fairly promptly. But where do you go and how do you do it? Don’t worry. The team at Kevin Matthews Funeral Services are here to help. Here’s a simple guide to the steps to follow. If you have any questions, or need more support and advice, please get in touch with us.'
  },
  {
    title: 'When someone dies',
    srcUrl: '/images/news/someone-death.jpg',
    content: 'A sudden bereavement can be shocking, and even when a family member or close friend has been ill for a while, it can still be an enormous blow when they finally pass away.'
  },
  {
    title: 'If death takes place at home',
    srcUrl: '/images/news/death-in-home.jpg',
    content: 'Whatever the circumstance of your loved one’s death, we will support you at all times during this very difficult period.'
  },
  {
    title: 'If death takes place in hospital',
    srcUrl: '/images/news/death-in-hospital.jpg',
    content: 'If your loved one passes away in hospital they will usually stay there until all of the medical formalities have taken place. The hospital will have a bereavement office who will be able to tell you what to do next.'
  },
  {
    title: 'A story about craftsmanship',
    srcUrl: '/images/news/astory.png',
    content: 'Our story began more than sixty years ago when Edward Hill jotted his first order onto an old playing card packet. Throughout this time, our family business has been committed to retaining the strongest possible values, today that story remains. Heritage, Innovation and Craftsmanship continue to form the foundation of our never-ending commitment. Today we are the custodians of long-held values, as well as helping to keep the traditional age-old craft of basket weaving alive. Because we are a family business, we believe that we do things differently.'
  },
  {
    title: 'What is the difference between a casket and a coffin?',
    srcUrl: '/images/news/Coffin-Casket.png',
    content: 'The casket and coffin both are containers to hold a dead body. The purpose of both coffin and casket is the same for either burial or cremation. A casket and coffin are the same things, but do you know casket and a coffin is a different thing? Yes, you heard it correctly. There are certain differences which differ both from each other. Selecting a casket or coffin is a private decision. Before, guiding you to select the coffin or casket let’s know about them.'
  },
]
