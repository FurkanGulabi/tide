import SigninPageComponent from "@/components/auth/Signin";
import React from "react";

const AuthPage = () => {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <SigninPageComponent />
    </main>
  );
};

export default AuthPage;
