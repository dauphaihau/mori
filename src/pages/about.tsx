import { Box } from 'core/components';
import Intro from 'components/pages/about/Intro';
import LongIntro from "components/pages/about/LongIntro";

export default function AboutPage() {
  return (
    <Box
      section
      classes='about-page'
    >
      <Box classes='about-page__banner'>
        <Box
          classes={[
            'image-banner-frame',
            "bg-[url('https://res.cloudinary.com/duiehrbms/image/upload/v1668334342/mori-ecommerce/about/banner_rlumwu.webp')]"
          ]}
        >
        </Box>
      </Box>
      <Box classes='about-page__content'>
        <Intro/>
        <LongIntro/>
      </Box>
    </Box>
  );
}
