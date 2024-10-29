import { useState } from 'react'
import { Button } from "../@/components/ui/button"
import { Input } from "../@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../@/components/ui/card"

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
  }

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle verification logic
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1a1a1a]">
      <Card className="w-[350px] bg-[#1e1e1e] border-[#333333] border">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl text-white">
            Welcome to Mind<span className="text-orange-500">Train</span>
          </CardTitle>
          <p className="text-sm text-gray-400">
            Train your mind, transform your life
          </p>
        </CardHeader>
        <CardContent>
          {!isVerifying ? (
            <form onSubmit={handleEmailSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-[#2a2a2a] border-[#333333] text-gray-200 placeholder:text-gray-500"
                  />
                </div>
              </div>
              <Button 
                className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                type="submit"
              >
                Send Verification Code
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerificationSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="verificationCode"
                    placeholder="Enter verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                    className="bg-[#2a2a2a] border-[#333333] text-gray-200 placeholder:text-gray-500"
                  />
                </div>
              </div>
              <Button 
                className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                type="submit"
              >
                Verify and Log In
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}