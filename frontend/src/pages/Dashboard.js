import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/component/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '../components/component/dropdown-menu';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/component/card';
import { HomeIcon, FileIcon, BookIcon, UsersIcon, BarChartIcon, SettingsIcon, LockIcon, HandHelpingIcon, LogOutIcon, BellIcon, SearchIcon, MenuIcon, UserIcon, TrendingUpIcon, TrendingDownIcon, ShoppingCartIcon, DollarSignIcon, CalendarIcon, ClockIcon, BriefcaseIcon } from '../components/component/icons';

// The rest of your component


export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full">
      <aside className="hidden w-64 flex-col border-r bg-background p-4 md:flex">
        <div className="mb-6 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary text-lg font-semibold text-primary-foreground" />
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <nav className="flex flex-col gap-1">
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <HomeIcon className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <FileIcon className="h-5 w-5" />
            Documents
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <BookIcon className="h-5 w-5" />
            Site Diary
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <UsersIcon className="h-5 w-5" />
            Employers
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <BarChartIcon className="h-5 w-5" />
            Reports
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <SettingsIcon className="h-5 w-5" />
            Settings
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <LockIcon className="h-5 w-5" />
            Administration
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <HandHelpingIcon className="h-5 w-5" />
            Support
          </Link>
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4 shadow-sm md:h-16 md:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <div className="text-lg font-bold">Overview</div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <SearchIcon className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <BellIcon className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <img
                    src="/placeholder.svg"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="rounded-full"
                    style={{ aspectRatio: "36/36", objectFit: "cover" }}
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Logged in as John Doe</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Employers</CardTitle>
                <CardDescription>The total number of registered employers.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">1,234</div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUpIcon className="h-4 w-4 text-green-500" />
                  <span>+5.2% from last month</span>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Employers</CardTitle>
                <CardDescription>The number of employers who have been active in the last 30 days.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">834</div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingDownIcon className="h-4 w-4 text-red-500" />
                  <span>-2.1% from last month</span>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>The total revenue generated in the last 30 days.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">$45,234</div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUpIcon className="h-4 w-4 text-green-500" />
                  <span>+12.4% from last month</span>
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>A summary of the latest user activity.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <UserIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">New user registered</div>
                      <div className="text-sm text-muted-foreground">John Doe joined 2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <ShoppingCartIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">New order placed</div>
                      <div className="text-sm text-muted-foreground">Order #1234 placed 30 minutes ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-green-50">
                      <DollarSignIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Payment received</div>
                      <div className="text-sm text-muted-foreground">Payment for order #5678 received 1 hour ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View all activity</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>A list of upcoming events and deadlines.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-blue-50">
                      <CalendarIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Product launch</div>
                      <div className="text-sm text-muted-foreground">June 15, 2023</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-yellow-50">
                      <ClockIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Quarterly review</div>
                      <div className="text-sm text-muted-foreground">July 1, 2023</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-purple-50">
                      <BriefcaseIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Sales conference</div>
                      <div className="text-sm text-muted-foreground">August 15, 2023</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View all events</Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
