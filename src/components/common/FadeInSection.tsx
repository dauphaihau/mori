import { ReactNode } from "react";

import { Box } from "core/components";
import { cn } from "core/helpers";
import { useFadeIn } from "core/hooks";

export default function FadeInSection(
  { classes, children }: {classes?: string, children: ReactNode}
) {
  const [ref, isVisible] = useFadeIn()
  return (
    <Box
      ref={ref}
      section
      classes={cn('fade-in-section',
        isVisible ? 'visible' : '',
        classes
      )}
    >
      {children}
    </Box>
  );
}



