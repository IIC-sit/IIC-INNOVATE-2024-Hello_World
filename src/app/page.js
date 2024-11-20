'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Menu, ChevronDown, ChevronUp, MapPin, Phone, Mail } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'


export default function DonorHub() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedCard, setExpandedCard] = useState(null)
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Simulating login state

  const donationSites = [
    { 
      id: 1,
      title: "City Blood Bank",
      description: "Open 24/7 for blood donations",
      distance: "2.5 miles away",
      address: "123 Main St, Cityville, ST 12345",
      phone: "(555) 123-4567",
      email: "info@citybloodbank.com",
      image: "/placeholder.svg?height=100&width=100"
    },
    {
      id: 2,
      title: "Regional Donation Center",
      description: "Accepting all blood types",
      distance: "4.1 miles away",
      address: "456 Oak Ave, Townsburg, ST 67890",
      phone: "(555) 987-6543",
      email: "contact@regionaldonation.org",
      image: "/placeholder.svg?height=100&width=100"
    },
    {
      id: 3,
      title: "Community Health Center",
      description: "Plasma and platelet donations",
      distance: "5.0 miles away",
      address: "789 Pine Rd, Villageton, ST 54321",
      phone: "(555) 246-8135",
      email: "donate@communityhealthcenter.com",
      image: "/placeholder.svg?height=100&width=100"
    },
  ]

  const faqs = [
    {
      question: "Who can donate blood?",
      answer: "Most healthy adults who are at least 17 years old and weigh at least 110 pounds can donate blood."
    },
    {
      question: "How often can I donate blood?",
      answer: "You can donate whole blood every 56 days, up to 6 times a year."
    },
    {
      question: "Is donating blood safe?",
      answer: "Yes, donating blood is safe. New, sterile equipment is used for each donor."
    },
    {
      question: "How long does a blood donation take?",
      answer: "The entire process takes about an hour, but the actual donation only takes 8-10 minutes."
    }
  ]

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  const toggleAboutUs = () => {
    setIsAboutUsOpen(!isAboutUsOpen)
  }
  const router = useRouter();

  function handleLogin(){
    router.push('/login')
  }

  function handleSignup(){
    router.push('/signup')
  }

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="#" className="flex items-center gap-2 text-2xl font-bold text-rose-600">
            <Heart className="h-6 w-6 fill-current" />
            DONOR HUB
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#faqs" className="text-sm font-medium hover:text-rose-600 transition-colors">FAQs</a>
            <button onClick={toggleAboutUs} className="text-sm font-medium hover:text-rose-600 transition-colors">About Us</button>
            <Button variant="outline" className="bg-green-500 text-white border-2" onClick={handleLogin}>Login</Button>
            <Button variant="outline" onClick={handleSignup}>Sign up</Button>
            <Button variant="outline" onClick={handleLogin}>Login as Organization</Button>
            <Button  onClick={handleSignup}>Sign up as Organization</Button>
          </nav>
          <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="md:hidden">
        <Menu className="h-5 w-5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem onSelect={() => document.getElementById('faqs').scrollIntoView({ behavior: 'smooth' })}>
        FAQs
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={toggleAboutUs}>About Us</DropdownMenuItem>
      <DropdownMenuItem onSelect={() => console.log('Login clicked')} onClick={()=>router.push("/")}>Login</DropdownMenuItem>
      <DropdownMenuItem onSelect={() => console.log('Sign up clicked')}>Sign up</DropdownMenuItem>
      <DropdownMenuItem onSelect={() => console.log('Login as Organization clicked')}>Login as Organization</DropdownMenuItem>
      <DropdownMenuItem onSelect={() => console.log('Sign up as Organization clicked')}>Sign up as Organization</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Save Lives, Donate Today</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your donation can make a world of difference. Find a donation center near you and start saving lives.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Donation Centers</CardTitle>
                <CardDescription>Find nearby centers and schedule your donation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donationSites.map((site, index) => (
                    <motion.div
                      key={site.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage src={site.image} alt={site.title} />
                                <AvatarFallback>{site.title.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-lg">{site.title}</CardTitle>
                                <CardDescription>{site.description}</CardDescription>
                              </div>
                            </div>
                            <Badge variant="secondary">{site.distance}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Button variant="ghost" className="w-full justify-start" onClick={() => toggleCard(site.id)}>
                            {expandedCard === site.id ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
                            {expandedCard === site.id ? 'Less Info' : 'More Info'}
                          </Button>
                          <AnimatePresence>
                            {expandedCard === site.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 space-y-2 text-sm"
                              >
                                <p className="flex items-center"><MapPin className="mr-2 h-4 w-4" /> {site.address}</p>
                                <p className="flex items-center"><Phone className="mr-2 h-4 w-4" /> {site.phone}</p>
                                <p className="flex items-center"><Mail className="mr-2 h-4 w-4" /> {site.email}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" onClick={() => console.log('Register for Donation clicked')}>
                            Register for Donation
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why Donate?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <Heart className="text-rose-600 mr-2 h-5 w-5" />
                    Save up to 3 lives with a single donation
                  </li>
                  <li className="flex items-center">
                    <Heart className="text-rose-600 mr-2 h-5 w-5" />
                    Help patients undergoing surgeries and treatments
                  </li>
                  <li className="flex items-center">
                    <Heart className="text-rose-600 mr-2 h-5 w-5" />
                    Support your local community's health needs
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-rose-500 to-pink-500 text-white">
              <CardHeader>
                <CardTitle className="text-white">Ready to Save Lives?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Sign up now to schedule your first donation and join our community of heroes.</p>
                <Button variant="secondary" className="w-full" onClick={() => console.log('Get Started clicked')}>
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Donation History</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoggedIn ? (
                  <div>
                    <p className="text-gray-600 mb-2">Total donations: 3</p>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <span>City Blood Bank</span>
                        <Badge>500ml</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Regional Donation Center</span>
                        <Badge>450ml</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Community Health Center</span>
                        <Badge>500ml</Badge>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-600">Log in to view your donation history.</p>
                )}
              </CardContent>
              {isLoggedIn && (
                <CardFooter>
                  <Button variant="outline" className="w-full">View Full History</Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>

        <div id="faqs" className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {isAboutUsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={toggleAboutUs}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">About Us</h2>
              <p className="text-gray-600 mb-4">
                Donor Hub is dedicated to connecting blood donors with local donation centers. 
                Our mission is to save lives by making blood donation easy and accessible for everyone.
              </p>
              <Button onClick={toggleAboutUs} className="w-full">
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}