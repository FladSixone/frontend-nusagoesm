"use client";
import React, { useState } from 'react';
import ComponentCard from '../../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';
import TextArea from "../input/TextArea";

export default function BiodataInputs() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [address, setAddress] = useState("");("");
  const [showPassword, setShowPassword] = useState(false);

    // Email validation check
  const validateEmail = (value: string) => {
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    setError(isValidEmail);
    return isValidEmail;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };
  return (
<div className="overflow-hidden rounded-xl border border-brand-200 bg-white dark:border-brand-950 dark:bg-white/[0.03] shadow-sm">
  <div className="max-w-full overflow-x-auto">
    <div className="min-w-[1102px] ">

      <div className='px-6 py-5'>
      <div className='grid grid-cols-1 gap-6 xl:grid-cols-2 xl:grid-row-2 '>
      <div className="space-y-6">
        <div>
          <Label>Name</Label>
          <Input type="text" />
        </div>

         <div>
          <Label>Email</Label>
          <Input
            type="email"
            defaultValue={email}
            error={!error}
            success={error}
            onChange={handleEmailChange}
            placeholder="Enter the email"
            hint={!error ? "Invalid email" : error ? "Valid email" : ""}
          />
        </div>

        <div>
          <Label>Phone Number</Label>
          <Input type="text" placeholder="081234567890" />
        </div>

      </div>
      <div className='space-y-6'>

        <div>
          <Label>Department</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>Position</Label>
          <Input type="text" />
        </div>

      </div>

      </div>
      <div className='space-y-6'>

        <div>
          <Label>Address</Label>
          <TextArea
            value={address}
            onChange={(value) => setAddress(value)}
            rows={6}
            placeholder='Enter an address...'></TextArea>
        </div>
        
      </div>

</div>
      <div className="flex items-right justify-end border-t border-gray-200 dark:border-white/[0.05] px-5 py-4 text-sm ">
        <div>
          <button
            type='button'
            onClick={() => ("")}
            className="inline-flex items-center gap-2 rounded-lg px-8 py-2.5 mx-4 text-sm font-medium text-gray-700 dark:text-gray-400 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
        <div>
          <button
              type="button"
              onClick={() => ("")}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-8 py-2.5 mx-4 text-sm font-medium text-white hover:bg-brand-700"
            >
              Submit
            </button>
        </div>
      </div>
</div>
</div>
</div>


    );
  }

