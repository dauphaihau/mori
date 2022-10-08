import { useMemo, useState } from "react";

interface ShowMoreTextTogglerType {
  text: string,
  classes: string,
  limit: number,
}

const ShowMoreTextToggler = (props: ShowMoreTextTogglerType) => {
  const { text = '', classes = '', limit } = props;
  const [showMore, setShowMore] = useState(false);

  const truncateText = useMemo(() => {
    return text.slice(0, limit).concat('...');
  }, [text]);

  return (
    <p className={classes}>
      {showMore ? text : truncateText}
      <span
        className='cursor-pointer font-bold'
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? ' See less' : 'See more'}
      </span>
    </p>
  )
}

export default ShowMoreTextToggler
