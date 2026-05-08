# 🚀 Dynamic Dashboard Rendering Engine

A **schema-driven**, highly extensible React engine designed for performance-first dashboard orchestration. This project demonstrates a **decoupled architecture** where the UI layout, data flow, and component logic are strictly separated.

---

#### The app is deployed on : https://superfans-assignment.vercel.app/

## 🏗️ Setup and Execution
### 1. Installation
Clone the repository and install the necessary dependencies:
```bash
npm install
```
### 2. Environment Configuration
Ensure your environment is set up to handle the TypeScript and Tailwind CSS pipeline:

TypeScript Node Types: Install @types/node to resolve configuration paths for Vite:

```bash
npm install -D @types/node
```

Tailwind Initialization: If styles are not applying, sync the PostCSS pipeline:
```bash
npx tailwindcss init -p
```

### 3. Running the Project
Start the development server with Vite:

```bash
npm run dev
```
The dashboard will be available at http://localhost:5173.


## 🏗️ Design Decisions

### 1. Registry-Based Component Resolution
The engine utilizes a **Registry Pattern** to decouple the rendering core from the widget library.
* **Scalability:** New widgets are onboarded by simply updating the `WidgetRegistry`. The core `DashboardRenderer` remains **Open/Closed** (Open for extension, Closed for modification).
* **Resilience:** Built-in **Graceful Degradation** ensures that unrecognized widget types render an `UnknownWidget` fallback rather than triggering a runtime crash.

### 2. Reactive Data Orchestration (Pub/Sub)
Instead of traditional prop-drilling, this engine implements a **Schema-Driven Subscription Model** via React Context.
* **Declarative Dependencies:** Widgets declare their data needs in the JSON schema using the `listeningTo` attribute.
* **Decoupled Communication:** A `DateRangeSelector` (**Publisher**) updates the central state, and the engine automatically "pipes" that data into any `RevenueChart` (**Subscriber**) that has opted-in.
* **No Side-Effects:** Widgets remain pure; they consume standardized props and emit changes through a unified `onEmit` interface.

### 3. Performance & Memoization Strategy
Engineered to minimize the performance overhead inherent in global state updates:
* **Selective Re-renders:** The `WidgetWrapper` acts as a **memoization boundary**. It extracts only relevant dependencies, ensuring widgets only re-render if their specific "subscribed" data changes.
* **Efficient Computation:** Expensive operations, such as **Recharts** data transformations and date range calculations, are wrapped in `useMemo` to prevent redundant processing.

---

## 🛠️ Tech Stack & Patterns

| Category | Technology / Pattern |
| :--- | :--- |
| **Core** | React 18, TypeScript (Strict Mode) |
| **Visuals** | Recharts (Area/Line), Tailwind CSS |
| **Layout** | 12-Column Dynamic CSS Grid |
| **Patterns** | Registry Pattern, Observer (Pub/Sub) Pattern, Adapter Pattern |

---

## 📖 Schema Definition
The entire dashboard is a **data-driven entity**. A simple JSON update can reconfigure the entire layout and logic without a single code deployment:

```json
{
  "id": "w_chart_1",
  "type": "REVENUE_CHART",
  "layout": { "w": 12 },
  "listeningTo": ["w_date_1"],
  "properties": { 
    "title": "Revenue Forecast" 
  }
}