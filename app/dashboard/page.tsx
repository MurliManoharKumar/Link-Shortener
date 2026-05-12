'use client'

import { RedirectToSignIn, Show } from '@clerk/nextjs'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Dashboard() {
  const [url, setUrl] = useState('')
  const [shortenedUrl, setShortenedUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [links, setLinks] = useState<Array<{original: string, short: string, created: Date}>>([])

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setIsLoading(true)
    // Mock shortening - in real app, call API
    setTimeout(() => {
      const mockShort = `https://linkshort.app/${Math.random().toString(36).substr(2, 6)}`
      const newLink = { original: url, short: mockShort, created: new Date() }
      setLinks(prev => [newLink, ...prev])
      setShortenedUrl(mockShort)
      setUrl('')
      setIsLoading(false)
    }, 1000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Could add toast notification here
  }

  return (
    <>
      <Show when="signed-in">
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <main className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              {/* Header Section */}
              <div className="mb-12 animate-slide-in-up">
                <h1 className="text-4xl font-bold text-white mb-2">
                  Welcome to your <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Dashboard</span>
                </h1>
                <p className="text-slate-400 text-lg">
                  Create and manage your shortened links with advanced analytics
                </p>
              </div>

              {/* Create Link Section */}
              <div className="mb-8 animate-slide-in-up animation-delay-100">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow" />
                  
                  <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 border border-slate-700/50 group-hover:border-slate-600/80 transition-all-smooth">
                    <h2 className="text-2xl font-bold text-white mb-6">Create New Short Link</h2>
                    <form onSubmit={handleShorten} className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <Input
                            type="url"
                            placeholder="Paste your long URL here... 🔗"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 text-lg transition-all-smooth"
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="h-12 px-8 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold transition-all-smooth hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 disabled:opacity-50 whitespace-nowrap"
                        >
                          {isLoading ? (
                            <span className="flex items-center gap-2">
                              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                              Creating...
                            </span>
                          ) : (
                            '⚡ Shorten'
                          )}
                        </Button>
                      </div>
                    </form>

                    {/* Result */}
                    {shortenedUrl && (
                      <div className="mt-6 animate-scale-in">
                        <div className="bg-gradient-to-br from-emerald-950 to-emerald-900/50 rounded-lg p-4 border border-emerald-500/30">
                          <p className="text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wider">✅ Link Created!</p>
                          <div className="flex items-center justify-between gap-3">
                            <code className="flex-1 bg-slate-800/80 rounded px-3 py-2 text-cyan-300 font-mono text-sm break-all select-all">
                              {shortenedUrl}
                            </code>
                            <Button
                              onClick={() => copyToClipboard(shortenedUrl)}
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all-smooth hover:scale-110 whitespace-nowrap"
                            >
                              📋 Copy
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Links History */}
              <div className="animate-slide-in-up animation-delay-200">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  
                  <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 border border-slate-700/50 group-hover:border-slate-600/80 transition-all-smooth">
                    <h2 className="text-2xl font-bold text-white mb-6">Your Links</h2>
                    {links.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-4xl mb-4">🔗</div>
                        <p className="text-slate-400 text-lg">No links created yet</p>
                        <p className="text-slate-500 text-sm mt-2">Start by creating your first short link above!</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {links.map((link, index) => (
                          <div 
                            key={index} 
                            className="group/item flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700/50 group-hover/item:border-slate-600 rounded-lg hover:bg-slate-800/80 transition-all-smooth"
                          >
                            <div className="flex-1 min-w-0">
                              <a 
                                href={link.short} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="font-mono text-sm text-blue-400 hover:text-blue-300 truncate transition-colors"
                              >
                                {link.short}
                              </a>
                              <p className="text-xs text-slate-400 truncate mt-1">
                                {link.original}
                              </p>
                              <p className="text-xs text-slate-500 mt-1">
                                Created {link.created.toLocaleDateString()}
                              </p>
                            </div>
                            <Button
                              onClick={() => copyToClipboard(link.short)}
                              size="sm"
                              className="ml-4 bg-purple-600/80 hover:bg-purple-500 text-white transition-all-smooth hover:scale-110 flex-shrink-0 whitespace-nowrap"
                            >
                              📋 Copy
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Show>
      <Show when="signed-out">
        <RedirectToSignIn />
      </Show>
    </>
  )
}
