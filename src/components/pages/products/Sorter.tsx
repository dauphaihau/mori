import { useFilterContext } from 'context/filterContext';
import { ViewGridIcon, MenuIcon } from '@heroicons/react/outline';
import { sortOpts } from 'assets/data/options';
import { Select, Text, Box, Row } from 'core/components';
import { clns } from "core/helpers";

const Sorter = () => {
  const {
    setGridView,
    setListView,
    gridView,
    updateSort,
  } = useFilterContext()

  return (
    <Row classes='gap-x-8'>
      <Box classes='hidden tablet:flex items-center'>
        <Text classes='mr-4'>View:</Text>
        <ViewGridIcon
          className={clns('btn-icon mr-1',
            gridView && 'text-black bg-light'
          )}
          onClick={() => setGridView()}
        />
        <MenuIcon
          className={clns('btn-icon',
            !gridView && 'text-black bg-light'
          )}
          onClick={() => setListView()}
        />
      </Box>
      <Row
        align='center'
        classes='gap-x-4'
      >
        <Text classes='hidden laptop:block'>Short by:</Text>
        <Select
          name='sort'
          classesSpace='m-0'
          classesBtn='w-[11rem]'
          options={sortOpts}
          onChange={({ value }) => updateSort(value)}
        />
      </Row>
    </Row>
  );
}

export default Sorter;
