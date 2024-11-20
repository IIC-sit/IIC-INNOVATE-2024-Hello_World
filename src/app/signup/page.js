// "use client"
// import classes from "./styles.module.css";
// import VerticalLine from "@/components/Verticleline";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { NextResponse } from "next/server";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const response = await fetch("/api/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     });
//     if (response.ok) {
//       router.push("/files")
//     } else {
//       const error = await response.json();
//       alert(`Login failed: ${error.message}`);
//     }
//   };

//   const handleLogin = () => {
//       router.push("/login")
//   }

//   return (
//     <div className={classes.all}>
//       <div className={classes.signupform}>
//         <form onSubmit={handleSubmit}>
//           <p>UserName</p>
//           <input type="email" onChange={(e)=>{setUsername(e.target.value)}}></input>
//           <p>Password</p>
//           <input type="password" onChange={(e)=>{setPassword(e.target.value)}}></input>
//           <div className={classes.formbtn}>
//             <button className={classes.formbtn1} type="submit">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//       <VerticalLine className={classes.verticalline} />
//       <div className={classes.loginform}>
//         <p>Login</p>
//         <button onClick={handleLogin}>Click here</button>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function CampSignup() {
  const [formData, setFormData] = useState({
    campName: '',
    password: '',
    address: '',
    email: '',
    phoneNumber: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the camp signup logic
    console.log('Camp signup attempted with:', formData);
    // Redirect to the donor hub
    router.push('/donor-hub');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-rose-600" />
          </div>
          <CardTitle className="text-2xl text-center">Register as a Camp</CardTitle>
          <CardDescription className="text-center">
            Create an account for your blood donation camp
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="campName">Camp Name</Label>
              <Input
                id="campName"
                name="campName"
                type="text"
                placeholder="Enter your camp name"
                value={formData.campName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="Enter camp address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter camp email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Enter camp phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">Register Camp</Button>
            <p className="text-sm text-center text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-rose-600 hover:underline">
                Log in
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
