import { NextImage, Text, Box, Col, Grid, Row, Link } from 'core/components';

export default function Intro() {
  return (
    <Grid sx={1} lg={2} classes='mb-24 tablet:layout'>
      <Box>
        <Text h1 classes='my-4'>WHO ARE WE?</Text>
        <Text
          weight='light'
          classes='mb-6 leading-7 pr-26 desktop:pr-32'
        >
          The Mori name has long been synonymous with willow. For decades, the Mori family has grown willow in
          Somerset and produced a wide range of high quality willow products.
        </Text>
        <Text
          weight='light'
          classes='mb-6 leading-7 pr-26 desktop:pr-32'
        >
          Mori Willows provide

          <Link
            href='/'
            underline
            classes='mx-1 '
            openNewTab
          >
            willow,
          </Link>

          <Link
            href='/'
            underline
            classes='mx-1 '
            openNewTab
          >
            specialist weaving tools,
          </Link>
          willow coffins and many other bespoke
          <Link
            href='/'
            underline
            classes='mx-1 '
            openNewTab
          >
            willow products.
          </Link>
        </Text>
      </Box>
      <Box classes='p-8'>
        <Box>
          <Grid md={2} gap={8} classes='tablet:mb-8'>
            <Box classes='mb-6 tablet:mb-0'>
              <Row>
                <NextImage
                  width={45}
                  height={45}
                  className='mr-5'
                  alt='quality'
                  src='/images/about/quality-icon.jpg'
                />
                <Col classes='w-2/3'>
                  <Text weight='bold'>Quality</Text>
                  <Text classes='text-base text-primary-gray'>Handmade by master craftsmen</Text>
                </Col>
              </Row>
            </Box>
            <Box classes='mb-6 tablet:mb-0'>
              <Row>
                <NextImage
                  width={45}
                  height={45}
                  className='mr-5'
                  alt='measure'
                  src='/images/about/measure-icon.png'
                />
                <Col classes='w-2/3'>
                  <Text weight='bold'>Bespoke</Text>
                  <Text classes='text-base text-primary-gray'>Large variety of coffins and bespoke builds</Text>
                </Col>
              </Row>
            </Box>
          </Grid>
          <Grid md={2} gap={8}>
            <Box classes='mb-6 tablet:mb-0'>
              <Row>
                <NextImage
                  width={45}
                  height={45}
                  className='mr-5'
                  alt='value'
                  src='/images/about/value-icon.png'
                />
                <Col classes='w-2/3'>
                  <Text weight='bold'>Value</Text>
                  <Text classes='text-base text-primary-gray'>50% cheaper than funeral directors.</Text>
                </Col>
              </Row>
            </Box>
            <Box classes='mb-6 tablet:mb-0'>
              <Row>
                <NextImage
                  width={45}
                  height={45}
                  className='mr-5'
                  alt='delivery'
                  src='/images/about/delivery-icon.png'
                />
                <Col classes='w-2/3'>
                  <Text weight='bold'>Delivery</Text>
                  <Text classes='text-base text-primary-gray'>GPS Enabled Fleet</Text>
                </Col>
              </Row>
            </Box>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}
