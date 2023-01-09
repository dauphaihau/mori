import React, { useState } from 'react';
import { Box, Row, Text } from "core/components";

export default function FreeShip() {
  const [show, setShow] = useState<boolean>(true)
  if (!show) return null
  return (
    <Box classes='relative z-30 bg-primary-black py-3'>
      <Row
        justify='between'
        classes='layout'
        gap={4}
        align='center'
      >
        <Text></Text>
        <Text classes='text-white text-xs tablet:text-sm tracking-[1.65px]'>
          Free Shipping For All Domestic Australian Orders Over $200
        </Text>
        <Text
          as='button'
          classes='text-primary-gray hover:text-white text-sm cursor-pointer mr-3'
          onClick={() => setShow(false)}
          text='X'
        />
      </Row>
    </Box>
  );
}
