# [Budget Lens(Budget Insights and Expense Tracker)]

## 🔗 Live Demo
    https://vercel.com/ayishath-jumaila-ks-projects/budget-lens

## 📖 Description
Budget Lens is a responsive budget management dashboard built with React, Redux, and Tailwind CSS. It helps users track income, expenses, and savings through interactive charts, progress bars, and detailed reports. Designed for individuals, students, and professionals, it provides monthly budget planning,

## ✨ Features
- Transaction Management: Add, delete, and filter transactions by category, month, and year.
- Interactive Charts: Visualize spending with Doughnut, Bar, and Line charts powered by Chart.js.
- Budget Planning: Set monthly budgets and track allocations with progress bars.
- Reports Export: Download financial summaries as CSV or styled PDF with embedded charts.
- Saving Suggestions: AI‑powered tips to highlight overspending and recommend smarter saving strategies.
- Quick Actions: One‑click buttons for adding income, expenses, and viewing reports.
- Recent Activity: Snapshot of the latest transactions for instant visibility.
- Responsive design for all devices

## 🎯 Project Goals
I built this project to practice React, Redux, and Tailwind CSS while creating a useful budget planner. My goal was to help users track income, expenses, and savings with clear charts and reports. Through this, I learned how to manage state, build responsive layouts, and add features like CSV/PDF export and saving tips and adding charts.

## 🛠️ Technologies Used
- **Frontend Framework**: React+Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS (responsive, utility‑first design)
- **Charts & Visualization**: Chart.js (Doughnut, Bar, Line charts)
- **Data Export**: react‑csv for CSV downloads, jsPDF + jspdf‑autotable for styled PDF reports
- **Routing**: React Router 
- **Utilities**: UUID for unique transaction IDs, heroicons for icons
- **Deployment:** Vercel

## 🤖 AI Integration (Optional)
- **AI Tool/API Used**: I implemented a custom rule‑based suggestion generator in React (no external API). It analyzes transactions against budgets and produces dynamic saving tips that feel “AI‑powered.”

- **How It Enhances User Experience**: Users receive personalized saving suggestions whenever they add expenses or budgets. This makes the dashboard more insightful, helping them spot overspending and discover practical ways to save money instead of just viewing static charts.


## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### ⚙️ Installation Step

1. Clone the repository
   ```bash
   git clone https://github.com/jumiabdul/Budget-Lens.git
   
2. Navigate to project directory
   - cd budget-lens
   
4. Install dependencies
   - npm install
   
6. Start development server
   - npm run dev
   
8. Open in browser
   - Go to http://localhost:5173

## 📱 Responsive Design
   - This application is fully responsive and tested on:
     - Mobile devices (375px and up)
     - Tablets (768px and up)
     - Desktop (1024px and up)

## 📸 Screenshots
<img width="1071" height="602" alt="Screenshot 1" src="https://github.com/user-attachments/assets/ba169714-764f-43e5-a561-1eaf61601acb" />
<img width="1294" height="647" alt="Screenshot 2" src="https://github.com/user-attachments/assets/71fcb892-8593-4b3f-81fb-7cf458e425fa" />
<img width="1108" height="623" alt="Screenshot 3" src="https://github.com/user-attachments/assets/8960df80-8720-4010-81b5-11ef5833aa7b" />

## 🎨 Design Choices
   - Referred this figma site for design : https://cycle-offset-54984065.figma.site/

## 🐛 Known Issues
- **Data Persistence**: Transactions and budgets are stored only in local state/Redux. Refreshing the page clears data unless connected to a backend or localStorage.
- **Saving Suggestions**: Currently rule‑based; tips may feel repetitive or too generic without more advanced AI logic.
- **Export Features**: CSV/PDF export works, but styling and formatting may vary depending on browser and dataset size.

## 🔮 Future Enhancements
- **Data Persistence**: Connect to a backend (Node/Express + MongoDB) or localStorage so budgets and transactions are saved permanently.
- **Advanced AI Suggestions**: Use machine learning or GPT APIs to generate smarter, more personalized saving tips.

## 👤 Author
-  Name: Ayishath Jumaila K
-  GitHub: https://github.com/jumiabdul
-  LinkedIn: https://www.linkedin.com/in/ayishath-jumaila-k/
-  Email: jumiabdul@gmail.com

## 📄 License
- This project is open source and available under the MIT License.

## 🙏 Acknowledgments
-  Thanks to my mentor Ajmal Sir, Entri app , youtube videos for resources
-  Icons from HeroIcons

---


