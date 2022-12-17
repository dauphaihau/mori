import React, { useState } from 'react';
import { Box, Button, Row, Text } from "core/components";

const FreeShip = () => {
  const [show, setShow] = useState(true)
  if (show) {
    return (
      <Box classes='bg-primary-black h-14 laptop:h-12 py-3 pr-4 tablet:px-11 desktop:px-11'>
        <Row
          justify='between'
          gap={4}
          align='center'
        >
          <Text></Text>
          <Text classes='text-white text-sm tablet:text-sm tracking-[1.65px]'>
            Free Shipping For All Domestic Australian Orders Over $200
          </Text>
          <Text
            as='button'
            classes='text-primary-gray hover:text-white text-sm cursor-pointer'
            onClick={() => setShow(false)}
            text='X'
          />
        </Row>
      </Box>
    );
  }
  return null
}

export default FreeShip;