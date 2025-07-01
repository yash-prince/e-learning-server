

```markdown
## Installation

### 1. Clone the repo
```bash
git clone https://github.com/yash-prince/e-learning.git
```

```bash
cd e-learning
```

### 2. Create your own .env file
```bash
cp .env.example .env
```

Then open `server/.env` and fill in:
- PORT
- DB
- password
- email
- Activation_secret
- jwt_sec
- Razorpay_key
- Razorpay_secret

### 3. Install backend dependencies
```bash
cd server
npm install
cd ..
```

### 4. Install frontend dependencies
```bash
cd frontend
npm install
cd ..
```

### 5. Run the backend server
```bash
cd server
npm run dev
```

### 6. Run the frontend (in a separate terminal)
```bash
cd frontend
npm start
# or
npm run dev
```
