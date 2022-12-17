import React, { useEffect, useState } from 'react';
import { Box, Button, Link, Row, Text } from 'core/components';

const AcceptCookie = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 1000000)
  }, [])

  if (show) {
    return (
      <Box classes='hidden laptop:block fixed bottom-0 left-0 z-30 bg-primary-gray py-3 px-2 w-full'>
        <Row gap={4} align='center' classes='flex-wrap  justify-start laptop:justify-center'>
          <Text classes='text-white text-[14px] tracking-normal' weight=''>
            We use cookies (and other similar technologies) to collect data to improve your shopping experience. By
            using our website, you&apos;re agreeing to the collection of data as described in our
            <Link openNewTab underline href='components/layout/RootLayout/AcceptCookie#' classes='ml-1 text-white'>
              Privacy Policy.
            </Link>
          </Text>
          <Row gap={3} align='center'>
            <Button size='sm' light classes='border-white border !text-white'>
              Settings
            </Button>
            <Button size='sm' variant='gray' onClick={() => setShow(false)}>
              Reject all
            </Button>
            <Button size='sm' variant='gray' onClick={() => setShow(false)}>
              Accept all cookies
            </Button>
          </Row>
        </Row>
      </Box>
    );
  }
  return null
}

export default AcceptCookie;
