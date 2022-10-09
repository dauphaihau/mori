import { Box, Grid, Row, Text } from 'core/components';
import { ProductCard } from '../index';
import CountdownTimer from '../CountdownTimer';
import BigProductCard from './BigProductCard';
import { useEffect, useRef, useState } from "react";
import { dom } from "@typescript-eslint/scope-manager/dist/lib/dom";
import { clns } from 'core/helpers';
import { useFadeIn } from "core/hooks";

const FlashSaleProducts = ({ inventoryData }) => {
  const [ref, isVisible] = useFadeIn()

  return (
    <Box
      ref={ref}
      section
      classes={clns('my-12 mb-24 layout',
        'fade-in-section',
        isVisible ? 'is-visible' : ''
      )}
    >
      <Row justify='between' align='center' classes='mb-4'>
        <Text h2>Flash Sale</Text>
        <CountdownTimer/>
      </Row>
      <Grid sx={1} lg={2} gap={8} classes=''>
        <Box classes='hidden laptop:block'>
          <BigProductCard data={inventoryData[26]}/>
        </Box>
        <Grid gap={4}>
          <Grid md={2} gap={8}>
            <ProductCard data={inventoryData[12]}/>
            <ProductCard data={inventoryData[25]}/>
          </Grid>
          <Grid md={2} gap={8} classes='mt-4'>
            <ProductCard data={inventoryData[26]}/>
            <ProductCard data={inventoryData[28]}/>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FlashSaleProducts;
