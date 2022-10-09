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
          <Grid sx={2} md={3} lg={6} classes='wrapper-topics gap-x-12'>
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
                              i
                              hideIf={!item.hasOwnProperty('icon')}
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
