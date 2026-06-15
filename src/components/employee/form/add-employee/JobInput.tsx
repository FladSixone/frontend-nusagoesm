"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// 1. Dynamically import to disable SSR
const ReactSelect = dynamic(
  () => import("react-select"),
  { ssr: false }
);

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function TypeableSelect() {
  const [selected, setSelected] = useState(null);

  return (
    <ReactSelect
      isSearchable // Enables typing to filter options
      isClearable   // Allows clearing the selection
      options={options}
      value={selected}
      placeholder="Type to search..."
    />
  );
}