"use client";

import React from "react";

// Update PageProps to reflect the correct type
interface PageProps {
  params: {
    id: string;
  };
}

export default function ProfilePage({ params }: PageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <h2 className="bg-green-300 text-black">{params.id}</h2>
    </div>
  );
}
