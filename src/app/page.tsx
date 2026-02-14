'use client'

import { useState } from 'react'
import { useTheme } from './components/ThemeProvider'
import ImprintModal from './components/ImprintModal'

const FLOATING_GIFS = [
  {
    src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDZmcWlycTd6c2Y2OHhieDJqeG1va3BiN3UzNXZ2YXFwNmxiMmNucCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/naXyAp2VYMR4k/giphy.gif",
    alt: "Spinning gif",
    className: "absolute -top-4 -right-16 md:-right-24 border-4 border-double border-green-400 rounded-lg overflow-hidden w-20 h-20 md:w-28 md:h-28 z-5",
    style: { animation: 'spin 3s linear infinite' }
  },
  {
    src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHc3NGQ2NXV0NWZ4bjBwY3JlMWxyaWR0ZmZ2NDMxZXV5MG4yc21wNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/111ebonMs90YLu/giphy.gif",
    alt: "Retro rainbow",
    className: "absolute top-16 -left-16 md:-left-24 border-4 border-double border-lime-400 rounded-lg overflow-hidden transform -rotate-2 animate-pulse w-22 h-22 md:w-32 md:h-32 z-5"
  },
  {
    src: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cjlzcjB6MXJwbWZsOHZqODVkemkyYWJ0bGxraHd3NHdodmNqNjAxciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dpSrm4cwUmCeQ/giphy.gif",
    alt: "Static gif",
    className: "absolute top-72 -right-14 md:-right-20 border-4 border-double border-blue-400 rounded-lg overflow-hidden transform -rotate-12 w-20 h-20 md:w-26 md:h-26 z-5"
  },
  {
    src: "https://media.giphy.com/media/LPkQ0Vna9XoUJFQ1nN/giphy.gif",
    alt: "Retro phone",
    className: "absolute bottom-32 -left-14 md:-left-20 border-4 border-double border-pink-400 rounded-lg overflow-hidden transform rotate-12 w-20 h-20 md:w-26 md:h-26 z-5"
  },
  {
    src: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3czk2MWc4N2Z4ZTQwODAzMW5ib3V6czB0NGt4Nms0OGFhZThzeDcxdSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/AAsj7jdrHjtp6/giphy.gif",
    alt: "Retro dancing",
    className: "absolute -bottom-16 -right-44 md:-right-60 border-4 border-double border-cyan-400 rounded-lg overflow-hidden transform rotate-6 w-22 h-22 md:w-30 md:h-30 z-5"
  }
]

const FLOATING_EMOJIS = [
  { emoji: "💫", className: "absolute top-8 -left-8 md:-left-12 text-3xl md:text-5xl animate-spin z-5" },
  { emoji: "✨", className: "absolute top-48 -right-8 md:-right-12 text-3xl md:text-5xl animate-bounce z-5" },
  { emoji: "🌈", className: "absolute bottom-16 left-4 md:left-8 text-3xl md:text-5xl animate-pulse z-5" },
  { emoji: "⭐", className: "absolute top-96 -right-6 md:-right-10 text-2xl md:text-4xl animate-ping z-5" }
]

const LENS_FLARES = [
  { className: "absolute top-12 right-12 w-32 h-32 bg-white rounded-full opacity-80 blur-xl animate-pulse" },
  { className: "absolute top-16 right-16 w-16 h-16 bg-yellow-200 rounded-full opacity-60 blur-lg animate-pulse" },
  { className: "absolute top-20 right-20 w-8 h-8 bg-cyan-200 rounded-full opacity-40 blur-md animate-pulse" },
  { className: "absolute top-8 right-32 w-4 h-4 bg-pink-200 rounded-full opacity-30 blur-sm animate-bounce" },
  { className: "absolute top-24 right-40 w-2 h-2 bg-lime-200 rounded-full opacity-20 animate-ping" }
]

const getContentSections = (isFunMode: boolean, linkStyles: string) => {
  return [
    {
      title: "Selected Projects",
      titleColor: "text-yellow-300",
      content: (
        <p>
          My experience spans both reporting and technology, contributing to major international 
          investigations while coordinating data work across distributed newsrooms. I was part 
          of the investigative team at NDR when we broke the{' '}
          <a href="https://www.icij.org/investigations/panama-papers/" className={linkStyles}>Panama Papers</a>, {' '}
          <a href="https://www.icij.org/investigations/luxembourg-leaks/" className={linkStyles}>Luxembourg Leaks</a> and other groundbreaking investigations. From there I moved on to 
          co-lead the Research and Data team at the OCCRP, contributing to the{' '}
          <a href="https://www.occrp.org/en/project/suisse-secrets" className={linkStyles}>Suisse Secrets</a> project, the{' '}
          <a href="https://www.occrp.org/en/project/russian-asset-tracker" className={linkStyles}>Russian Asset Tracker</a>, and many more projects. 
          Today, at DARC, I help expand and maintain open-source tools such as{' '}
          <a href="https://www.openaleph.org" className={linkStyles}>OpenAleph</a> and the{' '}
          <a href="https://dataresearchcenter.org/library" className={linkStyles}>FtM Data Library</a>, 
          making investigative data infrastructure accessible to newsrooms of all sizes. Together 
          with my colleagues I write occasional{' '}
          <a href="https://dataresearchcenter.org/blog/" className={linkStyles}>blog posts</a>{' '}
          about the details of our work.
        </p>
      )
    },
    {
      title: "Away from the Desk", 
      titleColor: "text-pink-300",
      content: (
        <p>
          Outside journalism, I'm a long distance triathlete and spend hours riding my bike 
          through the countryside. I run a bike repair club at{' '}
          <a href="https://workish.berlin/fablab" className={linkStyles}>FabLab Neukölln</a>{' '}
          in Berlin, where we restore bicycles and teach practical repair skills. Languages 
          continue to fascinate me: I studied in Ankara and am currently working on my Chinese streak in the Duolingo app. 
          Lately, I've been experimenting with fermentation: homemade pickles, mustard from scratch, 
          and anything else that rewards patience.
        </p>
      )
    },
    {
      title: "Connect",
      titleColor: "text-lime-300", 
      content: (
        <p>
          For professional conversations, find me on{' '}
          <a href="https://linkedin.com/in/jlstro" className={linkStyles}>
            LinkedIn
          </a>. You can browse my code on{' '}
          <a href="https://github.com/jlstro" className={linkStyles}>
            GitHub
          </a>{' '}
          or subscribe to my newsletter{' '}
          <a href="https://buttondown.com/readwrite" className={linkStyles}>
            Read/Write
          </a>{' '}
          for reflections on journalism and technology. I'm @jlstro on most platforms - 
          happy to talk about investigations, bikes, fermentation, or anything in between.
        </p>
      )
    }
  ]
}

