# Hazır şablonlar

Site bu klasördeki `templates.json` dosyasını okuyarak hazır şablon listesini oluşturur.

Yeni bir model eklemek için:

1. STL/OBJ/3MF gibi model dosyanı bu klasöre yükle.
2. `templates.json` içine `name`, `category`, `size`, `file` ve `url` alanlarıyla bir kayıt ekle.
3. Değişiklikleri `main` dalına gönder.

Örnek:

```json
{
  "name": "Yeni model",
  "category": "dekoratif",
  "size": "90 mm",
  "file": "yeni-model.stl",
  "url": "templates/yeni-model.stl"
}
```

`file` alanı sipariş e-postasında görünür. `url` alanı modelin GitHub Pages üzerindeki yoludur.
