"use client";
import React, { useState } from 'react';
import ComponentCard from '../../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';


export default function JobInputs() {

  return (
    <ComponentCard title="Job">
      <div className="space-y-6">
        <div>
          <Label>Department</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>Position</Label>
          <Input type="text" />
        </div>
      </div>
    </ComponentCard>
  );
}
