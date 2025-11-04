import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-teal-600" />
          </div>
          <CardTitle className="text-3xl font-bold">You're on the List!</CardTitle>
          <CardDescription className="text-lg">
            Thank you for joining the movement. We'll notify you as soon as we launch.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            In the meantime, learn more about how MOMM is changing commerce for good.
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/about">
              <Button variant="outline" className="w-full bg-transparent">
                Learn About MOMM
              </Button>
            </Link>
            <Link href="/contributors">
              <Button variant="outline" className="w-full bg-transparent">
                Become a Contributor
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
