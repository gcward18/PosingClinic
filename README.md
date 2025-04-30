# Posing Clinic

An AI-powered application that provides real-time feedback and critiques for bodybuilding poses. Using advanced AI vision and natural language processing, this tool helps bodybuilders perfect their posing technique through detailed analysis and suggestions.

## 🚀 Technologies Used

### Frontend
- React with TypeScript
- Vite for build tooling
- Modern CSS-in-JS styling
- Context API for state management

### Backend
- FastAPI (Python)
- Groq API for AI image analysis
- MinIO for image storage
- PostgreSQL database
- Docker for containerization

## 🏃‍♂️ Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)
- A Groq API key

### Environment Setup

1. Create a `.env` file in the root directory:
```env
POSTGRES_USER=admin
POSTGRES_PASSWORD=secret
POSTGRES_DB=mydb
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin
MINIO_ENDPOINT=minio:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
GROQ_API_KEY=your_groq_api_key
```

### Running the Application

1. Start the entire stack using Docker Compose:
```bash
./run.sh
```

This will start:
- Frontend at http://localhost:5173
- Backend API at http://localhost:8000
- MinIO at http://localhost:9000 (API) and http://localhost:9001 (Console)
- PostgreSQL at localhost:5432

To stop the application:
```bash
./stop.sh
```

### Local Development

#### Frontend
```bash
cd posing-clinic-frontend
npm install
npm run dev
```

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Access Swagger docs 

To access the swagger docs and experiment with the endpoints go to the following url after running the backend service
```
http://localhost:8000/docs
```

## 💡 Features

- Upload photos for pose analysis
- Real-time AI-powered pose critique
- Photo storage and management
- Historical critique tracking
- Responsive design for mobile and desktop

## 🤔 Why This App?

Bodybuilding pose critique traditionally requires in-person coaching or forum feedback. This app modernizes the process by:
1. Providing instant, objective feedback
2. Allowing users to track their progress over time
3. Making professional-level pose critique accessible to everyone
4. Utilizing cutting-edge AI to analyze form and technique

## 🔄 Areas for Improvement

1. **Technical Enhancements**
   - Implement WebSocket for real-time feedback
   - Add user authentication and profiles
   - Implement pose comparison features
   - Add video analysis capabilities
   - Improve error handling and retry mechanisms

2. **Features**
   - Add pose categories and filtering
   - Implement progress tracking
   - Add social features (sharing, community feedback)
   - Create a pose library with examples
   - Add custom critique preferences

3. **Performance**
   - Implement image optimization
   - Add caching layer
   - Optimize database queries
   - Add CDN integration

4. **User Experience**
   - Add loading states and better error feedback
   - Implement guided tutorials
   - Add mobile-specific features
   - Improve accessibility

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request