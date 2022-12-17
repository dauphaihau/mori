import { Col } from "core/components";
import DisclosureFAQs from "./ProductInfo/DisclosureFAQs";
import DisclosureDescription from "./ProductInfo/DisclosureDescription";
import DisclosureShipping from "./ProductInfo/DisclosureShipping";
import DisclosureHighlights from "./ProductInfo/DisclosureHighlights";

export default function ProductLongInfo({ description }) {
  return (
    <Col classes='mt-6 mb-4 laptop:mb-36' align='center'>
      <DisclosureHighlights/>
      <DisclosureDescription description={description}/>
      <DisclosureFAQs/>
      <DisclosureShipping/>
    </Col>
  )
}
