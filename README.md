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

1. Create a file named `.env` in the root directory of the project (next to `package.json`).
2. Add your API Key and Secret to the `.env` file

```env
SIGN_IN_API_KEY
SIGN_IN_API_SECRET

```

### 3. Start the Development Server

```bash
npm run dev

```

The application will be available at `http://localhost:5173`.
_(Note: The Vite dev server is configured with `vite-plugin-mkcert` to proxy requests and handle CORS)._

---

## Assumptions & Technical Decisions

- **Filter State Logic :** I designed the filter logic to mirror the exact behavior of the production Early app. By default, if the user hasn't interacted with a filter, it acts as "All Selected". If the user explicitly deselects all items in the dropdown, the app actively filters for an empty array, resulting in the correct "No Data" UI state.
- **Performance (Pagination & Virtualization):**
  1.To handle potentially large datasets (e.g., querying a full year of time entries), I implemented pagination on the main data table
  2.Used `react-window` (V2) to virtualize the long filter dropdown lists for Activity Filter, ensuring the DOM remains lightweight and responsive.
- **Responsive Layout:** As per the requirements, the dashboard focuses on a clean desktop experience.
- **Charts:**Created Pie Chart( Activity vs hours) and Bar Chart( project vs hour)- here I have also placed a mock in ReportPgae.tsx named timeEntries considering real API data has only one project name as My Activities.
- **Charts:** - Considering the real data that I am fetching has name field empty in case of user so I have used email to diplay in table as well as filter.

---

## What I Would Do With More Time

1. **Global Error Handling:** I would replace the current inline typography error states (e.g., failed to fetch) with more polished user experience.
2. **Unit Testing:** I would add `Jest` and `React Testing Library` to write unit tests.
3. **Mobile Responsiveness for Tables:** While the prompt requested a desktop-only version, I would eventually convert the paginated HTML table into a responsive card-based layout for seamless reading on mobile devices.


## Few screenshots from Project

<img width="1575" height="543" alt="image" src="https://github.com/user-attachments/assets/fba91b8a-bf83-48cd-a460-0b10a383e710" />



