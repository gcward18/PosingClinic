#!/bin/bash

echo "🚀 Setting up your development environment..."

# Check if docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOL
POSTGRES_USER=admin
POSTGRES_PASSWORD=secret
POSTGRES_DB=mydb
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin
MINIO_ENDPOINT=minio:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
GROQ_API_KEY=your_groq_api_key
EOL
fi

# Build and start containers
echo "🏗️  Building and starting containers..."
docker-compose down -v # Clean up any existing containers
docker-compose build --no-cache
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

echo "✅ Setup complete! Your services are running at:"
echo "📱 Frontend: http://localhost:5173"
echo "🔋 Backend: http://localhost:8000"
echo "💾 MinIO Console: http://localhost:9001"
echo "🗄️  PostgreSQL: localhost:5432"