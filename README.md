#  📊 [Budget Lens(Budget Insights and Expense Tracker)]

## 🔗 Live Demo
    https://budget-lens.vercel.app/

## 📖 Description
A comprehensive full-stack budget management dashboard built with **React, Redux, Node.js/Express, MongoDB, and Tailwind CSS**. Budget Lens helps users track income, expenses, and savings through interactive charts, progress bars, detailed reports, and AI-powered saving suggestions.

---

## ✨ Features
- - **Transaction Management**: Add, delete, and filter transactions by category, month, and year.
- - **Interactive Charts**: Visualize spending with Doughnut, Bar, and Line charts powered by Chart.js.
- - **Budget Planning**: Set monthly budgets, track allocations and and monitor progress with visual indicators
- - **User Authentication**: Secure login and registration with JWT tokens
- - **Data Persistence**: All transactions and budgets saved to MongoDB database
- - **Recent Activity**: Snapshot of the latest transactions for instant visibility.
- - **Responsive design**: Optimized for mobile, tablet, and desktop devices

### Advanced Features
- **Reports Export**: Download financial summaries as CSV or styled PDF with embedded charts
- **Saving Suggestions**: AI-powered tips to highlight overspending and recommend smarter saving strategies
- **Quick Actions**: One-click buttons for adding income, expenses, and viewing reports
- **Budget Analytics**: Track spending trends and monthly comparisons
- **Category-wise Breakdown**: Detailed insights into spending by category
- **Real-time Updates**: Instant dashboard updates across all open sessions

---

## 🎯 Project Goals
I built Budget Lens to practice full-stack development with modern technologies while creating a useful budget planner. My objectives were:
 
- Master React, Redux, and Tailwind CSS for responsive frontend development
- Build a scalable backend using Node.js/Express with proper API design
- Implement database management with MongoDB and Mongoose
- Create secure user authentication with JWT
- Develop data export features (CSV/PDF)
- Integrate AI-powered saving suggestions
- Deploy a production-ready full-stack application
- Learn best practices for state management, API design, and security
 
Through this project, I gained hands-on experience in managing complex state, building RESTful APIs, designing responsive layouts, implementing user authentication, and deploying full-stack applications.
 
---

## 🛠️ Technologies Used
### Frontend
- **Framework**: React 18+ with Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS (responsive, utility-first design)
- **Charts & Visualization**: Chart.js with react-chartjs-2
- **Data Export**: 
  - `react-csv` for CSV downloads
  - `jsPDF` + `jspdf-autotable` for styled PDF reports
- **Routing**: React Router v6
- **HTTP Client**: Axios for API requests
- **Form Validation**: React Hook Form 
- **Utilities**: 
  - Heroicons for UI icons
  - Date-fns for date manipulation
- **Deployment**: Vercel
 
### Backend
- **Runtime**: Node.js (v14 or higher)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs
- **Middleware**: 
  - CORS for cross-origin requests
  - dotenv for environment variables
  - Validator for input validation
- **Deployment**: Vercel

---

## 🤖 AI Integration (Optional)
- **AI Tool/API Used**: I implemented a custom rule‑based suggestion generator in React (no external API). It analyzes transactions against budgets and produces dynamic saving tips that feel “AI‑powered.”

- **How It Enhances User Experience**: Users receive personalized saving suggestions whenever they add expenses or budgets. This makes the dashboard more insightful, helping them spot overspending and discover practical ways to save money instead of just viewing static charts.

---

## 🚀 Setup Instructions

### Prerequisites
- ***Node.js*** (v14 or higher)
- ***npm*** or ***yarn***
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### ⚙️ Installation Step

```bash
git clone https://github.com/jumiabdul/Budget-Lens.git
cd Budget-Lens
```
 
#### 2. Setup Backend
 
Navigate to the backend directory and install dependencies:
 
```bash
cd backend
npm install
```
 
Create a `.env` file in the `backend` directory with the following variables:
 
```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/budget-lens?retryWrites=true&w=majority
 
# Server Configuration
PORT=4000
NODE_ENV=production
 
# JWT Secret Key
JWT_SECRET=your_super_secret_jwt_key_change_in_production
 
# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
 
Start the backend server:
 
```bash
npm run dev
# or
npm start
```
 
The backend will run on `http://localhost:4000`
 
#### 3. Setup Frontend
 
Navigate to the frontend directory and install dependencies:
 
```bash
cd frontend
npm install
```
 
Create a `.env.local` file in the `frontend` directory:
 
```env
VITE_API_URL=http://localhost:4000/api
```
 
Start the development server:
 
```bash
npm run dev
```
 
The frontend will run on `http://localhost:5173`

---

## 📱 Responsive Design
   - This application is fully responsive and tested on:
     - Mobile devices (375px and up)
     - Tablets (768px and up)
     - Desktop (1024px and up)
     
---

## 📸 Screenshots
<img width="1917" height="830" alt="Screenshot 1" src="https://github.com/user-attachments/assets/8c811c41-a8db-41d0-b70f-51ab61f20dc9" />
<img width="1897" height="900" alt="Screenshot 2" src="https://github.com/user-attachments/assets/fef221b1-3454-4b51-87f1-bd18016aa7db" />
<img width="1272" height="906" alt="Screenshot 3" src="https://github.com/user-attachments/assets/7456a2ee-6650-47ad-858f-68b2124a03f7" />

---

## 🎨 Design Choices
   - Referred this figma site for design : https://cycle-offset-54984065.figma.site/

---

## 🐛 Known Issues
- **Large Dataset Performance**: Dashboard may slow down with 10,000+ transactions
- **Saving Suggestions**: Currently rule‑based; tips may feel repetitive or too generic without more advanced AI logic.
- **Export Features**: CSV/PDF export works, but styling and formatting may vary depending on browser and dataset size.

---

## 🔮 Future Enhancements
- **Advanced AI Suggestions**: Use machine learning or GPT APIs to generate smarter, more personalized saving tips.
- **Profile Enhancing**: User profile customization (profile picture, preferences)
- **Goal Page**: Financial goal setting and tracking

---

## 👤 Author
-  Name: Ayishath Jumaila K
-  GitHub: https://github.com/jumiabdul
-  LinkedIn: https://www.linkedin.com/in/ayishath-jumaila-k/
-  Email: jumiabdul@gmail.com

---

## 📄 License
- This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments
-  Thanks to my mentor Ajmal Sir, Entri app , youtube videos for resources
-  Icons from HeroIcons

---


