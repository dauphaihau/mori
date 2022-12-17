import React from 'react';
import Image from "next/image";

import SliderContainer, { SliderItem } from "./SliderItem";
import { Col, Text } from "core/components";
import FadeInSection from 'components/common/FadeInSection';
import { config } from "config";

const ClientLogo: React.FC = () => {
  return (
    <FadeInSection classes='py-16 tablet:py-24 mb-12 '>
    {/*<FadeInSection classes='py-16 tablet:py-24 mb-12 bg-gray-custom-50'>*/}
      <Col
        justify='center'
        align='center'
      >
        <Text h2 classes='mb-16'>As Recognized By</Text>
        {
          <SliderContainer
            contentWidth={1980}
            initialOffsetX={0}
          >
            {
              data.map((item, index) => (
                <SliderItem width={150} key={index}>
                  <Image
                    src={config.hostStaticSource2 + item.srcUrl}
                    width={120}
                    height={70}
                    className='grayscale opacity-30 hover:opacity-100 animate'
                    objectFit='contain'
                    alt={item.name}
                  />
                </SliderItem>
              ))
            }
          </SliderContainer>
        }
        {
          <SliderContainer
            className='mt-6'
            contentWidth={1980}
            initialOffsetX={0}
          >
            {
              data2.map((item, index) => (
                <SliderItem width={150} key={index}>
                  <Image
                    src={config.hostStaticSource2 + item.srcUrl}
                    // src='/images/logos/audubon.png'
                    width={120}
                    height={70}
                    className='grayscale opacity-30 hover:opacity-100 animate'
                    objectFit='contain'
                    alt={item.name}
                  />
                </SliderItem>
              ))
            }
          </SliderContainer>
        }
      </Col>
    </FadeInSection>
  );
}

export default ClientLogo;

const data = [
  {
    name: 'The lost heart',
    srcUrl: '/v1670924480/mori-ecommerce/logo/client/the-lost-hearts-foundation_io5lye.png'
  },
  {
    name: 'Auden',
    srcUrl: '/v1670937447/mori-ecommerce/logo/client/auden_bpyyq8.png'
  },

  {
    name: 'Snap calorie',
    srcUrl: '/v1670924479/mori-ecommerce/logo/client/snapcalorie_osm7tv.png'
  },
  {
    name: 'FFMA',
    srcUrl: '/v1670924477/mori-ecommerce/logo/client/ffma_s9ylu1.png'
  },

  {
    name: 'Slingshot',
    srcUrl: '/v1670924479/mori-ecommerce/logo/client/slingshot_meeiwf.png'
  },
  {
    name: 'Respect',
    srcUrl: '/v1670924479/mori-ecommerce/logo/client/respect_k346p2.jpg'
  },
  {
    name: 'Audubon',
    srcUrl: '/v1670924476/mori-ecommerce/logo/client/audubon_smoqmb.png'
  },

  {
    name: 'Coinbase',
    srcUrl: '/v1670924475/mori-ecommerce/logo/client/coinbase_xgo8l2.png'
  },
  {
    name: 'Picnic',
    srcUrl: '/v1670924478/mori-ecommerce/logo/client/picnic_oidurl.png'
  },
  {
    name: 'Expensify',
    srcUrl: '/v1670924476/mori-ecommerce/logo/client/expensify_zqg5mr.png'
  },

  {
    name: 'Extra',
    srcUrl: '/v1670924476/mori-ecommerce/logo/client/extra_epbdr2.png'
  },
  {
    name: 'Status',
    srcUrl: '/v1670924479/mori-ecommerce/logo/client/status_rjb3f1.png'
  },
]

const data2 = [
  {
    name: 'Natural Endings',
    srcUrl: '/v1670924477/mori-ecommerce/logo/client/natural-ending_zk5hcp.png'
  },
  {
    name: 'Rock of ages',
    srcUrl: '/v1670924478/mori-ecommerce/logo/client/rock-of-ages_ffwh2l.png'
  },
  {
    name: 'Milano',
    srcUrl: '/v1670924477/mori-ecommerce/logo/client/milano_zsyg37.png'
  },

  {
    name: 'Perfectmemorials',
    srcUrl: '/v1670924477/mori-ecommerce/logo/client/perfect-memorials_yiowvn.png'
  },
  {
    name: 'ICCM',
    srcUrl: '/v1670924477/mori-ecommerce/logo/client/iccm_yrhdnq.png'
  },

  {
    name: 'Tributes',
    srcUrl: '/v1670924480/mori-ecommerce/logo/client/tributes_ne2xf9.png'
  },
  // {
  //   name: 'Titan',
  //   srcUrl: '/v1670924480/mori-ecommerce/logo/client/titan_lq6qw4.png'
  // },
  {
    name: 'White Rose',
    srcUrl: '/v1670924481/mori-ecommerce/logo/client/white-rose_t4wkue.jpg'
  },
  {
    name: 'Starbucks',
    srcUrl: '/v1670927471/mori-ecommerce/logo/client/starbucks_wcc5i3.png'
  },

  {
    name: 'Rainbow',
    srcUrl: '/v1670924478/mori-ecommerce/logo/client/rainbow_jynaol.png'
  },
  {
    name: 'Fibreshed',
    srcUrl: '/v1670924477/mori-ecommerce/logo/client/fibreshed_wkpyke.png'
  },
]
