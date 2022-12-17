import { NextImage, Text, Link, Box, Row, Col, Badge, Skeleton } from 'core/components';
import { cn, formatDollarUS, sliceText, slugify } from 'core/helpers';
import { useHover } from 'core/hooks';
import { PATH } from "config/const";
import { config } from "config";
import React from "react";

const hoverEffect = typeof window !== `undefined` ? require('hover-effect').default : null;

const ProductFlashSaleCard = ({ data }) => {
  if (!data) return <Skeleton height={353} width={269} classes='bg-product'/>
  // const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const { name, price, salePrice, description, link, images } = data;

  // useEffect(() => {
  //   Array.from(document.querySelectorAll('.product-card__images')).forEach(
  //     (el: any) => {
  //       const imgs: any = Array.from(el.querySelectorAll('img'));
  //       if (imgs[0] && imgs[1]) {
  //         new hoverEffect({
  //           parent: el,
  //           intensity: 0.2,
  //           speedIn: el.dataset.speedin || undefined,
  //           speedOut: el.dataset.speedout || undefined,
  //           easing: el.dataset.easing || undefined,
  //           hover: el.dataset.hover || undefined,
  //           image1: imgs[0].getAttribute('src') || undefined,
  //           image2: imgs[1].getAttribute('src') || undefined,
  //           displacementImage: el.dataset.displacement,
  //         });
  //       }
  //     }
  //   );
  // }, []);

  const Content = () => (
    <Box classes='product-card__content'>
      <Col>
        <Text h4 classes='title'>{name.slice(0, 23)}</Text>
        <Text classes='describe'>{sliceText(description, 25)}</Text>
      </Col>

      <Box classes='text-right desktop:hidden'>
        <Row classes='desktop:flex-col'>
          <Text classes='text-xl tracking-wide text-primary-red'>
            {formatDollarUS(salePrice)}
          </Text>
          <Text classes='ml-2.5 line-through font-light text-primary-gray tablet:text-base'>
            {formatDollarUS(price)}
          </Text>
        </Row>
      </Box>

      <Box classes={cn('text-right hidden desktop:flex', !data?.salePrice && 'items-center')}>
        <Col>
          <Text classes='ml-[10px] line-through font-light text-gray-700 text-sm tablet:text-base'>
            {formatDollarUS(data?.price)}
          </Text>
          <Text classes='text-xl tracking-wide text-primary-red'>
            {formatDollarUS(salePrice)}
          </Text>
        </Col>
      </Box>

    </Box>
  )

  const Images = () => {
    return (
      <>
        {/*<Box classes=''>*/}
        <Box classes='hidden'>
          <Col
            align='center'
            justify='center'
            classes='h-[14rem] desktop:h-[16rem]'
          >
            <Box
              data-displacement='/images/hover-effect/distortion.jpeg'
              classes={cn('product-card__images',
                'w-[10rem] h-[8.3rem] desktop:w-[12.1rem] desktop:h-[11rem]'
              )}
            >
              <img
                className='img-effect object-contain'
                // src={data?.images[0]}
                src={config.hostStaticSource + data?.images[0]}
                // alt={data?.name}
              />
              <img
                className='img-effect object-contain'
                // src={data?.images[1]}
                src={config.hostStaticSource + data?.images[1]}
                alt={data?.name}
              />
            </Box>
          </Col>
        </Box>

        <NextImage
          src={config.hostStaticSource + data?.images[0]}
          // src={data?.images[0]}
          alt={data?.name}
          useSkeleton
          className='w-auto'
          // className='laptop:hidden w-auto'
          width={300}
          height={300}
          objectFit='contain'
        />
      </>
    )
  }

  return (
    <Box classes='product-card'>
      <Link href={`${PATH.PRODUCT._}/${slugify(data?.name)}`}>
        <Col
          classes='h-full relative'
          justify='between'
        >
          <Badge
            hideIf={!data?.salePrice}
            classes='absolute z-10'
          >
            {(((data?.price - data?.salePrice) / data?.price) * 100).toFixed()}%
          </Badge>
          <Images/>
          <Content/>
        </Col>
      </Link>
    </Box>
  )
}

export default ProductFlashSaleCard;
