import { useEffect } from 'react';
import { NextImage, Text, Link, Box, Row, Col, Badge } from 'core/components';
import { clns, sliceText, slugify } from 'core/helpers';
import { useHover } from 'core/hooks';
import Enums from "config/enums";

const hoverEffect = typeof window !== `undefined` ? require('hover-effect').default : null;

const ProductCard = ({ data }) => {
  const { name, price, salePrice, description, images } = data;

  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

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
      <Box>
        <Text classes='title'>{name.slice(0, 23)}</Text>
        <Text classes='describe'>
          {sliceText(description, 25)}
        </Text>
      </Box>

      <Box classes='text-right desktop:hidden'>
        {
          salePrice ?
            <Row classes='desktop:flex-col'>
              <Text classes='text-xl tracking-wide'>
                ${salePrice}
              </Text>
              <Text classes='ml-[10px] line-through font-light text-gray-700 text-sm tablet:text-base'>
                ${price}
              </Text>
            </Row>
            :
            <Row>
              <Text classes='text-xl font-bold tracking-wide'>
                ${price}
              </Text>
            </Row>
        }
      </Box>

      <Box classes={clns('text-right hidden desktop:flex', !salePrice && 'items-center')}>
        {
          salePrice ?
            <Box classes=''>
              <Text classes='ml-[10px] line-through font-light text-gray-700 text-sm tablet:text-base'>
                ${price}
              </Text>
              <Text classes='text-xl  tracking-wide'>
                ${salePrice}
              </Text>
            </Box>
            :
            <Text classes='text-xl font-bold tracking-wide'>
              ${price}
            </Text>
        }
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
              classes={clns('product-card__images',
                'w-[10rem] h-[8.3rem] desktop:w-[12.1rem] desktop:h-[11rem]'
              )}
            >
              <img
                className='img-effect object-contain'
                src={images[0]}
                // alt={name}
              />
              <img
                className='img-effect object-contain'
                src={images[1]}
                alt={name}
              />
            </Box>
          </Col>
        </Box>

        <NextImage
          src={images[0]}
          alt={name}
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
      <Link classes='' href={`${Enums.PATH.PRODUCT._}/${slugify(data?.name)}`}>
        <Col classes='h-full relative' justify='between'>
          <Badge hideIf={!salePrice} classes='absolute z-10'>
            {(((price - salePrice) / price) * 100).toFixed()}%
          </Badge>
          <Images/>
          <Content/>
        </Col>
      </Link>
    </Box>
  )
}

export default ProductCard;
