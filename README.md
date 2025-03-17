# 🌤 Weather Report API

This is a simple weather report API built with **Node.js, Express.js, and MongoDB**. The API provides weather details based on the given date and email. The backend is hosted on **Vercel**.

---

## 🚀 **Live API URL**
**Base URL:**  
[https://weather-report-backend.vercel.app](https://weather-report-backend.vercel.app)

### 🛠 **API Endpoints**
#### ✅ Get Weather Data  
- **URL:** `/api/weather?email=<your-email>&date=<YYYY-MM-DD>`
- **Method:** `GET`
- **Example Request:**  
  ```
  https://weather-report-backend.vercel.app/api/weather?email=pramodhaldp.21@uom.lk&date=2025-03-16
  ```
- **Example Response:**
  ```json
  {
    "location": "Kurunegala",
    "date": "2025-03-16",
    "records": [
      { "time": "10:10", "temperature": 29.25, "weather": "overcast clouds" },
      { "time": "15:58", "temperature": 23.6, "weather": "overcast clouds" }
    ]
  }
  ```

---

## ⚙️ **Installation & Setup**
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/weather-report-backend.git
   cd weather-report-backend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Create a `.env` file**
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://your-mongodb-uri
   ```

4. **Run the server locally**
   ```sh
   npm start
   ```

---

## 🛆 **Deploying to Vercel**
To deploy this backend to **Vercel**, follow these steps:

1. **Install Vercel CLI** (if not already installed)
   ```sh
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```sh
   vercel login
   ```

3. **Deploy the project**
   ```sh
   vercel --prod
   ```

---

## 🛠 **Technologies Used**
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Hosting:** Vercel

---

## 📝 **Contributing**
Feel free to contribute! Fork the repo, make changes, and submit a pull request.

---

## 📧 **Contact**
For any issues, email **prabhashpramodha99@gmail.com**.
