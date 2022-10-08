import { Button, Box, Col, Input, Text, Row } from "core/components";
import { FC } from "react";

const Contact: FC = () => {
  return (
    <Col
      align='center'
      justify='between'
      classes='layout laptop:flex-row gap-x-4 py-8 mt-12 text-center laptop:text-left bg-gray-custom-50 tablet:p-16 rounded-lg'
    >
      <Col
        classes='w-full  gap-x-4 '
        justify='center'
      >
        {/*<Col classes='w-full tablet:flex-row gap-x-4 laptop:w-1/2' justify='end'>*/}
        {/*<Col classes='px-6 tablet:pl-24 w-full tablet:flex-row gap-x-4 laptop:w-1/2'>*/}

        <Box classes='mb-6 text-center'>
          <Text
            h1
            classes='text-lg tablet:text-2xl laptop:text-3xl font-black mb-4'
          >
            {/*Get Expert Tips In Your Inbox*/}
            Contact us at any time for funeral assistance
          </Text>
          <Text weight='light' classes='text-sx tablet:text-[0.85rem] laptop:text-base mb-4'>
            We will work with you to design and arrange the exact type of funeral that you and your family feel is right
            for the person who has died.
          </Text>
          <Text classes='text-sx tablet:text-[0.85rem] laptop:text-base font-light '>
            Our aim is to work with you to make it special, and then make it all happen smoothly.
          </Text>
        </Box>


        <Row
          classes='w-full gap-x-4'
          justify='center'
        >
          <input
            className='
            pl-4 laptop:w-1/5
            border border-gray-300 text-gray-900 text-sm rounded-lg
            hover:border-black
            focus:ring-black focus:border focus:border-black focus:outline-none
            appearance-none
            text-xs lg:text-sm rounded-md
            border-gray-300 h-[42px] placeholder-gray-500
            bg-white animate
          '
            placeholder='Write your email here'
          />
          {/*<Input*/}
          {/*  type='read-only'*/}
          {/*  name='subscribe'*/}
          {/*  classes='!p-4 !w-fit !h-[55px] !bg-white '*/}
          {/*  // classes='!p-4 w-full !h-[55px] !bg-white '*/}
          {/*  placeholder='Write your email here'*/}
          {/*  defaultValue=''*/}
          {/*/>*/}
          <Button text='Contact us'/>
        </Row>
      </Col>
    </Col>
  );
}

export default Contact;
