import { NextImage, Link, Box, Text, Badge, Row } from 'core/components';
import { cn, formatDollarUS, slugify } from "core/helpers";
import { PATH } from "config/const";
import { config } from "config";
import { IProduct } from "types/product";
import React from "react";

type ProductProps = {
  data: IProduct
  dataFade?: string
}

const Product = ({ data, dataFade }: ProductProps) => {
  if (!data) return null

  return (
    <Box
      classes='w-100 product'
      data-fade={dataFade}
    >
      <Link href={`${PATH.PRODUCT._}/${slugify(data?.name)}`}>
        <Box classes='h-[11rem] laptop:h-72 flex-center rounded-lg bg-product relative'>
          <Badge
            hideIf={!data.salePrice}
            classes='absolute z-10 top-5 left-5'
          >
            {(((data.price - data.salePrice) / data.price) * 100).toFixed()}%
          </Badge>
          <Badge
            hideIf={data.quantity > 0}
            classes='absolute z-10 top-5 left-5'
          >
            Sold out
          </Badge>
          <Box classes='flex-center flex-column'>
            <NextImage
              useSkeleton
              alt={data?.title}
              src={config.hostStaticSource + data?.images[0]}
              className='w-3/5'
              width={300}
              height={300}
              objectFit='contain'
              layout='intrinsic'
            />
            <Box classes='my-div'></Box>
          </Box>
        </Box>
      </Link>

      <Box>
        <Text
          data-testid={data?.name}
          classes='my-3 text-sm laptop:text-lg mb-1'
        >{data?.name}</Text>

        <Row gap={4}>
          <Text
            hideIf={!data.salePrice}
            classes={cn('text-sm laptop:text-lg text-center mb-4',
              data.salePrice ? 'text-primary-red' : 'text-primary-black'
            )}
          >
            {formatDollarUS(data.salePrice)}
          </Text>
          <Text
            classes={cn(' text-sm laptop:text-lg text-center text-primary-gray mb-4',
              data.salePrice && 'line-through',
            )}
          >
            {formatDollarUS(data?.price)}
          </Text>
        </Row>
      </Box>
    </Box>
  );
}

export default Product
