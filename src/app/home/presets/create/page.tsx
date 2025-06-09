import CreatePresetForm from "@/app/components/presets/CreatePresetForm";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import React from "react";

function CreatePreset() {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Пресети", href: "/home/presets" },
          {
            label: "Стоврити Пресет",
            href: "/home/presets/create",
            active: true,
          },
        ]}
      />
      
      <CreatePresetForm/>
    </>
  );
}

export default CreatePreset;
