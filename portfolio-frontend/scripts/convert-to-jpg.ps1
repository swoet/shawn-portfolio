param(
  [string]$InFile = 'my-image.png',
  [string]$OutFile = 'profile.jpg',
  [int]$Quality = 90
)

Add-Type -AssemblyName System.Drawing

$inPath = Resolve-Path $InFile
$outPath = Join-Path (Resolve-Path .) $OutFile

if (Test-Path $outPath) { Remove-Item $outPath -Force }

$img = [System.Drawing.Image]::FromFile($inPath)

# Attempt to correct EXIF orientation if present
try {
  $propIdOrientation = 274
  if ($img.PropertyIdList -contains $propIdOrientation) {
    $orientation = $img.GetPropertyItem($propIdOrientation).Value[0]
    switch ($orientation) {
      3 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
      6 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
      8 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
    }
  }
} catch {}

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)

$img.Save($outPath, $encoder, $ep)
$img.Dispose()

Get-Item $outPath | Format-List Name,Length,FullName
