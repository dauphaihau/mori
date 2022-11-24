import { MenuIcon, ViewGridIcon } from "@heroicons/react/outline";

import { Box, Text } from "core/components";
import { cn } from "core/helpers";

export default function Viewer({ setGridView, gridView }) {
  return (
    <Box classes='hidden tablet:flex items-center'>
      <Text classes='mr-4'>View:</Text>
      <ViewGridIcon
        className={cn('btn-icon mr-1',
          gridView && 'text-black bg-light'
        )}
        onClick={() => setGridView(true)}
      />
      <MenuIcon
        onClick={() => setGridView(false)}
        className={cn('btn-icon',
          !gridView && 'text-black bg-light'
        )}
      />
    </Box>
  );
}
