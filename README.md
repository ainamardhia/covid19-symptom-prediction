# 🌤️ COVID-19 Symptoms & Weather Association App

This project uses **Association Rule Mining (ARM)** to find relationships between **weather conditions** and **COVID-19 symptoms**.  
It provides both a **FastAPI backend** (serving ARM rules) and a **React frontend** (interactive dashboard).

---

## 📌 Features

- Extracts **association rules** (Support, Confidence, Lift) from dataset
- Predict **symptoms from weather** (Weather → Symptoms)
- Predict **weather from symptoms** (Symptoms → Weather)
- Searchable list of **all rules** with collapsible cards
- Interactive UI with a floating **Back to Top** button

---

## 🛠️ Tech Stack

- **Backend:** Python, FastAPI, Pandas, mlxtend  
- **Frontend:** React.js (Create React App)  
- **Data:** Excel/CSV dataset of weather and COVID-19 symptoms  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/covid-arm-app.git
cd covid-arm-app
```

### 2️⃣ Backend Setup (FastAPI)

1. **Create a virtual environment:**

```bash
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows
```

2. **Install dependencies:**

```bash
pip install fastapi uvicorn pandas mlxtend openpyxl
```

3. **Run backend:**

```bash
uvicorn main:app --reload
```

API will run at: **http://127.0.0.1:8000**

### 3️⃣ Frontend Setup (React)

1. **Navigate to frontend folder:**

```bash
cd frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run React app:**

```bash
npm start
```

React runs at: **http://localhost:3000**

---

## 🚀 Usage

- Open frontend at **http://localhost:3000**
- Select a **weather condition** to see predicted symptoms
- Select a **symptom** to see possible related weather conditions
- Scroll to **All Rules** for detailed associations
- Use **search bar** to filter rules
- Click a **rule card** to expand details:
  - Support
  - Confidence
  - Lift

---

## 📊 Example Screenshots

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/c6a0f87b-9d41-43a1-8e35-b79220ee6f31" />


- **Weather → Symptoms prediction**
- **All rules collapsible cards**

---

## 📂 Project Structure

```
covid-arm-app/
├── backend/
│   ├── main.py          # FastAPI backend
│   └── Data untuk Analisis Korelasi.xlsx        # Dataset
├── frontend/
│   ├── src/
│   │   └── App.js       # React frontend
│   └── package.json
└── README.md
```

---

## 📌 To-Do

- [ ] Improve UI styling with Tailwind/Material UI
- [ ] Deploy backend to **Render/Heroku**
- [ ] Deploy frontend to **Vercel/Netlify**

---

## 👩‍💻 Author

Developed by **Aina Mardhia** 
Masters in AI 🎓 | Passionate about **Full Stack Development** 🚀

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
