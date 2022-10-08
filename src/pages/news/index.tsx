import CardNews from 'components/pages/news/CardNews';
import { Text, Grid, Box } from 'core/components';

const NewsPage = () => {
  return (
    <Box classes='pb-28 layout'>
      {/*<Box classes='bg-gray-custom-52a pb-28'>*/}
      <Box classes='my-16 text-center'>
        <Text h1 weight='light' transforms='uppercase' classes='text-3xl laptop:text-5xl tracking-wider'>News</Text>
      </Box>
      <Grid md={2} lg={3} gap={12} classes='max-w-6xl mx-auto gap-x-12 gap-y-20'>
        <CardNews
          imgSrc='/images/news/eco-friendly.webp'
          title='Willow is the eco-friendly choice for a coffin.'
          content='The Somerset Levels provide ideal conditions for this sustainable and renewable crop. Willow is one of the fastest growing plants. During the summer months a willow rod can grow by over 10 feet! A willow cutting takes around 3 years to become established. The willow stump should then provide numerous rods which can be harvested every year for about 60 years.'
        />
        <CardNews
          imgSrc='/images/news/funeral-planners.jpg'
          title='Funeral Planners or Wedding Planners ?'
          content='Custom CoffinThe biggest difference between these two key life events is the timeframe. You potentially have months or years to plan and prepare a wedding, but only a few days or at most weeks, to plan and prepare a funeral. So it makes sense to have a Funeral Director (also referred to as Funeral Planner or Funeral Consultant) on board to assist you and your family when the time comes.'
        />
        <CardNews
          imgSrc='/images/news/flower.png'
          title='Every process is important'
          content='We’re passionate about willow, this is reflected in everything we do, from the tiny tender shoots we plant and nurture, to the final piece of willow we craft into a wicker coffin as a finishing touch. Every detail matters and this ensures we deliver nothing less than an exceptional product.'
        />
        <CardNews
          imgSrc='/images/news/register-a-death.jpg'
          title='Registering a death'
          content='It’s not a process that everyone is familiar with. If you suffer a sudden bereavement or someone close passes away after a lengthy illness, you have to register the death fairly promptly. But where do you go and how do you do it? Don’t worry. The team at Kevin Matthews Funeral Services are here to help. Here’s a simple guide to the steps to follow. If you have any questions, or need more support and advice, please get in touch with us.'
        />
        <CardNews
          imgSrc='/images/news/someone-death.jpg'
          title='When someone dies'
          content='A sudden bereavement can be shocking, and even when a family member or close friend has been ill for a while, it can still be an enormous blow when they finally pass away.'
        />
        <CardNews
          imgSrc='/images/news/death-in-home.jpg'
          title='If death takes place at home'
          content='Whatever the circumstance of your loved one’s death, we will support you at all times during this very difficult period.'
        />
        <CardNews
          imgSrc='/images/news/death-in-hospital.jpg'
          title='If death takes place in hospital'
          content='If your loved one passes away in hospital they will usually stay there until all of the medical formalities have taken place. The hospital will have a bereavement office who will be able to tell you what to do next.'
        />
        <CardNews
          imgSrc='/images/news/astory.png'
          title='A story about craftsmanship'
          content='Our story began more than sixty years ago when Edward Hill jotted his first order onto an old playing card packet. Throughout this time, our family business has been committed to retaining the strongest possible values, today that story remains. Heritage, Innovation and Craftsmanship continue to form the foundation of our never-ending commitment. Today we are the custodians of long-held values, as well as helping to keep the traditional age-old craft of basket weaving alive. Because we are a family business, we believe that we do things differently.'
        />
        <CardNews
          imgSrc='/images/news/Coffin-Casket.png'
          title='What is the difference between a casket and a coffin?'
          content='The casket and coffin both are containers to hold a dead body. The purpose of both coffin and casket is the same for either burial or cremation. A casket and coffin are the same things, but do you know casket and a coffin is a different thing? Yes, you heard it correctly. There are certain differences which differ both from each other. Selecting a casket or coffin is a private decision. Before, guiding you to select the coffin or casket let’s know about them.'
        />
      </Grid>
    </Box>
  )
}

export default NewsPage;
