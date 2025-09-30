# Publish all packages script
param(
    [Parameter(Mandatory=$true)]
    [string]$OTP
)

Write-Host "Publishing all packages with OTP: $OTP" -ForegroundColor Green

# List of packages to publish (excluding example)
$packages = @(
    "accordion", "badge", "button", "card", "checkbox", "dropdown", 
    "input", "modal", "progress", "radio", "select", "skeleton", 
    "snackbar", "switch", "toast", "aargon-ui"
)

foreach ($package in $packages) {
    Write-Host "`nPublishing @aargon-ui/$package..." -ForegroundColor Yellow
    
    try {
        Set-Location "packages\$package"
        npm publish --otp=$OTP --access public
        Write-Host "✅ Successfully published @aargon-ui/$package" -ForegroundColor Green
        Set-Location "../.."
    }
    catch {
        Write-Host "❌ Failed to publish @aargon-ui/$package" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
        Set-Location "../.."
    }
}

Write-Host "`n🎉 Publishing complete!" -ForegroundColor Green
