# Dynamic Dashboard Rendering Engine

## Architectural Highlights

### 1. Registry Pattern (Scalability)

The engine decouples the rendering logic from widget implementation. Adding a new widget requires no changes to the `DashboardRenderer`; you simply add the component to the `WidgetRegistry`. This follows the Open/Closed Principle.

### 2. Event-Driven Inter-Widget Communication

Using a **Publisher/Subscriber** model via React Context, widgets communicate without tight coupling.

- `DateRangeSelector` publishes state updates to the `DashboardContext`.
- `RevenueChart` subscribes to these updates through the `listeningTo` configuration array.
- This prevents prop-drilling and ensures each widget remains a standalone unit.

### 3. Resilient Error Handling

If the JSON configuration specifies a widget type that does not exist in the Registry, the engine catches this and renders an `UnknownWidget` fallback rather than crashing the entire dashboard.

### 4. Optimized Re-renders

By using a scoped `DashboardProvider` and passing selective `subscribedData` to wrappers, we ensure that only widgets actually listening to a specific state change will trigger a re-render.
