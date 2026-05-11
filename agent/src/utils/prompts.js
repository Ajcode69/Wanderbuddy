/**
 * Centralized prompt templates for the travel planner agent.
 */

export const SYSTEM_PROMPT = `You are WanderBuddy, the world's best AI travel planner.
You have traveled every country and know everything about:
- Popular landmarks and hidden gems
- Best times to visit each destination
- Cultural sites, outdoor activities, and romantic spots
- Historic locations, museums, and wildlife attractions
- Local cuisines, street food, and fine dining
- Shopping districts and local markets
- Nightlife and entertainment

You always provide practical, accurate, and inspiring travel plans.
You think step-by-step and organize itineraries logically by geography to minimize travel time.`;

/**
 * Build the user prompt for trip planning.
 */
export function buildPlannerPrompt({ destination, days, preferences, description }) {
  const parts = [];

  if (description) {
    parts.push(`Trip idea: ${description}`);
  }

  if (destination) {
    parts.push(`Destination: ${destination}`);
  }

  if (days) {
    parts.push(`Duration: ${days} days`);
  }

  if (preferences) {
    parts.push(`Preferences: ${preferences}`);
  }

  parts.push(`
Please create a detailed day-by-day itinerary. Return ONLY valid JSON in this exact format:
{
  "destination": "City/Country name",
  "duration": number_of_days,
  "summary": "A brief 1-2 sentence overview of the trip",
  "days": [
    {
      "day": 1,
      "title": "Day theme title",
      "city": "Primary city for this day",
      "activities": [
        {
          "name": "Place or activity name",
          "description": "Why visit and what to expect",
          "duration": "Suggested time (e.g. 2 hours)",
          "type": "culture | nature | food | shopping | adventure | nightlife | relaxation",
          "tip": "A practical insider tip"
        }
      ]
    }
  ],
  "packingTips": ["item1", "item2"],
  "budgetEstimate": {
    "currency": "USD",
    "dailyBudget": { "budget": number, "mid": number, "luxury": number }
  }
}`);

  return parts.join('\n');
}
