// Replace this address before publishing to GitHub Pages.
const OWNER_EMAIL = "siparis@katmanatolye.com";
const form = document.querySelector("#orderForm");
const fileInput = document.querySelector("#stlFile");
const fileName = document.querySelector("#fileName");
const summaryModel = document.querySelector("#summaryModel");
const summarySub = document.querySelector("#summarySub");
const summaryQuality = document.querySelector("#summaryQuality");
const summaryContact = document.querySelector("#summaryContact");
const successMessage = document.querySelector("#successMessage");

function setModel(name, detail = "Hazır şablon") {
  summaryModel.textContent = name;
  summarySub.textContent = detail;
  document.querySelectorAll(".template").forEach((template) => {
    template.classList.toggle("active", template.dataset.template === name);
  });
}

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;
  if (file.size > 25 * 1024 * 1024) {
    fileInput.value = "";
    fileName.textContent = "Dosya 25 MB'dan küçük olmalı";
    setModel("Model seçilmedi", "STL veya şablon bekleniyor");
    return;
  }
  fileName.textContent = file.name;
  setModel(file.name, `${(file.size / 1024 / 1024).toFixed(1)} MB · STL`);
});

document.querySelectorAll(".template").forEach((template) => {
  template.addEventListener("click", () => {
    fileInput.value = "";
    fileName.textContent = "Şablon seçildi";
    setModel(template.dataset.template);
  });
});

document.querySelectorAll('input[name="quality"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    document.querySelectorAll(".quality-card").forEach((card) => card.classList.remove("selected"));
    radio.closest(".quality-card").classList.add("selected");
    const layerHeights = { Ekonomi: "0.28 mm", Hızlı: "0.20 mm", Kalite: "0.12 mm" };
    summaryQuality.innerHTML = `${radio.value} <span>${layerHeights[radio.value]}</span>`;
  });
});

document.querySelector('input[name="name"]').addEventListener("input", (event) => {
  summaryContact.textContent = event.target.value.trim() || "Bilgilerin bekleniyor";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (summaryModel.textContent === "Model seçilmedi") {
    fileInput.focus();
    fileName.textContent = "Önce bir STL veya şablon seç";
    return;
  }
  const data = new FormData(form);
  const file = fileInput.files[0];
  const subject = `Yeni 3D baskı isteği — ${summaryModel.textContent}`;
  const body = [
    "Merhaba, yeni bir baskı isteği var.",
    "",
    `Model: ${summaryModel.textContent}`,
    `Dosya: ${file ? file.name : "Hazır şablon"}`,
    `Baskı ayarı: ${data.get("quality")}`,
    "",
    `Ad soyad: ${data.get("name")}`,
    `E-posta: ${data.get("email")}`,
    `Telefon: ${data.get("phone") || "Belirtilmedi"}`,
    `Not: ${data.get("note") || "Yok"}`,
    "",
    "Not: STL dosyası e-posta uygulamasında ayrıca eklenmelidir.",
  ].join("\n");
  successMessage.classList.add("show");
  window.location.href = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.querySelector("#closeSuccess").addEventListener("click", () => successMessage.classList.remove("show"));
