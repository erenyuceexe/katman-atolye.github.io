# Katman Atölye

STL dosyası yükleme veya hazır şablon seçme, baskı kalitesi belirleme ve iletişim bilgilerini alarak sipariş isteğini e-posta taslağına dönüştüren statik 3D baskı sipariş sitesi.

## GitHub Pages

Bu repo, `main` dalına yapılan her push'ta `.github/workflows/pages.yml` ile GitHub Pages'e deploy edilir. Repository Settings → Pages → Source bölümünde **GitHub Actions** seçili olmalıdır.

## E-posta adresini ayarlama

Yayınlamadan önce `script.js` içindeki `OWNER_EMAIL` değerini gerçek sipariş e-posta adresinizle değiştirin. Site, formu gönderirken ziyaretçinin cihazındaki e-posta uygulamasında yeni bir taslak açar. STL dosyası güvenlik nedeniyle taslağa otomatik eklenmez; ziyaretçi dosyayı e-postaya ekleyip gönderir. Gerçek dosya upload'ı için bir backend veya Formspree/Resend gibi bir servis eklenmelidir.