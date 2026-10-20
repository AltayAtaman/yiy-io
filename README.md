# yiy.io

An offline-first, zero-cloud-dependency point-of-sale and venue operations platform engineered for uninterrupted hospitality workflows.

Website: [https://AltayAtaman.github.io/yiy-io/](https://AltayAtaman.github.io/yiy-io/)

---

## English Overview

### Description
yiy.io is an offline-first point-of-sale and venue management system designed for cafes, restaurants, and beach operations where network reliability is critical. Built with Node.js and SQLite, the platform runs entirely on-premises inside a standalone Windows executable (.exe), eliminating database installation overhead and external cloud latency. Waitstaff connect directly to the local server over Wi-Fi via QR-code pairing from any mobile browser, routing orders to kitchen and cashier screens instantly without relying on active internet access.

### Technical Highlights
* **Zero-Cloud Resilience:** Operates entirely locally on an embedded SQLite engine, preventing service interruptions and eliminating cloud dependency during network outages.
* **Standalone Executable Deployment:** Packaged into a single portable `.exe` runtime requiring no external runtime dependencies, Node installations, or database setups.
* **Frictionless Mobile Ordering:** Enables waitstaff to take tableside orders from any iOS or Android browser via local Wi-Fi QR pairing without downloading native applications.
* **On-Premises Data Ownership:** Stores all sales, inventory, and table turnover analytics locally on the venue's hardware, ensuring full data privacy and zero recurring SaaS subscription costs.

---

## Türkçe Açıklama

### Genel Bakış
yiy.io; kafe, restoran ve plaj işletmeleri için geliştirilmiş, tamamen çevrimdışı (offline-first) çalışan bir masa ve adisyon otomasyon platformudur. Node.js ve yerel SQLite mimarisi üzerine inşa edilen sistem, tek bir taşınabilir Windows çalıştırılabilir dosyası (.exe) üzerinden hiçbir veritabanı veya sunucu kurulumu gerektirmeden çalışır. Garsonlar, herhangi bir mobil uygulama indirmeye gerek duymadan işletmenin yerel Wi-Fi ağı üzerinden QR kod okutarak saniyeler içinde sisteme bağlanır; siparişleri mutfak ve kasa ekranlarına anlık ve sıfır bulut gecikmesiyle aktarır.

### Teknik Özellikler
* **Tam Çevrimdışı Çalışma:** Yerel veritabanı altyapısı sayesinde internet bağlantısı kopsa dahi sipariş ve ödeme süreçlerinde kesinti yaşanmaz.
* **Tek Tıkla Kurulum:** Tüm sunucu ve web bileşenleri harici bağımlılık gerektirmeyen tek bir `.exe` paketine dönüştürülmüştür.
* **Donanımsız Mobil Entegrasyon:** Garsonlar kişisel veya kurumsal akıllı telefonlardan yerel Wi-Fi ve QR eşleşmesiyle doğrudan tarayıcı üzerinden sipariş alabilir.
* **Yerel Veri Güvenliği:** Ciro, masa geçmişi ve müşteri verileri üçüncü taraf bulut sunuculara aktarılmaz; tüm kayıtlar işletmenin kendi bilgisayarında güvenle saklanır.

---

## Hızlı Başlangıç / Quick Start

1. **İndirin:** GitHub sayfasındaki **Code > Download ZIP** seçeneğiyle arşivi bilgisayarınıza indirin.
2. **Arşivi Çıkarın:** ZIP dosyasını dilediğiniz bir klasöre açın.
3. **Çalıştırın:** Klasör içindeki `yiy-server.exe` dosyasını çalıştırın.
   *(Windows SmartScreen uyarısı verirse: "Ek Bilgi" > "Yine de Çalıştır" seçeneğine tıklayın).*
4. **Erişim Adresleri:**
   * **Yönetici Paneli:** `http://localhost:3001`
   * **Garson Arayüzü:** `http://localhost:3001/waiter`

### Garson Telefonlarını Bağlama
1. Garson telefonunu işletmenin Wi-Fi ağına bağlayın.
2. Yönetici Paneli (`http://localhost:3001`) üzerindeki Garson QR Kodunu telefondan taratın.
3. Garson şifresi ile giriş yaparak sipariş almaya başlayın.

---

## Technical Stack

* **Core Runtime:** Node.js, Express, SQLite
* **Admin Dashboard:** React 18, TypeScript, Tailwind CSS
* **Mobile Client:** Flutter / Responsive Web
* **Printing Protocols:** Thermal ESC/POS LAN
* **Deployment:** Standalone Windows Executable (.exe)

---

## Contact & Licensing

* **Email:** [i.altay.ataman@gmail.com](mailto:i.altay.ataman@gmail.com)
* **LinkedIn:** [https://www.linkedin.com/in/ismailaltayataman](https://www.linkedin.com/in/ismailaltayataman)
