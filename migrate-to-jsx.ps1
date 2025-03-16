# PowerShell script to help with the migration from .js to .jsx files
# This script updates the imports in all files to use the new .jsx extensions

# Get all JavaScript files in the src directory and its subdirectories
$jsFiles = Get-ChildItem -Path ".\src" -Recurse -Include "*.js", "*.jsx"

foreach ($file in $jsFiles) {
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Update imports from .js to .jsx
    $updatedContent = $content -replace "import\s+(.+?)\s+from\s+['`"](.+?)\.js['`"]", "import `$1 from '`$2.jsx'"
    
    # If the content was changed, write it back to the file
    if ($content -ne $updatedContent) {
        Set-Content -Path $file.FullName -Value $updatedContent
        Write-Host "Updated imports in $($file.FullName)"
    }
}

Write-Host "Migration completed!" 