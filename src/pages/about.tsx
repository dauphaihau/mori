import { FC } from "react";
import { Box } from 'core/components';
import Intro from 'components/pages/about/Intro';
import BannerAboutPage from "../components/pages/about/BannerAboutPage";
import LongIntro from "../components/pages/about/LongIntro";

const AboutPage: FC = () => {
  return (
    <Box
      section
      classes='about-page'
    >
      <BannerAboutPage/>
      <Box classes='about-page__content'>
        <Intro/>
        <LongIntro/>
      </Box>
    </Box>
  );
}

export default AboutPage;
