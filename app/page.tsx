'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [shortenedUrl, setShortenedUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Redirect logged-in users to dashboard after auth state loads
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard')
    }
  }, [isLoaded, isSignedIn, router])

  // Wait for auth to resolve before rendering the homepage
  if (!isLoaded) {
    return null
  }

  if (isSignedIn) {
    return null
  }

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setIsLoading(true)
    // Mock shortening - in real app, call API
    setTimeout(() => {
      const mockShort = `https://linkshort.app/${Math.random().toString(36).substr(2, 6)}`
      setShortenedUrl(mockShort)
      setIsLoading(false)
    }, 1000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl)
    // Could add toast notification here
  }

  return (
    <div className="flex flex-col flex-1 dark">
      {/* Hero Section - Dark Theme */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen flex items-center">
        {/* Animated background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-600/30 to-transparent rounded-full mix-blend-screen filter blur-3xl animate-float dark:opacity-20 opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-600/30 to-transparent rounded-full mix-blend-screen filter blur-3xl animate-float animation-delay-300 dark:opacity-20 opacity-30" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow" />
        
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-slate-700/25 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        
        <div className="relative container mx-auto px-4 py-24 sm:py-32 z-10">
          <div className="mx-auto max-w-5xl">
            {/* Top Badge */}
            <div className="flex justify-center mb-8 animate-slide-in-down">
              <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 backdrop-blur-md hover:border-blue-400/60 transition-all-smooth group">
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-cyan-300">✨ Launch Your Links Into The Cloud</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="text-center space-y-6 animate-slide-in-up">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block text-white">Make Your Links</span>
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse-slow">
                  Short, Smart & Shareable
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Transform long URLs into powerful short links with advanced analytics, custom branding, and enterprise-grade security. Perfect for marketing, social media, and more.
              </p>
            </div>

            {/* URL Shortener Form - Enhanced */}
            <div className="mt-12 max-w-2xl mx-auto animate-slide-in-up animation-delay-200">
              <form onSubmit={handleShorten} className="group relative">
                {/* Glowing border effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow" />
                
                <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-xl p-2 border border-slate-700/50 group-hover:border-slate-600/80 transition-all-smooth flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Input
                      type="url"
                      placeholder="Paste your long URL here... 🔗"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="h-14 bg-slate-800/50 border-0 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:bg-slate-800/80 transition-all-smooth text-lg"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-14 px-8 sm:px-12 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 text-white font-bold transition-all-smooth duration-300 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 whitespace-nowrap"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Creating...
                      </span>
                    ) : (
                      '⚡ Shorten URL'
                    )}
                  </Button>
                </div>
              </form>

              {/* Result Card - Enhanced */}
              {shortenedUrl && (
                <div className="mt-8 animate-scale-in">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-emerald-500/30 group-hover:border-emerald-400/60 transition-all-smooth">
                      <div className="flex items-start gap-4">
                        <div className="text-3xl animate-bounce flex-shrink-0">🎉</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-emerald-400 mb-3 uppercase tracking-wider">Success! Your Link is Ready</p>
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <code className="flex-1 bg-slate-800/80 border border-slate-700/50 rounded-lg px-4 py-3 text-cyan-300 font-mono text-sm break-all select-all hover:border-slate-600 transition-colors overflow-auto">
                              {shortenedUrl}
                            </code>
                            <Button
                              onClick={copyToClipboard}
                              className="px-6 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold transition-all-smooth hover:shadow-lg hover:shadow-emerald-500/30 whitespace-nowrap"
                            >
                              📋 Copy Link
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stats Section */}
            <div className="mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
              {[
                { label: 'Active Links', value: '2.4M+' },
                { label: 'Daily Shortens', value: '50K+' },
                { label: 'Success Rate', value: '99.9%' }
              ].map((stat, i) => (
                <div key={i} className="text-center group animate-slide-in-up" style={{animationDelay: `${300 + i * 100}ms`}}>
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-cyan-300 transition-all-smooth">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-2 group-hover:text-slate-300 transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Dark & Impressive */}
      <section className="py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-3xl animate-float" />
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-3xl animate-float animation-delay-400" />
        </div>

        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center mb-20 animate-slide-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">LinkShort?</span>
            </h2>
            <p className="text-lg text-slate-400">
              Packed with powerful features designed for modern link management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: '⚡', 
                title: 'Lightning Fast', 
                desc: 'Shorten URLs in milliseconds with our optimized global infrastructure',
                delay: '100'
              },
              { 
                icon: '🔒', 
                title: 'Enterprise Security', 
                desc: 'Bank-grade encryption and security protocols protect all your links',
                delay: '200'
              },
              { 
                icon: '📊', 
                title: 'Advanced Analytics', 
                desc: 'Real-time tracking with detailed insights about every click',
                delay: '300'
              },
              { 
                icon: '🎨', 
                title: 'Custom Branding', 
                desc: 'Use your own domain and brand your shortened URLs professionally',
                delay: '400'
              },
              { 
                icon: '🌍', 
                title: 'Global Scale', 
                desc: 'Serve millions of requests from 200+ countries worldwide',
                delay: '500'
              },
              { 
                icon: '🤝', 
                title: 'Team Collaboration', 
                desc: 'Share links with team members and manage permissions easily',
                delay: '600'
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="group animate-slide-in-up" 
                style={{animationDelay: `${feature.delay}ms`}}
              >
                <div className="relative h-full">
                  {/* Animated gradient border on hover */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 border border-slate-700/50 group-hover:border-slate-600 transition-all-smooth">
                    <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300 inline-block">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-grid-slate-700/25" />
        </div>

        <div className="relative container mx-auto px-4 text-center max-w-2xl z-10 animate-slide-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Links?
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Join thousands of professionals using LinkShort to create smarter, more powerful links.
          </p>
          <Button className="px-12 py-3 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-lg transition-all-smooth hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-110">
            Get Started Free →
          </Button>
        </div>
      </section>
    </div>
  )
}
