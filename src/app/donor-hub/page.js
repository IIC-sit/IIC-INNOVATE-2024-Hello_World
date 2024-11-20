'use client'

import { useState } from 'react'
import { Heart, Plus, Calendar, Users, Droplet, MapPin, Phone, Mail, AlertCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CampDashboard() {
  const [organizationName, setOrganizationName] = useState("City Blood Bank")
  const [newCampDate, setNewCampDate] = useState("")
  const [newCampPlace, setNewCampPlace] = useState("")
  const [isNewCampDialogOpen, setIsNewCampDialogOpen] = useState(false)
  const [selectedCamp, setSelectedCamp] = useState(null)
  const [isUserDetailsDialogOpen, setIsUserDetailsDialogOpen] = useState(false)

  // Mock data for registered donors
  const registeredDonors = [
    { id: 1, name: "John Doe", bloodType: "A+", lastDonation: "2023-11-15", contact: "+1234567890" },
    { id: 2, name: "Jane Smith", bloodType: "O-", lastDonation: "2023-10-22", contact: "+1987654321" },
    { id: 3, name: "Alice Johnson", bloodType: "B+", lastDonation: "2023-12-01", contact: "+1122334455" },
  ]

  // Mock data for upcoming camps with registered users
  const upcomingCamps = [
    { 
      id: 1, 
      date: "2024-01-15", 
      location: "Central Park", 
      registered: 25,
      users: [
        { id: 1, name: "Emma Wilson", bloodType: "A-", age: 28 },
        { id: 2, name: "Liam Brown", bloodType: "B+", age: 35 },
        { id: 3, name: "Olivia Davis", bloodType: "O+", age: 42 },
      ]
    },
    { 
      id: 2, 
      date: "2024-01-22", 
      location: "City Hall", 
      registered: 18,
      users: [
        { id: 4, name: "Noah Taylor", bloodType: "AB+", age: 31 },
        { id: 5, name: "Ava Anderson", bloodType: "A+", age: 26 },
      ]
    },
    { 
      id: 3, 
      date: "2024-02-05", 
      location: "Community Center", 
      registered: 30,
      users: [
        { id: 6, name: "Sophia Martinez", bloodType: "O-", age: 39 },
        { id: 7, name: "Jackson Lee", bloodType: "B-", age: 45 },
        { id: 8, name: "Isabella Clark", bloodType: "A+", age: 33 },
      ]
    },
  ]

  const handleOpenNewCamp = () => {
    console.log("Opening new camp at:", newCampPlace, "on", newCampDate)
    setNewCampDate("")
    setNewCampPlace("")
    setIsNewCampDialogOpen(false)
    // Here you would typically handle the backend logic for opening a new camp
  }

  const handleViewDetails = (camp) => {
    setSelectedCamp(camp)
    setIsUserDetailsDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 text-2xl font-bold text-rose-600">
            <Heart className="h-8 w-8 fill-current" />
            <span>{organizationName} Dashboard</span>
          </div>
          <Button variant="outline" onClick={() => console.log('Logout clicked')}>Logout</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            There's an urgent need for O- blood type. Please prioritize these donors.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+20% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blood Collected (L)</CardTitle>
              <Droplet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">567</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Camps</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Next camp in 5 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open New Camp</CardTitle>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Dialog open={isNewCampDialogOpen} onOpenChange={setIsNewCampDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">Open Now</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Open New Blood Donation Camp</DialogTitle>
                    <DialogDescription>
                      Enter the date and place for the new blood donation camp.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={newCampDate}
                        onChange={(e) => setNewCampDate(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="place" className="text-right">
                        Place
                      </Label>
                      <Input
                        id="place"
                        value={newCampPlace}
                        onChange={(e) => setNewCampPlace(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleOpenNewCamp}>Open Camp</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="donors" className="mt-6">
          <TabsList>
            <TabsTrigger value="donors">Registered Donors</TabsTrigger>
            <TabsTrigger value="camps">Upcoming Camps</TabsTrigger>
          </TabsList>
          <TabsContent value="donors">
            <Card>
              <CardHeader>
                <CardTitle>Registered Donors</CardTitle>
                <CardDescription>A list of donors who have registered through the donor dashboard.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Blood Type</TableHead>
                      <TableHead>Last Donation</TableHead>
                      <TableHead>Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registeredDonors.map((donor) => (
                      <TableRow key={donor.id}>
                        <TableCell className="font-medium">{donor.name}</TableCell>
                        <TableCell>
                          <Badge variant={donor.bloodType.includes('-') ? "destructive" : "default"}>
                            {donor.bloodType}
                          </Badge>
                        </TableCell>
                        <TableCell>{donor.lastDonation}</TableCell>
                        <TableCell>{donor.contact}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="camps">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Camps</CardTitle>
                <CardDescription>Details of upcoming blood donation camps.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Registered Donors</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingCamps.map((camp) => (
                      <TableRow key={camp.id}>
                        <TableCell>{camp.date}</TableCell>
                        <TableCell>{camp.location}</TableCell>
                        <TableCell>{camp.registered}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(camp)}>View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={isUserDetailsDialogOpen} onOpenChange={setIsUserDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Registered Users for {selectedCamp?.location}</DialogTitle>
            <DialogDescription>
              Camp Date: {selectedCamp?.date} | Total Registered: {selectedCamp?.registered}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Blood Type</TableHead>
                  <TableHead>Age</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedCamp?.users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>
                      <Badge variant={user.bloodType.includes('-') ? "destructive" : "default"}>
                        {user.bloodType}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.age}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
          <DialogFooter>
            <Button onClick={() => setIsUserDetailsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}