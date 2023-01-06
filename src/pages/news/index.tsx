import NewsCard from 'components/pages/news/NewsCard';
import { Text, Grid, Box } from 'core/components';
import { newsData } from "assets/data/News";

export default function NewsPage() {
  return (
    <Box classes='pb-28 layout'>
      {/*<Box classes='bg-gray-custom-52a pb-28'>*/}
      <Box classes='my-16 text-center'>
        <Text
          h1
          weight='light'
          transforms='uppercase'
          classes='text-3xl laptop:text-5xl tracking-wider'
        >News</Text>
      </Box>
      <Grid
        md={2}
        lg={3}
        gap={12}
        classes='max-w-6xl mx-auto gap-x-12 gap-y-20'
      >
        {newsData.map((item, index) => (
          <NewsCard key={index} data={item}/>
        ))}
      </Grid>
    </Box>
  )
}
