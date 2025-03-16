# PowerShell script to help with running the application

# Check if the API key has been set
$movieServicePath = ".\src\services\movieService.js"
$movieServiceContent = Get-Content -Path $movieServicePath -Raw

if ($movieServiceContent -match "YOUR_OMDB_API_KEY") {
    Write-Host "Warning: You need to set your OMDB API key in $movieServicePath" -ForegroundColor Yellow
    Write-Host "Please get an API key from http://www.omdbapi.com/ and replace 'YOUR_OMDB_API_KEY' with your actual API key." -ForegroundColor Yellow
    
    $setApiKey = Read-Host "Do you want to set your API key now? (y/n)"
    
    if ($setApiKey -eq "y") {
        $apiKey = Read-Host "Enter your OMDB API key"
        $updatedContent = $movieServiceContent -replace "YOUR_OMDB_API_KEY", $apiKey
        Set-Content -Path $movieServicePath -Value $updatedContent
        Write-Host "API key has been set successfully!" -ForegroundColor Green
    }
}

# Start the application
Write-Host "Starting the application..." -ForegroundColor Cyan
npm start 