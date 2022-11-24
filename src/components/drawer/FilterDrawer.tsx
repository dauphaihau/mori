import { useState, useEffect } from 'react'
import { useRouter } from "next/router";

import Filters from "../pages/productList/Filters/Filters";
import { Drawer, Button, Col } from "core/components";

const FiltersDrawer = ({ showFiltersDrawer, setShowFiltersDrawer }) => {
  const router = useRouter()
  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)

  useEffect(() => {
    setRenderClientSideComponent(true)
  }, [])

  const handleReset = () => {
    router.query = {}
    router.push('/product', undefined, { scroll: false })
  }

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
            onClick={handleReset}
          >clear all</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  )
}

export default FiltersDrawer;
