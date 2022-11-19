import { useState, useEffect } from 'react'
import Filters from "../pages/productList/Filters/Filters";
import { useFilterContext } from "context/filterContext";
import { Drawer, Button, Col } from "core/components";

const FiltersDrawer = ({}) => {
// const FiltersDrawer = ({ showFiltersDrawer, setShowFiltersDrawer }) => {
  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)
  const { clearFilters, showFiltersDrawer, setShowFiltersDrawer } = useFilterContext()

  useEffect(() => {
    setRenderClientSideComponent(true)
  }, [])

  if (!renderClientSideComponent) return null
  return (
    <>
      <Drawer
        show={showFiltersDrawer}
        onClose={setShowFiltersDrawer}
        classes='w-[70%] ipad:w-1/3'
      >
        <Drawer.Head
          onClose={setShowFiltersDrawer}
          title='Filters'
        />
        <Drawer.Body>
          <Col classes="mt-6 h-full overflow-x-hidden">
            <Filters/>
          </Col>
        </Drawer.Body>
        <Drawer.Footer>
          <Button
            classes='w-fit'
            onClick={() => clearFilters()}
          >clear all</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  )
}

export default FiltersDrawer;
