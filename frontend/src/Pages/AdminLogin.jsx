import React from "react";

function AdminLogin() {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
