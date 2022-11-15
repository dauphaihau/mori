import React, { useEffect } from 'react';
import { Text, Link, Box, Row, Col, NextImage, Badge } from 'core/components';
import { clns, sliceText, slugify } from 'core/helpers';
import Enums from "config/enums";
import { Loading } from "../../../../core/components/Loading";
import { BlurringImage } from "../../../../core/components/Next/BlurringImage";

const hoverEffect = typeof window !== `undefined` ? require('hover-effect').default : null;

const BigProductCard = ({ data }) => {
  const {  name, price, salePrice, description, link , images } = data;

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

  // const Badge = () => {
  //   if (!salePrice) return <Box classes='h-5'/>
  //   return <Box>
  //     <Text
  //       weight='bold'
  //       span
  //       classes='product-card__badge'
  //     >
  //       {(((price - salePrice) / price) * 100).toFixed()}%
  //     </Text>
  //   </Box>
  // }

  const Content = () => (
    <Box classes='product-card__content'>
      <Box>
        <Text classes='title'>{name.slice(0, 23)}</Text>
        <Text classes='describe'>
          {sliceText(description, 40)}
        </Text>
      </Box>

      <Box classes='text-right desktop:hidden'>
        {salePrice ?
          <Row classes='desktop:flex-col'>
            <Text classes='text-xl tracking-wide'>
              ${salePrice}
            </Text>
            <Text classes='ml-[10px] line-through text-gray-700 text-sm tablet:text-base'>
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
        {salePrice ?
          <Box classes=''>
            <Text classes='ml-3 line-through font-light text-gray-700 text-sm tablet:text-base'>
              ${price}
            </Text>
            <Text classes='text-xl tracking-wide'>
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
        <Col
          align='center'
          justify='center'
        >
          <Box
            data-displacement='/images/hover-effect/distortion.jpeg'
            classes={clns('product-card__images',
              'w-[25rem] h-[22rem] desktop:w-[25rem] desktop:h-[23rem]',
              'hidden'
            )}
          >
            <img
              className='img-effect'
              src={images[0]}
              alt={name}
            />
            <img
              className='img-effect'
              src={images[1]}
              alt={name}
            />
          </Box>
        </Col>


        {/*<Loading/>*/}

        {/*<BlurringImage*/}
        {/*  src={images[0]}*/}
        {/*  alt={name}*/}
        {/*  className='w-auto'*/}
        {/*  // className='laptop:hidden w-auto'*/}
        {/*  width={200}*/}
        {/*  // elaceholder='blur'*/}
        {/*  // blurDataURL='/images/loading.gif'*/}
        {/*  height={200}*/}
        {/*  objectFit='contain'*/}
        {/*/>*/}

        <NextImage
          // src='https://res.cloudinary.com/duiehrbms/image/upload/v1667916502/cld-sample-4.jpg'
          src={images[0]}
          alt={name}
          className='w-auto'
          // className='laptop:hidden w-auto'
          width={200}
          // placeholder='blur'
          // blurDataURL='/images/loading.gif'
          useSkeleton
          height={200}
          objectFit='contain'
        />
      </>
    )
  }

  return (
    <Box classes='product-card'>
      <Link href={`${Enums.PATH.PRODUCT._}/${slugify(data?.name)}`}>
        <Col
          classes='h-full relative'
          justify='between'
        >
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

export default BigProductCard;
