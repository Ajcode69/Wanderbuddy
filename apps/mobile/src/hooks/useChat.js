import { useState, useCallback } from 'react';

const API_URL = 'http://localhost:4000';

/**
 * useChat — manages Gen UI chat state for mobile.
 *
 * Stores message history in React state (no persistence).
 * Sends full history to POST /api/trips/chat and receives UI blocks back.
 */
export function useChat() {
  const [messages, setMessages] = useState([]); // { id, role, content, blocks? }
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    if (!isActive) setIsActive(true);

    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      const apiMessages = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.role === 'assistant' ? JSON.stringify(m.blocks || m.content) : m.content,
      }));

      const res = await fetch(`${API_URL}/api/trips/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || 'Chat request failed');
      }

      const blocks = data.data?.blocks || [];

      const assistantMsg = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: blocks.map((b) => b.content || '').join(' '),
        blocks,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setError(err.message);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: err.message,
          blocks: [{ type: 'text', content: `⚠️ ${err.message}` }],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isActive]);

  const resetChat = useCallback(() => {
    setMessages([]);
    setIsActive(false);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    messages,
    isLoading,
    isActive,
    error,
    sendMessage,
    resetChat,
  };
}
