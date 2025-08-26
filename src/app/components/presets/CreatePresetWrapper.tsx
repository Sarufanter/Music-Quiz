"use client";
import { UploaderProvider, UploadFn } from "../upload/uploader-provider";
import { useEdgeStore } from "@/lib/edgestore";
import CreatePresetForm from "./CreatePresetForm";
import * as React from "react";

export default function CreatePresetWrapper() {
  const { edgestore } = useEdgeStore();

  const uploadFn: UploadFn = React.useCallback(
    async ({ file, onProgressChange, signal }) => {
      const res = await edgestore.publicFiles.upload({
        file,
        signal,
        onProgressChange,
      });
      // console.log(res);
      // console.log(file);    
      return res;
    },
    [edgestore]
  );
  
  return (
    <UploaderProvider uploadFn={uploadFn} autoUpload={true}>
      <CreatePresetForm />
    </UploaderProvider>
  );
}
