import { useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

import { NextImage, Input, Button, Text, Dialog, Box, Col, Grid } from 'core/components';
import { PATH } from "config/const";
import { cn } from "core/helpers";

export default function SubscribeDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === PATH.HOME) {
      const timeout = setTimeout(() => setIsOpen(true), 8000)
      return () => clearTimeout(timeout)
    }
  }, [])

  return (
    <Dialog
      isOpen={isOpen}
      closeDialog={async () => setIsOpen(false)}
      classes={cn('w-[700px] h-[365px] hidden tablet:block',
        "bg-[url('/images/newsletter-bg.png')]"
      )}
    >
      <Dialog.Content hideXIcon>
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
                classes='mx-auto text-[22px]'
              >Subscribe Newsletter</Text>
              <Text
                weight='light'
                classes='my-3'
              >Subscribe the Drop store to get in touch and get the future update. </Text>
              <Input
                onChange={() => {}}
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
