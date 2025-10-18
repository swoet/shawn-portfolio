param(
  [string]$CloudOut = 'public/orbit-cloud.jpg',
  [string]$DesignOut = 'public/orbit-design.jpg'
)

$headers = @{ 'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }

function Download-FirstSuccess([string[]]$urls, [string]$out) {
  foreach ($u in $urls) {
    try {
      Invoke-WebRequest -Uri $u -OutFile $out -Headers $headers -UseBasicParsing -TimeoutSec 30
      if (Test-Path $out -PathType Leaf) {
        if ((Get-Item $out).Length -gt 2048) { return $u }
      }
    } catch {
      # try next
    }
  }
  throw "Failed all URLs for $out"
}

# Cloud/server themed options (try a few)
$candidatesCloud = @(
  'https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&fit=crop',
  'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&fit=crop',
  'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&fm=jpg&w=640&h=640&fit=crop'
)
$cloudUsed = Download-FirstSuccess $candidatesCloud $CloudOut

# Design/orange gradient themed options
$candidatesDesign = @(
  'https://images.pexels.com/photos/7135057/pexels-photo-7135057.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&fit=crop',
  'https://images.pexels.com/photos/7605676/pexels-photo-7605676.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&fit=crop',
  'https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&fm=jpg&w=640&h=640&fit=crop'
)
$designUsed = Download-FirstSuccess $candidatesDesign $DesignOut

# Update orbit-images.json so JS points to local files for non-fixed items
$data = @{ 
  blockchain = ""; 
  coding = ""; 
  cloud = 'public/orbit-cloud.jpg'; 
  design = 'public/orbit-design.jpg' 
}
($data | ConvertTo-Json) | Set-Content -Path 'public/orbit-images.json' -Encoding UTF8

Write-Host "Pinned images saved:" 
Get-Item $CloudOut, $DesignOut | Format-Table Name, Length
Write-Host "Cloud source: $cloudUsed"
Write-Host "Design source: $designUsed"
