import { Button, Box, Col, Text } from "core/components";
import { FC } from "react";
import { useFadeIn } from "core/hooks";
import { clns } from "core/helpers";

const Contact: FC = () => {
  const [ref, isVisible] = useFadeIn()
  return (
    <Box
      ref={ref}
      section
      classes={clns('layout py-8 px-4 mt-12 text-center laptop:text-left bg-gray-custom-50 tablet:p-16 rounded-lg',
        'flex flex-col laptop:flex-row gap-x-4 justify-between items-center',
        'fade-in-section',
        isVisible ? 'is-visible' : '',
      )}
    >
        <Col
          classes='w-full  gap-x-4 '
          justify='center'
        >
          <Box classes='mb-6 text-center'>
            <Text
              h3
              classes=' font-black mb-4'
            >
              Contact us at any time for funeral assistance
            </Text>
            <Text
              weight='light'
              classes='text-sx tablet:text-[0.85rem] laptop:text-base mb-4'
            >
              We will work with you to design and arrange the exact type of funeral that you and your family feel is
              right
              for the person who has died.
            </Text>
            <Text classes='text-sx tablet:text-[0.85rem] laptop:text-base font-light '>
              Our aim is to work with you to make it special, and then make it all happen smoothly.
            </Text>
          </Box>

          <Box classes='w-full flex flex-col tablet:flex-row justify-center gap-4'>
            <input
              className='
            pl-4 tablet:w-2/5 laptop:w-1/5
            border border-gray-300 text-gray-900 text-sm rounded-lg
            text-center tablet:text-left
            hover:border-black
            focus:ring-black focus:border focus:border-black focus:outline-none
            appearance-none
            text-xs lg:text-sm rounded-md
            border-gray-300 h-[42px] placeholder-gray-500
            bg-white animate
          '
              placeholder='Write your email here'
            />
            <Button text='Contact us'/>
          </Box>
        </Col>
    </Box>
  );
}

export default Contact;
