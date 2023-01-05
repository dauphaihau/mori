import React, { useEffect, useState } from 'react';

import { NextImage, Box, Row } from 'core/components';
import { config } from "config";
import { useProductContext } from "components/context/ProductContext";

export default function ProductImages() {
  const { product } = useProductContext()
  const images = product?.images ?? []
  const [mainImage, setMainImage] = useState<string>(images[0]);

  useEffect(() => {
    setMainImage(images[0])
  }, [images])

  return (
    <Box>
      <NextImage
        useSkeleton
        src={config.hostStaticSource + mainImage}
        alt={product?.name}
        width={300}
        height={300}
        objectFit='contain'
        className='w-72 h-72 laptop:w-104 laptop:h-104 mx-auto mb-8 cursor-zoom-in'
      />
      {
        images.length > 1 && (
          <Row gap={4}>
            {
              images.map((srcImage, index) => {
                return (
                  <Box
                    key={index}
                    onClick={() => setMainImage(images[index])}
                    classes={['h-20 laptop:h-20 flex-center rounded-lg bg-product cursor-pointer',
                      { 'border border-black': srcImage === mainImage }
                    ]}
                  >
                    <Box classes='flex flex-column justify-center items-center '>
                      <NextImage
                        alt={product?.name}
                        src={config.hostStaticSource + srcImage}
                        className='w-3/5'
                        width={90}
                        height={90}
                        objectFit='contain'
                        layout='intrinsic'
                      />
                      <Box classes='my-div'></Box>
                    </Box>
                  </Box>
                );
              })
            }
          </Row>
        )
      }
    </Box>
  );
}