export default function Home() {
  const { theme } = useTheme()
  const isFunMode = theme === 'fun'
  const [imprintOpen, setImprintOpen] = useState(false)

  const linkStyles = isFunMode 
    ? "bg-cyan-400 hover:bg-cyan-300 text-black px-2 py-1 rounded hover:underline transition-colors font-black"
    : "bg-pink-200 hover:bg-pink-300 text-black px-2 py-1 rounded hover:underline transition-colors"

  const mainStyles = isFunMode 
    ? 'bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 overflow-hidden'
    : 'bg-white dark:bg-gray-900'
    
  const titleStyles = isFunMode ? {
    textShadow: '4px 4px 0px #ff00ff, 8px 8px 0px #00ffff, 12px 12px 0px #ffff00',
    background: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff, #ffff00, #ff00ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'blink 0.5s infinite alternate'
  } : {}

  const contentStyles = isFunMode ? {
    borderImage: 'linear-gradient(45deg, #ff0080, #00ff80, #8000ff) 1',
    textShadow: '2px 2px 0px #ff00ff',
    background: 'radial-gradient(circle, rgba(255,0,255,0.3), rgba(0,255,255,0.3), rgba(255,255,0,0.3))'
  } : {}

  return (
    <main 
      className={`min-h-screen transition-all duration-500 relative ${mainStyles}`}
      style={isFunMode ? { fontFamily: 'Comic Sans MS, cursive, fantasy' } : {}}
    >
      {/* Lens flare effects for fun mode */}
      {isFunMode && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          {LENS_FLARES.map((flare, index) => (
            <div key={index} className={flare.className} />
          ))}
        </div>
      )}
      
      <div className="max-w-2xl mx-auto px-6 py-24 leading-relaxed relative z-10">
        <div className="space-y-12 relative">
          {/* Floating decorative elements for fun mode */}
          {isFunMode && (
            <>
              {FLOATING_GIFS.map((gif, index) => (
                <div key={index} className={gif.className} style={gif.style}>
                  <img src={gif.src} alt={gif.alt} className="w-full h-full object-cover" />
                </div>
              ))}
              {FLOATING_EMOJIS.map((emoji, index) => (
                <div key={index} className={emoji.className}>
                  {emoji.emoji}
                </div>
              ))}
            </>
          )}

          {/* Main title */}
          <div className="text-center">
            <h1 
              className={`text-4xl md:text-6xl mb-4 ${
                isFunMode 
                  ? 'text-white animate-bounce font-black text-shadow-2xl transform md:rotate-1' 
                  : 'text-gray-800 dark:text-white font-normal'
              }`} 
              style={titleStyles}
            >
              {isFunMode ? '🔥💀 JAN STROZYK 💀🔥' : 'Jan Strozyk'}
            </h1>
          </div>

          {/* Main content */}
          <div 
            className={`text-lg md:text-xl leading-8 ${
              isFunMode 
                ? 'text-lime-300 font-black bg-black bg-opacity-80 p-6 md:p-8 rounded-3xl border-8 border-double border-hot-pink shadow-2xl transform md:-rotate-1' 
                : 'text-gray-700 dark:text-gray-300'
            }`} 
            style={contentStyles}
          >
            <p className="mb-6">
              I'm Director of Data & Journalism Projects at the{' '}
              <a href="https://www.dataresearchcenter.org" className={linkStyles}>Data and Research Center</a> (DARC), where 
              we design tooling and provide research that enable investigative teams to get 
              the most out of complex stories.
            </p>
            
            <p className="mb-6">
              Trained as a journalist, I began in traditional newsrooms before gradually moving 
              into technical roles. Over time, my work shifted toward the infrastructure behind 
              investigations: the data pipelines, search systems, and collaboration tools that 
              make ambitious cross-border reporting possible.
            </p>
          </div>

          {/* Content sections */}
          <div className="space-y-8">
            {getContentSections(isFunMode, linkStyles).map((section, index) => (
              <div key={index}>
                <h2 className={`text-lg font-medium mb-3 ${
                  isFunMode ? section.titleColor : 'text-gray-800 dark:text-white'
                }`}>
                  {section.title}
                </h2>
                <div className={`${
                  isFunMode ? 'text-white font-bold' : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer with imprint link */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <button
            onClick={() => setImprintOpen(true)}
            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            Legal Notice
          </button>
        </div>
      </div>

      <ImprintModal 
        isOpen={imprintOpen} 
        onClose={() => setImprintOpen(false)} 
      />
    </main>
  )
}