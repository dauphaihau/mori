import { NextImage, Link, Box, Text, Badge, Row } from 'core/components';
import { cn, formatDollarUS, slugify } from "core/helpers";
import { PATH } from "config/const";
import { config } from "config";
import { IProduct } from "types/product";

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
              useLoading
              alt={data?.title}
              src={config.hostStaticSource + data?.images[0]}
              className='w-3/5'
              width={300}
              height={300}
              objectFit='contain'
              layout='intrinsic'
            />
            {/*<NextImage*/}
            {/*  alt={data?.title}*/}
            {/*  src={config.hostStaticSource + data?.images[0]}*/}
            {/*  className='w-3/5'*/}
            {/*  width={300}*/}
            {/*  height={300}*/}
            {/*  objectFit='contain'*/}
            {/*  layout='intrinsic'*/}
            {/*/>*/}
            <Box classes='my-div'></Box>
          </Box>
        </Box>
      </Link>
      <Box>
        <Text
          // transforms='uppercase'
          data-testid={data?.name}
          classes='m-4 text-center text-sm laptop:text-lg mb-1'
        >{data?.name}</Text>
        <Row
          gap={4}
          justify='center'
        >
          <Text
            classes={cn(' text-sm laptop:text-lg text-center text-primary-gray mb-4',
              data.salePrice && 'line-through',
            )}
          >
            {formatDollarUS(data?.price)}
          </Text>

          <Text
            hideIf={!data.salePrice}
            classes='text-sm laptop:text-lg text-center text-primary-black mb-4'
          >
            {formatDollarUS(data.salePrice)}
          </Text>
        </Row>
      </Box>
    </Box>
  );

}

export default Product
