# E‑Learning‑Server

## Installation

**1. Clone the repo**
Repository folder name:

```
e‑learning‑server
```

Clone command:

```bash
git clone https://github.com/yash-prince/e-learning-server.git
```

**2. Change into the project directory**

```bash
cd e-learning-server
```

**3. Create your own `.env` file**

```bash
cp .env.example .env
```

Then open `server/.env` and fill in all required variables:

```
PORT=<your server port, e.g. 5000>
DB=<your database connection string>
PASSWORD=<your database password>
EMAIL=<your notification email>
ACTIVATION_SECRET=<your account‑activation secret>
JWT_SEC=<your JWT signing secret>
RAZORPAY_KEY=<your Razorpay API key>
RAZORPAY_SECRET=<your Razorpay API secret>
```

**4. Install backend dependencies**

```bash
cd server
npm install
cd ..
```

**5. Install frontend dependencies**

```bash
cd frontend
npm install
cd ..
```

**6. Run the backend server**

```bash
cd server
npm run dev
```

**7. Run the frontend (in a separate terminal)**

```bash
cd frontend
npm start
# or, if you prefer:
npm run dev
```

Once both are up, you can access the frontend in your browser (typically at `http://localhost:3000`) and your backend API at the port you specified.
