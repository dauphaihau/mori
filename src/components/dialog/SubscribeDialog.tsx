import { useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

import { NextImage, Input, Button, Text, Dialog, Box, Col, Grid } from 'core/components';
import bg from '/public/images/newsletter-bg.png';

const SubscribeDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') {
      setTimeout(() => setIsOpen(true), 5000)
    }
  }, [])

  return (
    <Dialog
      isOpen={isOpen}
      closeDialog={async () => setIsOpen(false)}
      // width={700} height={365}
      classes='w-[700px] h-[365px] hidden ipad:block'
      style={{
        backgroundImage: `url(${bg.src})`,
      }}
    >
      <Dialog.Content>
        <Box classes='relative'>
          <XIcon
            className='btn-icon hover:bg-white absolute top-[-30.7px] right-[-26.5px]'
            onClick={() => setIsOpen(false)}
          />
          <Grid
            sx={2}
            gapx={8}
          >
            <NextImage
              width='19rem'
              height='19rem'
              imgClassName='h-[19rem] w-full rounded-lg'
              src='/images/noah.jpg'
              alt='subscribe'
            />
            <Col
              classes='text-center'
              self='center'
            >
              <Text
                h1
                weight='bold'
                sx='lg'
                classes='mx-auto text-[22px]'
              >Subscribe Newsletter</Text>
              <Text
                sx='sm'
                weight='light'
                classes='my-3'
              >Subscribe the Drop store to get in touch and get the future update. </Text>
              <Input
                name='email'
                type='email'
                placeholder='Email Address'
              />
              <Button
                type='submit'
                width='full'
                size='lg'
                text='Subscribe'
              />
            </Col>
          </Grid>
        </Box>
      </Dialog.Content>
    </Dialog>
  );
}

export default SubscribeDialog;
