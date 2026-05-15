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
 * BlockRenderer — maps a Gen UI block's `type` to the appropriate component.
 * Falls back to TextBlock for unknown types.
 */
export default function BlockRenderer({ block, onAction, isLast }) {
  const Component = COMPONENT_MAP[block.type] || TextBlock;

  // For unknown types, convert to text
  const props =
    block.type in COMPONENT_MAP
      ? block
      : { ...block, content: block.content || JSON.stringify(block) };

  return (
    <div className="genui-block animate-slide-up" style={{ animationDelay: `${(block._index || 0) * 80}ms` }}>
      <Component {...props} onAction={onAction} isLast={isLast} />
    </div>
  );
}
