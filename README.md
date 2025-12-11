# Tour Analytics Dashboard

A full-featured dashboard for managing and analyzing interactive tours on your website. Built with Next.js, React, Tailwind CSS, and Convex for real-time data handling.

## Features

- **Tour Overview**: View tour title, total views, completion rate, and additional metrics.
- **Step Analytics**: Track user progress per step and see completion percentages.
- **Interactive Charts**: Line chart showing started, completed, and skipped steps.
- **Widget Integration**: Copy-ready script snippet to embed the tour widget on any page.
- **Editable Tours**: Edit tour details and steps via a simple interface.

## Tech Stack

- Frontend: Next.js + React + Tailwind CSS
- Backend: Convex (real-time database & serverless functions)
- Charts: Recharts
- State & Data Fetching: Convex React hooks

## Setup

1. Clone the repository:
```bash
git clone https://github.com/Toluwaa-o/tourbridgeJs.git
cd tourbridgeJs
````

2. Install dependencies:

```bash
npm install
```

3. Configure Convex:

```bash
# Set dev deployment URL
export CONVEX_URL=dev:<your-dev-deployment-id>
```

4. Start development server:

```bash
npm run dev
```

5. Visit `http://localhost:3000` to view the dashboard.

## Usage

* The main page shows the tour overview, metrics, and analytics charts.
* Use the **Widget Script** card to copy the embed code for any tour.
* Steps are automatically tracked via the widget using Convex mutations.
* Metrics update in real-time based on user interactions.