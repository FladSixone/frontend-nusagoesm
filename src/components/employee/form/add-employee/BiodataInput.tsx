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
    <>
    <ComponentCard title="Default Inputs">
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

        <div>
          <Label>Description</Label>
          <TextArea
            value={address}
            onChange={(value) => setAddress(value)}
            rows={6}
            placeholder='Enter an address...'></TextArea>
        </div>
        
      </div>
    </ComponentCard>
    </>
    );
  }

