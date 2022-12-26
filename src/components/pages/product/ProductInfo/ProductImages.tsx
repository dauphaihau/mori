import React, { useCallback, useEffect, useState } from 'react';
import { NextImage, Box, Row } from 'core/components';
import useEmblaCarousel from 'embla-carousel-react';
import { config } from "../../../../config";
import ZoomImageDialog from 'components/dialog/ZoomImageDialog';

const SLIDE_COUNT = 5;
const slides = Array.from(Array(SLIDE_COUNT).keys());

export const DotButton = ({ selected, onClick }) => (
  <button
    className={`embla__dot ${selected ? "is-selected" : ""}`}
    type="button"
    onClick={onClick}
  />
);

const ProductImages = ({ product }) => {

  const { images, name } = product;

  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [main, setMain] = useState<string>(images[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [zoomImage, setZoomImage] = useState(false)

  useEffect(() => {
    setMain(images[0])
  }, [images])

  const scrollTo = useCallback((index) => embla && embla.scrollTo(index), [
    embla
  ]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    // setPrevBtnEnabled(embla.canScrollPrev());
    // setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  console.log('dauphaihau debug: images', images)
  console.log('dauphaihau debug: images-includes-main-', images.includes(main))

  return (
    <Box>
      <ZoomImageDialog
        images={images}
        setShowAddressDialog={setZoomImage}
        showAddressDialog={zoomImage}
      />
      <NextImage
        // onClick={() => setZoomImage(true)}
        useSkeleton
        src={config.hostStaticSource + main}
        alt={name}
        width={300}
        height={300}
        objectFit='contain'
        // className='mx-auto'
        // className='tablet:w-[500px] tablet:h-[500px] mx-auto'
        className='w-[300px] h-[300px] laptop:w-[400px] laptop:h-[400px] mx-auto mb-8 cursor-zoom-in
        {/*hover:scale-125 transition-all duration-500*/}
        '
      />
      {
        images.length > 1 && (
          <Row gap={4}>
            {
              images.map((srcImage, index) => {
                return (
                  <Box
                    key={index}
                    onClick={() => setMain(images[index])}
                    classes={['h-20 laptop:h-20 flex-center rounded-lg bg-product cursor-pointer',
                      { 'border border-black': srcImage === main }
                    ]}
                  >
                    <Box classes='flex flex-column justify-center items-center '>
                      <NextImage
                        alt={name}
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

                  // <NextImage
                  //   key={index}
                  //   src={o}
                  //   alt='product'
                  //   width={150}
                  //   height={150}
                  //   objectFit='contain'
                  //   onMouseMove={() => setMain(images[index])}
                  //   // className='mx-auto'
                  //   // className='tablet:w-[500px] tablet:h-[500px] mx-auto'
                  //   className=''
                  // />

                  //   <img
                  //     src={image.url}
                  //     alt={image.filename}
                  //     onMouseMove={() => setMain(images[index])}
                  //     className={`${image.url === main.url ? "active" : null}`}
                  //   />
                );
              })
            }
          </Row>
        )
      }
      {/*<div ref={emblaRef} className="embla__viewport">*/}
      {/*  <div className="embla__container">*/}
      {/*    {React.Children.map(children, (Child, index) => (*/}
      {/*      <div className="embla__slide" key={index}>*/}
      {/*        <div className="embla__slide__inner">{Child}</div>*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>

    </Box>
  );
}

export default ProductImages;
