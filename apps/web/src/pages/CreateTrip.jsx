import { useState, useRef, useEffect } from 'react';
import CreateForm from '../components/CreateForm';
import ItineraryCard from '../components/ItineraryCard';
import ItineraryResult from '../components/ItineraryResult';
import { BlockRenderer } from '../components/genui';
import { useChat } from '../hooks/useChat';
import { generateTrip } from '../services/api';

const DEMO_CARDS = [
  { destination: 'Paris', duration: 5, tag: 'Family', rating: 4.4 },
  { destination: 'Bali', duration: 7, tag: 'Romance', rating: 4.7 },
  { destination: 'Tokyo', duration: 4, tag: 'Solo', rating: 4.6 },
  { destination: 'Switzerland', duration: 6, tag: 'Adventure', rating: 4.8 },
];

export default function CreateTrip() {
  const { messages, isLoading: isChatLoading, isActive, sendMessage, resetChat } = useChat();
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle form submission — starts chat or generates directly
  async function handleFormSubmit(payload) {
    // If description looks like a chat message, use chat mode
    if (payload.description) {
      sendMessage(payload.description);
    }
  }

  // Handle quick reply / action from a Gen UI block
  function handleAction(value) {
    if (value === 'generate') {
      handleSkipGenerate();
    } else {
      sendMessage(value);
    }
  }

  // Skip to direct generation — AI assumes the rest
  async function handleSkipGenerate() {
    setIsGenerating(true);
    setError(null);
    setResult(null);

    // Build a description from the conversation context
    const conversationContext = messages
      .filter((m) => m.role === 'user')
      .map((m) => m.content)
      .join('. ');

    try {
      const res = await generateTrip({
        destination: '',
        days: 3,
        description: conversationContext || 'Plan a great trip based on our conversation',
        preferences: '',
      });
      setResult(res.data?.itinerary || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  }

  // Reset everything
  function handleNewChat() {
    resetChat();
    setResult(null);
    setError(null);
  }

  const lastAssistantIdx = messages.findLastIndex((m) => m.role === 'assistant');

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Form section — always visible */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-4">
        <CreateForm onSubmit={handleFormSubmit} isLoading={isChatLoading || isGenerating} />
      </section>

      {/* Error */}
      {error && (
        <section className="max-w-4xl mx-auto px-6 pb-4">
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm animate-fade-in">
            ⚠️ {error}
          </div>
        </section>
      )}

      {/* Chat conversation — appears when active, replaces demo cards */}
      {isActive && !result && (
        <section className="max-w-4xl mx-auto px-6 pb-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl shadow-brand-100/30 p-6 md:p-8">
            {/* Chat header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center shadow-md shadow-brand-500/20">
                  <span className="text-white text-sm font-bold">W</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">WanderBuddy</h3>
                  <p className="text-[11px] text-slate-400">
                    {isChatLoading ? (
                      <span className="flex items-center gap-1">
                        <span className="inline-flex gap-0.5">
                          <span className="w-1 h-1 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1 h-1 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1 h-1 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </span>
                        Thinking...
                      </span>
                    ) : 'Online'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleNewChat}
                className="text-xs text-slate-400 hover:text-brand-600 transition-colors font-medium px-3 py-1.5 rounded-lg hover:bg-brand-50"
              >
                ↻ New Chat
              </button>
            </div>

            {/* Messages */}
            <div className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin">
              {messages.map((msg, msgIdx) => {
                if (msg.role === 'user') {
                  return (
                    <div key={msg.id} className="flex justify-end animate-slide-up">
                      <div className="bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[85%] shadow-md shadow-brand-500/20">
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  );
                }

                // Assistant message — render blocks
                const isLastAssistant = msgIdx === lastAssistantIdx;
                return (
                  <div key={msg.id} className="space-y-3">
                    {msg.blocks?.map((block, blockIdx) => (
                      <BlockRenderer
                        key={block.id || `${msg.id}-${blockIdx}`}
                        block={{ ...block, _index: blockIdx }}
                        onAction={handleAction}
                        isLast={isLastAssistant && !isChatLoading}
                      />
                    ))}
                  </div>
                );
              })}

              {/* Loading indicator */}
              {isChatLoading && (
                <div className="flex gap-2.5 items-start animate-fade-in">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-500/20">
                    <span className="text-white text-xs font-bold">W</span>
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Skip to Generate button */}
            {messages.length >= 2 && !isGenerating && (
              <div className="flex justify-center pt-2 border-t border-slate-100">
                <button
                  onClick={handleSkipGenerate}
                  className="mt-3 px-6 py-2.5 bg-gradient-to-r from-brand-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-brand-700 hover:to-purple-700 transition-all shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 active:scale-[0.97] flex items-center gap-2"
                >
                  ⚡ Skip to Generation
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Generating indicator */}
      {isGenerating && (
        <section className="max-w-4xl mx-auto px-6 pb-6">
          <div className="bg-white rounded-2xl shadow-xl shadow-brand-100/50 border border-slate-200/60 p-8 text-center animate-pulse">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
              <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            </div>
            <p className="text-slate-600 font-medium">Generating your perfect itinerary...</p>
            <p className="text-slate-400 text-sm mt-1">This may take a few seconds</p>
          </div>
        </section>
      )}

      {/* Generated result */}
      {result && (
        <section className="max-w-4xl mx-auto px-6 pb-12">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleNewChat}
              className="text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
            >
              ← Start New Trip
            </button>
          </div>
          <ItineraryResult itinerary={result} />
        </section>
      )}

      {/* Demo AI itineraries — hidden when chat is active */}
      {!isActive && !result && (
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">AI Itineraries</h2>
            <a href="#" className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
              View All →
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {DEMO_CARDS.map((card) => (
              <ItineraryCard key={card.destination} {...card} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
