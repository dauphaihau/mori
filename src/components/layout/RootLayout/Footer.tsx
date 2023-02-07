import { Link, NextImage, Box, Text, Col, Grid, List } from 'core/components';
import { footerConfig } from 'config/footer';
import { PATH } from 'config/const';
import { config } from "config";
import { useRouter } from "next/router";

export default function Footer() {
  const now = new Date();
  const { pathname } = useRouter();
  const year = now.getFullYear();
  const routesPrivate = [PATH.ACCOUNT._, PATH.ACCOUNT.ADDRESS];

  return (
    <Box classes={!routesPrivate.includes(pathname) ? 'bg-gray-custom-52a' : ''}>
      <Box footer classes='footer layout'>
        <Box classes='footer__links'>
          <Grid sx={2} md={3} lg={6} classes='wrapper-topics gap-x-12'>
            {
              footerConfig.linksList.map((link, index) => (
                <Box classes='topic' key={index}>
                  <Text classes='topic__title'>{link.title}</Text>
                  <List classes='topic__content'>
                    {
                      link.list.map((item, idx) => (
                        <List.Item key={idx} classes='topic__item'>
                          <Link
                            underline
                            href={PATH.HOME}
                            classes='topic__link'
                          >
                            <Text
                              i
                              hideIf={!item.hasOwnProperty('icon')}
                              classes={['fa-brands topic__item--logo', item.icon]}
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
          >© {year} Mori Store, Inc. All rights reserved.</Text>
          <Box classes='payments'>
            <List classes='payments__list space-s-4 xs:space-s-5 lg:space-s-7'>
              {
                footerConfig.listPayment.map((item, index) => (
                  <List.Item
                    classes='payment'
                    key={index}
                  >
                    <Link href={PATH.DEFAULT} target='_blank'>
                      <NextImage
                        src={config.hostStaticSource + item.srcImg}
                        alt={item.title}
                        width={item.width}
                        height={item.height}
                        objectFit='contain'
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
