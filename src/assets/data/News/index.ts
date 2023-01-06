import { config } from "config";

export interface INewsList {
  title: string
  content: string
  srcImg: string
}

export const newsData: INewsList[] = [
  {
    title: 'Willow is the eco-friendly choice for a coffin.',
    srcImg: `${config.hostStaticSource}/news/eco-friendly_ahcucn.png`,
    content: 'The Somerset Levels provide ideal conditions for this sustainable and renewable crop. Willow is one of the fastest growing plants. During the summer months a willow rod can grow by over 10 feet! A willow cutting takes around 3 years to become established. The willow stump should then provide numerous rods which can be harvested every year for about 60 years.'
  },
  {
    title: 'Funeral Planners or Wedding Planners ?',
    srcImg: `${config.hostStaticSource}/news/funeral-planners_y3wder.jpg`,
    content: 'Custom CoffinThe biggest difference between these two key life events is the timeframe. You potentially have months or years to plan and prepare a wedding, but only a few days or at most weeks, to plan and prepare a funeral. So it makes sense to have a Funeral Director (also referred to as Funeral Planner or Funeral Consultant) on board to assist you and your family when the time comes.'
  },
  {
    title: 'Every process is important',
    srcImg: `${config.hostStaticSource}/news/flower_nq6fd4.png`,
    content: 'We’re passionate about willow, this is reflected in everything we do, from the tiny tender shoots we plant and nurture, to the final piece of willow we craft into a wicker coffin as a finishing touch. Every detail matters and this ensures we deliver nothing less than an exceptional product.'
  },
  {
    title: 'Registering a death',
    srcImg: `${config.hostStaticSource}/news/register-a-death_rhzr62.jpg`,
    content: 'It’s not a process that everyone is familiar with. If you suffer a sudden bereavement or someone close passes away after a lengthy illness, you have to register the death fairly promptly. But where do you go and how do you do it? Don’t worry. The team at Kevin Matthews Funeral Services are here to help. Here’s a simple guide to the steps to follow. If you have any questions, or need more support and advice, please get in touch with us.'
  },
  {
    title: 'When someone dies',
    srcImg: `${config.hostStaticSource}/news/someone-death_wibgqc.jpg`,
    content: 'A sudden bereavement can be shocking, and even when a family member or close friend has been ill for a while, it can still be an enormous blow when they finally pass away.'
  },
  {
    title: 'If death takes place at home',
    srcImg: `${config.hostStaticSource}/news/death-in-home_w27xou.jpg`,
    content: 'Whatever the circumstance of your loved one’s death, we will support you at all times during this very difficult period.'
  },
  {
    title: 'If death takes place in hospital',
    srcImg: `${config.hostStaticSource}/news/death-in-hospital_olhaei.jpg`,
    content: 'If your loved one passes away in hospital they will usually stay there until all of the medical formalities have taken place. The hospital will have a bereavement office who will be able to tell you what to do next.'
  },
  {
    title: 'A story about craftsmanship',
    srcImg: `${config.hostStaticSource}/news/astory_r2n5zw.png`,
    content: 'Our story began more than sixty years ago when Edward Hill jotted his first order onto an old playing card packet. Throughout this time, our family business has been committed to retaining the strongest possible values, today that story remains. Heritage, Innovation and Craftsmanship continue to form the foundation of our never-ending commitment. Today we are the custodians of long-held values, as well as helping to keep the traditional age-old craft of basket weaving alive. Because we are a family business, we believe that we do things differently.'
  },
  {
    title: 'What is the difference between a casket and a coffin?',
    srcImg: `${config.hostStaticSource}/news/Coffin-Casket_pzj5xg.jpg`,
    content: 'The casket and coffin both are containers to hold a dead body. The purpose of both coffin and casket is the same for either burial or cremation. A casket and coffin are the same things, but do you know casket and a coffin is a different thing? Yes, you heard it correctly. There are certain differences which differ both from each other. Selecting a casket or coffin is a private decision. Before, guiding you to select the coffin or casket let’s know about them.'
  },
]
