import { useEffect } from 'react';
import { Box, Col, Row, Link, Text } from 'core/components';
import { formatDollarUS } from 'core/helpers';
import { IProduct } from 'types/product';

const hoverEffect =
  typeof window !== `undefined` ? require("hover-effect").default : null;

// interface ProductProps {
//   link: string,
//   title: string,
//   imageSrc: string,
//   imageHover: string,
//   price: number,
// }

const ProductCard = (props: IProduct) => {
  const { link, title, imageSrc, price, imageHover } = props;

  useEffect(() => {
    Array.from(document.querySelectorAll(".project-card__middle")).forEach(
      (el: any) => {
        const imgs: any = Array.from(el.querySelectorAll("img"));
        new hoverEffect({
          parent: el,
          intensity: 0.2,
          speedIn: el.dataset.speedin || undefined,
          speedOut: el.dataset.speedout || undefined,
          easing: el.dataset.easing || undefined,
          hover: el.dataset.hover || undefined,
          image1: imgs[0].getAttribute("src"),
          image2: imgs[1].getAttribute("src"),
          displacementImage: el.dataset.displacement,
        });
      }
    );
  }, []);

  return (
    <Box classes='w-100'>
      <Link href={link}>
        <Row
          justify='center'
          align='center'
          classes='h-[11rem] laptop:h-72 rounded-lg bg-light hover:bg-light-200'
        >
          <Col
            justify='center'
            align='center'
          >
            {
              imageHover ?
                <Box
                  classes='project-card__middle'
                  data-displacement="webp/myDistorsionImage.webp"
                  // data-displacement='/images/hover-effect/distortion.jpeg'
                >
                  <img
                    src={imageHover}
                    alt='alexxandria model'
                  />
                  <img
                    src={imageSrc}
                    alt='alexxandria logo'
                  />
                </Box>
                // <img
                //   ref={container}
                //   alt={title} src={imageSrc} className='w-3/5'
                //   onMouseOver={event => event.currentTarget.src = imageHover}
                //   onMouseOut={event => event.currentTarget.src = imageSrc}
                // />
                : <img
                  alt={title}
                  src={imageSrc}
                  className='w-3/5'
                />
            }

            {/*<img alt={title} src={imageSrc} className='w-3/5'/>*/}
            <Box classes='my-div'></Box>
          </Col>
        </Row>
      </Link>
      <Box>
        <Text classes='m-4 text-center text-sm laptop:text-base font-semibold mb-1'>{title}</Text>
        <Text classes='text-sm laptop:text-lg text-center text-gray-700 mb-4'>{formatDollarUS(price)}</Text>
      </Box>
    </Box>
  )
}

export default ProductCard
