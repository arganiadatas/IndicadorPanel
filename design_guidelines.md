# Design Guidelines: Economic Dashboard (Panel de Indicadores Económicos)

## Design Approach
**Selected System**: Material Design with Financial Dashboard Patterns
**Justification**: Data-heavy application requiring clarity, efficiency, and professional aesthetics. Drawing inspiration from TradingView's UI, Bloomberg Terminal, and analytics platforms like Google Analytics for optimal data presentation.

**Core Principles**:
- Data clarity over decoration
- Scannable information hierarchy
- Professional, trustworthy appearance
- Efficient interaction patterns

## Typography

**Primary Font**: Inter (via Google Fonts CDN)
**Secondary Font**: Roboto Mono (for numerical data)

**Hierarchy**:
- Page Title: Inter, 32px, 700 weight
- Card Titles: Inter, 18px, 600 weight
- Numerical Values: Roboto Mono, 24px, 500 weight (for primary metrics)
- Labels/Descriptions: Inter, 14px, 400 weight
- Modal Title: Inter, 28px, 600 weight
- Modal Description: Inter, 16px, 400 weight, 1.6 line-height

## Layout System

**Spacing Units**: Tailwind primitives of 4, 6, 8, 12, and 16 (e.g., p-4, gap-6, m-8)

**Container**:
- Max-width: max-w-7xl
- Horizontal padding: px-6 on mobile, px-8 on desktop
- Vertical padding: py-8 on mobile, py-12 on desktop

**Grid Layout**:
- Mobile: Single column (grid-cols-1)
- Tablet: 2 columns (md:grid-cols-2)
- Desktop: 3 columns (lg:grid-cols-3)
- Gap between cards: gap-6

**Card Dimensions**:
- Minimum height: Flexible based on content
- Aspect ratio consideration: Maintain consistent heights within rows
- Padding: p-6 for card content
- Border radius: rounded-lg

## Component Library

### Indicator Cards (Primary Component)
**Structure**:
- Header section with indicator title and current value
- Chart area (minimum height ~200px for mini preview)
- Subtle trend indicator (up/down arrow with percentage)
- Hover state: Subtle elevation increase (shadow transition)
- Click target: Entire card is clickable

**Card Styling**:
- Background: Solid panel background
- Border: 1px solid border
- Shadow: Subtle elevation (shadow-sm default, shadow-md on hover)
- Cursor: pointer on hover
- Transition: all 200ms ease for smooth interactions

### Modal/Expanded View
**Layout**:
- Overlay: Full viewport with backdrop
- Modal container: max-w-4xl centered
- Padding: p-8
- Border radius: rounded-xl

**Content Structure**:
- Close button: Top-right corner with X icon (Material Icons or Heroicons)
- Title section: Large indicator name + current value
- Expanded chart area: Minimum height 400px for detailed view
- Description section: Full text below chart with generous line-height
- Clear visual separation between sections using spacing (mb-6, mb-8)

### Chart Integration
**TradingView Lightweight Charts Configuration**:
- Chart height in cards: 200px
- Chart height in modal: 400px
- Clean, minimal chrome (hide unnecessary UI elements)
- Price axis on right
- Time axis on bottom
- Responsive chart sizing

### Navigation/Header
**Structure**:
- Fixed or sticky header at top
- Dashboard title prominently displayed
- Optional: Last updated timestamp
- Optional: Refresh button or indicator
- Height: h-16 or h-20

### Icons
**Library**: Heroicons (via CDN)
**Usage**:
- Trend indicators (arrow-up, arrow-down)
- Close button in modal (x-mark)
- Refresh/update indicators
- Sparingly used, only when they add clarity

## Interactions & States

### Card Interactions
- Hover: Elevation increase (shadow transition)
- Click: Opens modal with expanded view
- Focus: Keyboard accessible with visible focus ring

### Modal Behavior
- Opens: Smooth fade-in with backdrop (transition 200ms)
- Close triggers: X button, ESC key, click outside
- Closes: Smooth fade-out
- Prevents body scroll when open

### Chart Interactivity
- Tooltips on hover showing exact values
- Crosshair for precise data reading
- No zoom/pan in card view (keep simple)
- Full interactivity in modal view

## Responsive Behavior

**Mobile (< 768px)**:
- Single column grid
- Slightly reduced card padding (p-4)
- Modal uses nearly full viewport (max-w-full with mx-4)
- Chart heights slightly reduced if needed

**Tablet (768px - 1024px)**:
- 2-column grid
- Standard card padding
- Modal at max-w-3xl

**Desktop (> 1024px)**:
- 3-column grid
- Full component specifications
- Modal at max-w-4xl

## Data Visualization Principles

**Chart Aesthetics**:
- Clean grid lines (subtle, not distracting)
- Appropriate axis labels
- Consistent line widths
- Professional chart styling aligned with TradingView defaults

**Numerical Display**:
- Large, readable values using Roboto Mono
- Thousand separators for clarity (e.g., 1,234.56)
- Appropriate decimal places per indicator type
- Clear positive/negative indicators

## Special Considerations

**Performance**:
- Lazy load charts if needed
- Smooth modal transitions without jank
- Efficient chart rendering

**Accessibility**:
- All interactive elements keyboard accessible
- Proper focus management in modal
- ARIA labels for screen readers
- Sufficient contrast for all text

**Data Updates**:
- Clear visual indication when data is stale
- Smooth transitions when values update
- No jarring reflows

This dashboard prioritizes data clarity, professional presentation, and efficient navigation through economic indicators. The design balances information density with readability, creating a trustworthy tool for monitoring economic metrics.