import { Link, NextImage, Box, Text, Col, Grid, List } from 'core/components';
import { data as footerData } from 'assets/data/FooterData';
import Enums from 'config/enums';
import { clns } from "core/helpers";

const Footer = () => {
  return (
    <Box classes='bg-gray-custom-52a'>
      <Box
        footer
        classes='footer layout'
      >
        <Box classes='footer__links'>
          <Grid sx={2} md={3} lg={6} classes='wrapper-topics'>
            {
              footerData.links.map((link, index) => (
                <Box
                  classes='topic'
                  key={index}
                >
                  <Text classes='topic__title'>{link.title}</Text>
                  <List classes='topic__content'>
                    {
                      link.data.map((item, idx) => (
                        <List.Item
                          key={idx}
                          classes='topic__item'
                        >
                          <Link
                            underline
                            href={Enums.PATH.DEFAULT}
                            classes='topic__link'
                          >
                            <Text
                              hideIf={!item.hasOwnProperty('icon')}
                              i
                              classes={clns('fa-brands topic__item--logo', item.icon)}
                            />
                            {item.title}
                          </Link>
                        </List.Item>
                      ))
                    }
                  </List>
                </Box>
              ))
            }

            {/*<Box classes='topic'>*/}
            {/*  <Text classes='topic__title'>Social</Text>*/}
            {/*  <List classes='topic__content'>*/}
            {/*    {*/}
            {/*      footerData.listSocial.map((item, index) => (*/}
            {/*        <List.Item classes='topic__item' key={index}>*/}
            {/*          <Link underline href={Enums.PATH.DEFAULT} classes='topic__link'>*/}
            {/*            <Text i classes={clns('fa-brands topic__item--logo', item.icon)}/>{item.name}*/}
            {/*          </Link>*/}
            {/*        </List.Item>*/}
            {/*      ))*/}
            {/*    }*/}
            {/*  </List>*/}
            {/*</Box>*/}
            {/*<Box classes='topic'>*/}
            {/*  <Text classes='topic__title'>Contact</Text>*/}
            {/*  <List classes='topic__content footer-links'>*/}
            {/*    {['Contact Us', 'Deck 5, ISS, LEO 51.603.', 'dauphaihau@outlook.com', 'Call us: 84901111921'].map((nameLink, id) => (*/}
            {/*      <List.Item*/}
            {/*        classes='topic__item'*/}
            {/*        key={id}*/}
            {/*      >*/}
            {/*        <Link*/}
            {/*          underline*/}
            {/*          href={Enums.PATH.DEFAULT}*/}
            {/*          classes='topic__link'*/}
            {/*        >*/}
            {/*          {nameLink}*/}
            {/*        </Link>*/}
            {/*      </List.Item>*/}
            {/*    ))}*/}
            {/*  </List>*/}
            {/*</Box>*/}
            {/*<Box classes='topic'>*/}
            {/*  <Text classes='topic__title'>About</Text>*/}
            {/*  <List classes='topic__content footer-links'>*/}
            {/*    {['Support center', 'Customer Support', 'Intro Us', 'Copyright'].map((nameLink, id) => (*/}
            {/*      <List.Item classes='topic__item' key={id}>*/}
            {/*        <Link underline href={Enums.PATH.DEFAULT} classes='topic__link'>*/}
            {/*          {nameLink}*/}
            {/*        </Link>*/}
            {/*      </List.Item>*/}
            {/*    ))}*/}
            {/*  </List>*/}
            {/*</Box>*/}
            {/*<Box classes='topic'>*/}
            {/*  <Text classes='topic__title'>Customer Care</Text>*/}
            {/*  <List classes='topic__content footer-links'>*/}
            {/*    {['FAQ & Helps', 'Shipping & Delivery', 'Return & Exchanges'].map((nameLink, id) => (*/}
            {/*      <List.Item classes='topic__item' key={id}>*/}
            {/*        <Link underline href={Enums.PATH.DEFAULT} classes='topic__link'>*/}
            {/*          {nameLink}*/}
            {/*        </Link>*/}
            {/*      </List.Item>*/}
            {/*    ))}*/}
            {/*  </List>*/}
            {/*</Box>*/}
            {/*<Box classes='topic mt-8'>*/}
            {/*  <Text classes='topic__title'>Our Information</Text>*/}
            {/*  <List classes='topic__content footer-links'>*/}
            {/*    {['Privacy policy', 'Terms & conditions', 'Return Policy', 'Site Map'].map((nameLink, id) => (*/}
            {/*      <List.Item classes='topic__item' key={id}>*/}
            {/*        <Link underline href={Enums.PATH.DEFAULT} classes='topic__link'>*/}
            {/*          {nameLink}*/}
            {/*        </Link>*/}
            {/*      </List.Item>*/}
            {/*    ))}*/}
            {/*  </List>*/}
            {/*</Box>*/}
            {/*<Box classes='topic mt-8'>*/}
            {/*  <Text classes='topic__title'>Top Categories</Text>*/}
            {/*  <List classes='topic__content footer-links'>*/}
            {/*    {['Natural material coffin', 'Traditional coffin', 'American caskets'].map((nameLink, id) => (*/}
            {/*      <List.Item classes='topic__item' key={id}>*/}
            {/*        <Link underline href={Enums.PATH.DEFAULT} classes='topic__link'>*/}
            {/*          {nameLink}*/}
            {/*        </Link>*/}
            {/*      </List.Item>*/}
            {/*    ))}*/}
            {/*  </List>*/}
            {/*</Box>*/}

          </Grid>
        </Box>
        <Col
          align='center'
          justify='around'
          classes='footer__certification flex-col-reverse laptop:flex-row'
        >
          <Text
            span
            classes='copyright'
          >© 2022 Mori Store, Inc. All rights reserved.</Text>
          <Box classes='payments'>
            <List classes='payments__list space-s-4 xs:space-s-5 lg:space-s-7'>
              {
                footerData.listPayment.map((item, index) => (
                  <List.Item
                    classes='payment'
                    key={index}
                  >
                    <Link
                      href={Enums.PATH.DEFAULT}
                      target='_blank'
                    >
                      <NextImage
                        src={item.srcImg}
                        alt={item.name}
                        width={item.width}
                        height={item.height}
                        // objectFit='contain'
                        objectFit={item?.objectFit}
                      />
                    </Link>
                  </List.Item>
                ))
              }
            </List>
          </Box>
        </Col>
      </Box>
    </Box>
  );
}

export default Footer;
