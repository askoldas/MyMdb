import React from 'react';
import '@/styles/App.scss';
import { AuthForm } from '../composite/AuthForm';

export function LogIn() {
  return (
    <div className="login-page">
      <h1 className="login-page__title">Welcome Back!</h1>
      <p className="login-page__subtitle">Please log in or sign up to continue.</p>
      <AuthForm />
    </div>
  );
}
