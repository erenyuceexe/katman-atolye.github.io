# Katman Atölye

STL, OBJ ve diğer 3D model dosyalarını yükleme veya hazır şablon seçme, baskı kalitesi belirleme ve iletişim bilgilerini alarak sipariş isteğini e-posta ileten statik 3D baskı sipariş sitesi.

## GitHub Pages

Bu repo, `main` dalına yapılan her push'ta `.github/workflows/pages.yml` ile GitHub Pages'e deploy edilir. Repository Settings → Pages → Source bölümünde **GitHub Actions** seçili olmalıdır.

## E-posta adresini ayarlama

Form gönderimi `https://formsubmit.co/ajax/yagizerenyuce@gmail.com` üzerinden yapılır. İlk gönderimde FormSubmit, adresinize bir doğrulama e-postası gönderebilir; bu onaydan sonra model dosyası multipart yükleme olarak e-postaya eklenir. Desteklenen formatlar: STL, OBJ, 3MF, PLY, FBX, GLTF, GLB, DAE ve AMF. Tarayıcı tarafındaki sınır 100 MB'tır; FormSubmit'in güncel ek dosya sınırı daha düşükse servis sınırı geçerli olur.