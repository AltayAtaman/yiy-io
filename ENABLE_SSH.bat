@echo off
:: ==========================================================
:: yiy.io - TEK TIKLA SSH VE GUVENLIK DUVARI AKTIFLESTIRICI
:: ==========================================================
title yiy.io POS Hizli Kurulum

echo.
echo ==========================================================
echo   yiy.io POS OTOMATIK SSH VE GUVENLIK DUVARI KURULUMU
echo ==========================================================
echo.

:: 1. OpenSSH Server Yukle ve Baslat
echo [1/3] OpenSSH Sunucusu kuruluyor...
powershell -Command "Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0 -ErrorAction SilentlyContinue; Start-Service sshd -ErrorAction SilentlyContinue; Set-Service -Name sshd -StartupType Automatic -ErrorAction SilentlyContinue"

:: 2. Guvenlik Duvarinda Port 22 ve Port 5000 Ac
echo [2/3] Guvenlik duvari izinleri ayarlaniyor...
powershell -Command "Get-NetFirewallRule | Where-Object { ($_.DisplayName -like '*node*' -or $_.DisplayName -like '*yiy*') -and $_.Action -eq 'Block' } | Remove-NetFirewallRule -ErrorAction SilentlyContinue"
powershell -Command "New-NetFirewallRule -DisplayName 'yiy.io Port 5000 (TCP)' -Direction Inbound -LocalPort 5000 -Protocol TCP -Action Allow -Profile Any -ErrorAction SilentlyContinue"
powershell -Command "New-NetFirewallRule -DisplayName 'OpenSSH Port 22 (TCP)' -Direction Inbound -LocalPort 22 -Protocol TCP -Action Allow -Profile Any -ErrorAction SilentlyContinue"
powershell -Command "New-NetFirewallRule -DisplayName 'yiy.io Sunucu (yiy-server.exe)' -Direction Inbound -Program '%~dp0yiy-server.exe' -Action Allow -Profile Any -ErrorAction SilentlyContinue"

:: 3. Baglanti Bilgilerini Ekrana Yazdir
echo [3/3] Bilgiler aliniyor...
echo.
echo ==========================================================
echo   KURULUM TAMAMLANDI! BAGLANTI BILGILERINIZ:
echo ==========================================================
echo.
powershell -Command "Write-Host 'Kullanici Adi (Username): ' -NoNewline -ForegroundColor Cyan; whoami"
powershell -Command "Write-Host 'Wi-Fi IP Adresi:          ' -NoNewline -ForegroundColor Green; (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias 'Wi-Fi*').IPAddress"
echo.
echo Kendi bilgisayarinizdan baglanmak icin:
powershell -Command "$ip = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias 'Wi-Fi*').IPAddress; $user = (whoami).Split('\')[-1]; Write-Host "   ssh $user@$ip" -ForegroundColor Yellow"
echo.
echo ==========================================================
echo.
pause
