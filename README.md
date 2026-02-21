# Reporting Screen

## Tech Stack

- **Core:** React 18, TypeScript, Vite
- **State Management & Data Fetching:** Redux Toolkit (RTK Query)
- **UI Framework:** Material UI (MUI)
- **Performance Optimizations:** `react-window` (virtualized dropdown lists), MUI Table Pagination
- **Charting:** MUI X Charts (`@mui/x-charts`)
- **Date Handling:** Day.js

## How to Run the Project Locally

### 1. Clone the repository and install dependencies

```bash
git clone
cd reporting-screen
npm install

```

### 2. Configure Environment Variables

To securely connect to the API, you must provide the required API credentials.

1. In the root directory of the project (next to `package.json`), you will find a file named `.env.example`.
2. Duplicate this file and rename the copy to `.env`.
3. Open the new `.env` file and replace the placeholder values with the API Key and Secret provided in the assignment instructions:

```env
VITE_SIGN_IN_API_KEY=insert_api_key_here
VITE_SIGN_IN_API_SECRET=insert_api_secret_here
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.
_(Note: The Vite dev server is configured with `vite-plugin-mkcert` to proxy requests and handle CORS)._

---

## Assumptions & Technical Decisions

- **UI Library Choice (Material UI):** I chose MUI for this time-boxed assignment because it allows for rapid prototyping without sacrificing a clean, professional, and accessible design. Since the task required complex inputs (Date Pickers), tables, and charts, leveraging the MUI ecosystem (including `@mui/x-date-pickers` and `@mui/x-charts`) ensured visual consistency and saved valuable development time that I could redirect toward complex filter logic and performance optimizations.

* **Filter State Logic :** I designed the filter logic to mirror the exact behavior of the production Early app. By default, if the user hasn't interacted with a filter, it acts as "All Selected". If the user explicitly deselects all items in the dropdown, the app actively filters for an empty array, resulting in the correct "No Data" UI state.

* **Performance (Pagination & Virtualization):**
  1.To handle potentially large datasets (e.g., querying a full year of time entries), I implemented pagination on the main data table
  2.Used `react-window` (V2) to virtualize the long filter dropdown lists for Activity Filter, ensuring the DOM remains lightweight and responsive.
* **Responsive Layout:** As per the requirements, the dashboard focuses on a clean desktop experience.
* **Charts:** Created Pie Chart( Activity vs hours) and Bar Chart( project vs hour)- here I have also placed a mock in ReportPage.tsx named timeEntries, considering real API data has only one project name as My Activities.
* **Table** - Considering the real data that I am fetching has name field empty in case of user so I have used email to display in the table as well as filter.

---

## What I Would Do With More Time

1. **Global Error Handling:** I would replace the current inline typography error states (e.g., failed to fetch) with more polished user experience.
2. **Unit Testing:** I would add `Jest` and `React Testing Library` to write unit tests.
3. **Mobile Responsiveness for Tables:** Enhance it further for mobile as well.

## Few screenshots from Project

<img width="1214" height="664" alt="image" src="https://github.com/user-attachments/assets/392c1c75-8083-4115-b0aa-b7c852293490" />
