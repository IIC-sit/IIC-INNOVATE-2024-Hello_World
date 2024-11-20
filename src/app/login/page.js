// "use client"
// import classes from "./styles.module.css";
// import VerticalLine from "@/components/Verticleline";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Signup() {

  
//   const router = useRouter();

    
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setMessage('Login successful');
//         router.push("/chat");
//       } else {
//         setMessage(data.message);
//       }
//     } catch (error) {
//       setMessage('An error occurred during login');
//       console.error(error);
//     }
//   };

//   const handleSignup = () => {
//     router.push("/signup")
// }

//   return (
//     <div className={classes.all}>
//       <div className={classes.signupform}>
//         <form onSubmit={handleLogin}>
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
//         <p>{message}</p>
//       </div>
//       <VerticalLine className={classes.verticalline} />
//       <div className={classes.loginform}>
//         <p>Signup</p>
//         <button onClick={handleSignup}>Click here</button>
//       </div>
//     </div>
//   );
// }
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function LoginPage() {
  

  const router = useRouter();

    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    // Handle the camp signup logic
    console.log('Camp signup attempted with:');
    // Redirect to the donor hub
    router.push('/donor-hub');
  };

  const handleSignup = () => {
    router.push("/signup")
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-rose-600" />
          </div>
          <CardTitle className="text-2xl text-center">Login to Donor Hub</CardTitle>
          <CardDescription className="text-center">
            Enter your username and password to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">Log in</Button>
            <p className="text-sm text-center text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-rose-600 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
