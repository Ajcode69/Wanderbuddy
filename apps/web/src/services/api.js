const API_BASE = import.meta.env.VITE_API_URL || '';

/**
 * Generate a trip plan via the API.
 */
export async function generateTrip({ destination, days, preferences, description }) {
  const res = await fetch(`${API_BASE}/api/trips/plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ destination, days, preferences, description }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to generate trip');
  }

  return data;
}
