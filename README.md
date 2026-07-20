# Cypress E2E Test Automation Project

Bu proje, [Automation Exercise](https://automationexercise.com/) web sitesi üzerinde uçtan uca (E2E) kullanıcı kayıt, ürün arama, sepete ekleme, fatura doğrulama, sipariş tamamlama ve hesap silme adımlarını otomatize etmek amacıyla **Cypress** ve **JavaScript** kullanılarak geliştirilmiştir.

## 🚀 Proje Kurulumu ve Test Çalıştırma

Projeyi yerel bilgisayarınızda kurmak ve test etmek için aşağıdaki komutları kullanabilirsiniz:

### 1. Bağımlılıkların Yüklenmesi
```bash
npm install
```

### 2. Arayüzü Açarak Çalıştırma (Headed / Interactive Mode)
Cypress Test Runner ekranını açıp testleri canlı izlemek için (Not: Bu modda otomatik ekran görüntüsü ve HTML raporu üretilmez):
```bash
npm run cy:open
```
*Veya alternatif olarak: `npx cypress open`*

### 3. Tüm Testleri Arka Planda Çalıştırma (Headless Mode)
Bütün test dosyalarını terminalde arka planda koşturup zaman damgalı HTML raporu üretmek için:
```bash
npm run cy:run
```
*Veya alternatif olarak: `npx cypress run`*

### 4. Belirli Bir Test Dosyasını (Spec) Çalıştırma
Sadece tek bir test dosyasını arka planda çalıştırmak ve o teste özel HTML raporu üretmek için:
*   **Uçtan Uca Sipariş Testi (`purchase_flow.cy.js`):**
    ```bash
    npx cypress run --spec "cypress/e2e/purchase_flow.cy.js"
    ```
*   **Negatif Giriş Testi (`login_failure.cy.js`):**
    ```bash
    npx cypress run --spec "cypress/e2e/login_failure.cy.js"
    ```

### 5. Çoklu Ortamda (Dev, QA, Stage) Çalıştırma
Testlerinizi yapılandırdığımız farklı hedef ortamlarda tetiklemek için aşağıdaki npm scriptlerini kullanabilirsiniz:

*   **QA/Test Ortamı (Varsayılan - https://automationexercise.com):**
    ```bash
    npm run cy:run:qa
    ```
*   **Development Ortamı (https://dev.automationexercise.com):**
    ```bash
    npm run cy:run:dev
    ```
*   **Staging Ortamı (https://stage.automationexercise.com):**
    ```bash
    npm run cy:run:stage
    ```

*İnteraktif test arayüzünü belirli bir ortamda açmak için ise sırasıyla `npm run cy:open:dev`, `npm run cy:open:qa` veya `npm run cy:open:stage` komutlarını çalıştırabilirsiniz.*

---

## 🏛️ Framework Mimarisi (Klasör Yapısı)

Proje, sürdürülebilirlik ve okunabilirliği en üst düzeye çıkarmak amacıyla **Page Object Model (POM)** tasarım şablonuna göre dizayn edilmiştir:

```text
├── cypress/
│   ├── config/                            # 🌐 Çoklu Ortam (Dev, QA, Stage) Konfigürasyonları
│   │   ├── dev.json                       # Geliştirme ortamı baseUrl ve env ayarları
│   │   ├── qa.json                        # QA ortamı baseUrl ve env ayarları (Varsayılan)
│   │   └── stage.json                     # Staging ortamı baseUrl ve env ayarları
│   ├── e2e/
│   │   ├── login_failure.cy.js            # Hatalı Giriş Denemesi Test Spec dosyamız
│   │   └── purchase_flow.cy.js            # Uçtan uca (E2E) Sipariş Akışı Test Spec dosyamız
│   ├── pages/
│   │   ├── BasePage.js                    # Ortak metotların (click, type, verify vb.) ana sınıfı
│   │   ├── HomePage.js                    # Ana sayfa locator ve aksiyonları
│   │   ├── AuthPage.js                    # Üyelik & Kayıt sayfası locator ve aksiyonları
│   │   ├── ProductsPage.js                # Ürün listeleme ve arama sayfası
│   │   ├── CartPage.js                    # Sepet sayfası
│   │   ├── CheckoutPage.js                # Ödeme öncesi fatura ve sipariş onay sayfası
│   │   └── PaymentPage.js                 # Ödeme bilgileri ve sipariş tamamlama sayfası
│   ├── fixtures/
│   │   └── testData.json                  # Statik test dataları (adres, kart bilgileri vb.)
│   ├── constants/
│   │   └── messages.js                    # Başarı/hata ve kontrol mesajlarının tutulduğu sabitler
│   └── support/
│       ├── commands.js                    # Cypress Custom Command dosyası
│       └── e2e.js                         # Global ayarlar ve reklam engelleme intercept'leri
├── reports/                               # 📊 Test Raporlama Klasörü
│   ├── html/                              # Yıl-Ay-Gün_Saat-Dakika-Saniye.html formatlı HTML raporları
│   └── screenshotOrVideo/                 # Hata durumunda alınan Yıl-Ay-Gün_Saat-Dakika-Saniye.png/mp4 dosyaları
├── cypress.config.js                      # Cypress dinamik konfigürasyon dosyası
└── package.json                           # Çalıştırma scriptleri ve kütüphaneler
```

---

## 📊 Raporlama ve Ekran Görüntüsü / Video Politikası

*   **HTML Raporları:** Test koşumlarının raporları otomatik olarak `reports/html/` dizini altına kaydedilir. Dosya isimleri **`YYYY-MM-DD_HH-mm-ss.html`** (örn: `2026-07-01_10-39-57.html`) zaman damgası formatında oluşturulur.
*   **Hata Ekran Görüntüleri ve Videoları:** Test sırasında bir hata oluştuğunda, ekran görüntüsü (`.png`) ve video (`.mp4`) otomatik olarak `reports/screenshotOrVideo/` klasörünün altına kaydedilir. Dosya isimleri yine **`YYYY-MM-DD_HH-mm-ss`** formatında zaman damgasıyla yeniden adlandırılır.
*   **Akıllı Video Saklama (Disk Tasarrufu):** Test başarıyla geçtiğinde video kaydı diskte yer kaplamaması için otomatik olarak silinir. Video **yalnızca hata (fail) durumlarında** `reports/screenshotOrVideo/` altına kaydedilir.
*   **Geçmiş Koşum Sonuçlarının Korunması:** Raporlar, ekran görüntüleri ve videolar için geçmişe dönük koşum sonuçları silinmez, her yeni test koşumunda üzerine eklenerek saklanır (`trashAssetsBeforeRuns: false` ve `overwrite: false` ayarları ile sağlanmıştır).
*   **Mochawesome Entegrasyonu:** Başarısız adımlara ait ekran görüntüleri, üretilen HTML raporun içerisine otomatik olarak gömülür (embedded).

---

## 🧪 Uçtan Uca (E2E) Test Akışı

Testimiz aşağıdaki adımları sırasıyla koşturur ve her adımda bir önceki adımın doğruluğunu teyit eder:

1. **Ana Sayfaya Git:** `https://automationexercise.com/` adresine gider ve ana sayfanın yüklendiğini teyit eder.
2. **Kayıt Sayfasına Git:** 'Signup / Login' butonuna tıklayarak üyelik alanına geçer.
3. **Kayıt Girişi Yap:** Benzersiz dinamik kullanıcı adı ve e-posta üreterek kayıt işlemini başlatır.
4. **Hesap Bilgilerini Doldur:** Şifre, Doğum Tarihi seçer. Bülten ve teklif checkbox'larını işaretler.
5. **Adres Bilgilerini Doldur:** Adres, Ülke, Eyalet, Şehir, Cep Telefonu bilgilerini girer.
6. **Hesap Oluştur:** 'Create Account' butonuna tıklar ve hesap oluşturma başarı ekranını doğrular.
7. **Giriş Kontrolü:** Sağ üst barda `'Logged in as [KullanıcıAdı]'` ifadesini doğrular.
8. **Ürün Ara:** Ürünler sayfasına gidip arama kutusuna ürün adını (örn: "Blue Top") girer ve aratır.
9. **Sepete Ekle:** İlk ürünü sepete ekleyerek modal üzerinden Sepet Sayfası'na gider.
10. **Ödeme Adımına Geç (Checkout):** Sepetteki ürünü teyit eder ve fatura sayfasına ilerler.
11. **Adres Doğrulama:** Fatura ve Teslimat adreslerinin kayıt sırasındaki bilgilerle birebir eşleştiğini doğrular.
12. **Yorum Ekle & Sipariş Ver:** Siparişe not ekleyip ödeme adımına geçer.
13. **Ödeme Yap:** Kart bilgilerini girerek siparişi onaylar.
14. **Sipariş Doğrulama:** `'ORDER PLACED!'` sipariş başarı ekranını kontrol eder.
15. **Hesabı Sil:** Kayıtlı hesabı sistemden temizlemek için 'Delete Account' butonuna tıklar.
16. **Tamamla:** Hesabın başarıyla silindiğini teyit eder ve güvenle ana sayfaya döner.

---

## 💡 Dikkat Edilen Önemli Noktalar & Çözümler

*   **Locator Önceliği:** Kodlamada öncelikle benzersiz `id` niteliği, eğer yoksa `data-qa` niteliği, o da yoksa özel CSS selector'lar tercih edilmiştir.
*   **Ayrıştırılmış Veri Yönetimi:** Test dataları [testData.json](cypress/fixtures/testData.json) dosyasından; statik mesajlar ve başlıklar ise [messages.js](cypress/constants/messages.js) dosyasından çağrılmaktadır.
*   **Dinamik E-posta Üretimi:** Testin tekrar koşturulduğunda "Email already exists" hatası vermemesi için her koşumda benzersiz bir e-posta adresi (timestamp eklenerek) dinamik olarak üretilir.
*   **Google Reklamlarının Bloklanması:** Testlerin kararlılığını artırmak ve reklam pencerelerinin butonların üzerine gelip tıklamaları engellemesini (Element Click Intercepted) önlemek amacıyla Google AdSense ve Analytics istekleri `cypress/support/e2e.js` altında intercept edilerek engellenmiştir.
*   **Yeniden Deneme Politikası (Retries):** Testlerin anlık/kararsız ağ yavaşlıkları veya sayfa yüklenme gecikmelerinden dolayı fail olmasını engellemek amacıyla `retries` ayarı aktif edilmiştir. CLI modunda (`runMode`) başarısız olan testler otomatik olarak 2 kez daha yeniden denenir; interaktif modda (`openMode`) ise deneme yapılmaz.
*   **Uncaught Exception Yönetimi:** Siteden kaynaklı üçüncü parti script hatalarının Cypress testini durdurmaması için global hata dinleyici pasifleştirilmiştir.
