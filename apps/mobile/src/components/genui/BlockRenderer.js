import React from 'react';
import TextBlock from './TextBlock';
import QuickReplies from './QuickReplies';
import DestinationCard from './DestinationCard';
import BudgetCard from './BudgetCard';
import Checklist from './Checklist';
import ItineraryDayCard from './ItineraryDayCard';

const COMPONENT_MAP = {
  text: TextBlock,
  quick_replies: QuickReplies,
  destination_card: DestinationCard,
  budget_card: BudgetCard,
  checklist: Checklist,
  itinerary_day: ItineraryDayCard,
};

/**
 * BlockRenderer — maps a Gen UI block's `type` to the appropriate RN component.
 * Falls back to TextBlock for unknown types.
 */
export default function BlockRenderer({ block, onAction, isLast }) {
  const Component = COMPONENT_MAP[block.type] || TextBlock;

  const props =
    block.type in COMPONENT_MAP
      ? block
      : { ...block, content: block.content || JSON.stringify(block) };

  return <Component {...props} onAction={onAction} isLast={isLast} />;
}
