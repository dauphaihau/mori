import { Dialog, Button, Text, Checkbox, Input, Select, Box, Grid, Row, NextImage } from 'core/components';
import { config } from "../../config";
import React, { useState } from "react";

const ZoomImageDialog = ({images, showAddressDialog, setShowAddressDialog }) => {
  const [main, setMain] = useState<string>(images[0]);

  return (
    <Dialog
      isOpen={showAddressDialog}
      closeDialog={setShowAddressDialog}
      backdrop={
        <div className='fixed inset-0 bg-white'/>
      }
      // classes='absolute top-[40%] left-1/2 -translate-x-2/4 -translate-y-2/4'
    >
      <Dialog.Content closeDialog={setShowAddressDialog} classes='shadow-none'>
        <NextImage
          useSkeleton
          src={config.hostStaticSource + main}
          // alt={name}
          width={600}
          height={600}
          objectFit='contain'
          // className='mx-auto'
          // className='tablet:w-[500px] tablet:h-[500px] mx-auto'
          className='w-[300px] h-[300px] laptop:w-[800px] laptop:h-[800px] mx-auto mb-8 cursor-zoom-in
        '
        />
      </Dialog.Content>
    </Dialog>
  );
}

export default ZoomImageDialog;
