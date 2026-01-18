"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { LogOut, Loader2, Monitor, Trash2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { logout } from "@/store/slices/authSlice"
import { useSignOut } from "@/modules/auth/api/useAuth"
import { format } from "date-fns"

export default function Home() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, token, isAuthenticated } = useAppSelector((state) => state.auth)

  const signOutMutation = useSignOut({
    onSuccess: () => {
      // Clear Redux state
      dispatch(logout())
      console.log("Logout successful")
      // Redirect to sign-in page
      router.push("/sign-in")
    },
  })

  const handleLogout = () => {
    if (token) {
      signOutMutation.mutate({ token })
    } else {
      // If no token, just clear state and redirect
      dispatch(logout())
      router.push("/sign-in")
    }
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black py-8 px-4">
      <main className="w-full max-w-5xl mx-auto space-y-8">
        {/* Header with Logout Button */}
        <div className="flex items-center justify-between">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          {isAuthenticated && (
            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={signOutMutation.isPending}
              className="gap-2">
              {signOutMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut className="h-4 w-4" />
                  Logout
                </>
              )}
            </Button>
          )}
        </div>

        {isAuthenticated && user ? (
          <>
            {/* User Info Section */}
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
                Welcome, {user.name}!
              </h1>
              <Card>
                <CardHeader>
                  <CardTitle>Account Details</CardTitle>
                  <CardDescription>Your authentication information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Name:
                    </span>
                    <span className="font-medium text-zinc-950 dark:text-zinc-50">
                      {user.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Email:
                    </span>
                    <span className="font-medium text-zinc-950 dark:text-zinc-50">
                      {user.email}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      User ID:
                    </span>
                    <span className="font-mono text-xs text-zinc-950 dark:text-zinc-50">
                      {user.id}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4 py-16">
            <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
              To get started, edit the page.tsx file.
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Looking for a starting point or more instructions? Head over to{" "}
              <a
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-zinc-950 dark:text-zinc-50">
                Templates
              </a>{" "}
              or the{" "}
              <a
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-zinc-950 dark:text-zinc-50">
                Learning
              </a>{" "}
              center.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
