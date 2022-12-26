import { useRouter } from "next/router";

import Filters, { filterSearch } from "../pages/productList/Filters/Filters";
import { Drawer, Button, Col, Row } from "core/components";

const FiltersDrawer = ({ showFiltersDrawer, setShowFiltersDrawer }) => {
  const router = useRouter()

  const handleReset = () => {
    router.query = {}
    filterSearch({ router, category: 'all' })
    sessionStorage.removeItem('filters')
    setShowFiltersDrawer(false)
  }

  const handleApplyFilter = () => {
    const session = JSON.parse(window.sessionStorage.getItem('filters'))
    router.push(
      { pathname: router.pathname, query: session },
      undefined,
      { scroll: false }
    )
    setShowFiltersDrawer(false)
  }

  return (
    <Drawer
      show={showFiltersDrawer}
      onClose={setShowFiltersDrawer}
      classes='w-[70%] w-4/5 ipad:w-1/2'
    >
      <Drawer.Head
        onClose={setShowFiltersDrawer}
        title='Filters'
      />
      <Drawer.Body>
        <Col classes="h-full overflow-x-hidden ">
          <Filters/>
        </Col>
      </Drawer.Body>
      <Drawer.Footer classes='px-3'>
        <Row classes=''>
          {
            // router.query?.category !== 'all' &&
            Object.keys(router.query).length > 1 &&
            <Button
              light
              classes='w-1/3'
              onClick={handleReset}
            >clear all</Button>
          }
          <Button
            classes='w-full shrink'
            onClick={handleApplyFilter}
          >Apply</Button>
        </Row>
      </Drawer.Footer>
    </Drawer>
  )
}

export default FiltersDrawer;
