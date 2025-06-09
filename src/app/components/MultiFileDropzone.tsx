'use client';

import { FileUploader } from './upload/multi-file';
import {
  UploaderProvider,
  type UploadFn,
} from './upload/uploader-provider';
import { useEdgeStore } from '@/lib/edgestore';
import * as React from 'react';

export function MultiFileDropzoneUsage() {
  const { edgestore } = useEdgeStore();

  const uploadFn: UploadFn = React.useCallback(
    async ({ file, onProgressChange, signal }) => {
      const res = await edgestore.publicFiles.upload({
        file,
        signal,
        onProgressChange,
      });
      // you can run some server action or api here
      // to add the necessary data to your database
      console.log(res);
      return res;
    },
    [edgestore],
  );

  return (
    <UploaderProvider uploadFn={uploadFn} autoUpload={false}>
      <FileUploader
        // maxFiles={5}
        maxSize={1024 * 1024 * 10} // 10 MB
        accept={{
          // accept: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
          // 'application/pdf': [],
          // 'text/plain': ['.txt'],
        }}
      />
    </UploaderProvider>
  );
}