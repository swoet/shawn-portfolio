# Portfolio System Setup Script for Windows
# Handles npm workspace symlink issues on Windows

Write-Host "Setting up Portfolio System (Windows)..." -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

$nodeVersion = node --version 2>$null
if (-not $nodeVersion) {
    Write-Host "Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

Write-Host "Node.js and npm are installed" -ForegroundColor Green
Write-Host ""

# Step 1: Install dependencies (Windows workaround)
Write-Host "Installing dependencies (Windows workaround)..." -ForegroundColor Yellow
Write-Host ""

# Temporarily rename root package.json to avoid workspace issues
Write-Host "Temporarily disabling workspaces..." -ForegroundColor Cyan
if (Test-Path "package.json") {
    Rename-Item "package.json" "package.json.temp"
}

Write-Host "Installing root dependencies..." -ForegroundColor Cyan
if (Test-Path "package.json.temp") {
    Rename-Item "package.json.temp" "package.json"
}
npm install --no-workspaces
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install root dependencies" -ForegroundColor Red
    exit 1
}

Write-Host "Installing admin-dashboard dependencies..." -ForegroundColor Cyan
Set-Location admin-dashboard
# Remove node_modules if it exists to start fresh
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
}
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install admin-dashboard dependencies" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

Write-Host "Installing portfolio-frontend dependencies..." -ForegroundColor Cyan
Set-Location portfolio-frontend
# Remove node_modules if it exists to start fresh
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
}
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install portfolio-frontend dependencies" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

Write-Host "Installing shared dependencies..." -ForegroundColor Cyan
Set-Location shared
# Remove node_modules if it exists to start fresh
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
}
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install shared dependencies" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

Write-Host "All dependencies installed successfully" -ForegroundColor Green
Write-Host ""

# Step 2: Setup database
Write-Host "Setting up database..." -ForegroundColor Yellow
Write-Host ""

Write-Host "Generating Prisma client..." -ForegroundColor Cyan
npm run prisma:generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to generate Prisma client" -ForegroundColor Red
    exit 1
}

Write-Host "Running database migrations..." -ForegroundColor Cyan
npm run prisma:migrate
if ($LASTEXITCODE -ne 0) {
    Write-Host "Warning: Migration may have failed, but continuing..." -ForegroundColor Yellow
}

Write-Host "Seeding database with portfolio sections..." -ForegroundColor Cyan
npm run prisma:seed
if ($LASTEXITCODE -ne 0) {
    Write-Host "Warning: Seeding may have failed, but continuing..." -ForegroundColor Yellow
}

Write-Host "Database setup complete" -ForegroundColor Green
Write-Host ""

# Step 3: Check for .env file
Write-Host "Checking environment configuration..." -ForegroundColor Yellow

if (-not (Test-Path "admin-dashboard\.env")) {
    Write-Host "No .env file found in admin-dashboard" -ForegroundColor Yellow
    Write-Host "Creating .env file with default values..." -ForegroundColor Cyan
    
    $envContent = @"
# Database
DATABASE_URL="file:../prisma/dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(New-Guid)"

# Optional: OAuth providers
GITHUB_ID=""
GITHUB_SECRET=""
"@
    
    $envContent | Out-File -FilePath "admin-dashboard\.env" -Encoding UTF8
    Write-Host "Created .env file with default values" -ForegroundColor Green
    Write-Host "Please update NEXTAUTH_SECRET with a secure random string" -ForegroundColor Yellow
} else {
    Write-Host ".env file exists" -ForegroundColor Green
}
Write-Host ""

# Final message
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Review and update admin-dashboard\.env if needed" -ForegroundColor White
Write-Host "2. Run 'npm run dev' to start both servers" -ForegroundColor White
Write-Host "3. Open http://localhost:3000 for admin dashboard" -ForegroundColor White
Write-Host "4. Open your portfolio frontend in a browser" -ForegroundColor White
Write-Host ""
Write-Host "See SETUP.md for detailed documentation" -ForegroundColor Cyan
Write-Host ""

# Ask if user wants to start dev servers
$response = Read-Host "Would you like to start the development servers now? (y/n)"
if ($response -eq "y" -or $response -eq "Y") {
    Write-Host ""
    Write-Host "Starting development servers..." -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop the servers" -ForegroundColor Yellow
    Write-Host ""
    npm run dev
}
