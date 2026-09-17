const FORM_ENDPOINT = "https://formsubmit.co/ajax/yagizerenyuce@gmail.com";
const MAX_FILE_SIZE = 100 * 1024 * 1024;
const SUPPORTED_EXTENSIONS = ["stl", "obj", "3mf", "ply", "fbx", "gltf", "glb", "dae", "amf"];
const form = document.querySelector("#orderForm");
const fileInput = document.querySelector("#stlFile");
const fileName = document.querySelector("#fileName");
const summaryModel = document.querySelector("#summaryModel");
const summarySub = document.querySelector("#summarySub");
const summaryQuality = document.querySelector("#summaryQuality");
const summaryContact = document.querySelector("#summaryContact");
const successMessage = document.querySelector("#successMessage");
const templateList = document.querySelector("#templateList");
const templateCount = document.querySelector("#templateCount");
let selectedTemplate = null;

function setModel(name, detail = "Hazır şablon") {
  summaryModel.textContent = name;
  summarySub.textContent = detail;
  document.querySelectorAll(".template").forEach((template) => {
    template.classList.toggle("active", template.dataset.template === name);
  });
}

function templateShapeClass(category = "") {
  if (category.includes("saks")) return "shape-pot";
  if (category.includes("kablo")) return "shape-clip";
  return "shape-candle";
}

function renderTemplates(templates) {
  templateCount.textContent = `${templates.length} ADET`;
  templateList.innerHTML = "";
  if (!templates.length) {
    templateList.innerHTML = '<p class="template-loading">Henüz hazır şablon eklenmedi.</p>';
    return;
  }
  templates.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "template";
    button.dataset.template = item.name;
    button.innerHTML = `<span class="template-shape ${templateShapeClass(item.category)}"></span><span><b></b><small></small></span><span class="select-mark">+</span>`;
    button.querySelector("b").textContent = item.name;
    button.querySelector("small").textContent = `${item.category} / ${item.size}`;
    button.addEventListener("click", () => {
      fileInput.value = "";
      selectedTemplate = item;
      fileName.textContent = `Şablon seçildi · ${item.file}`;
      setModel(item.name, `${item.category} · GitHub şablonu`);
    });
    templateList.appendChild(button);
  });
}

fetch("templates/templates.json")
  .then((response) => {
    if (!response.ok) throw new Error("templates_unavailable");
    return response.json();
  })
  .then(renderTemplates)
  .catch(() => {
    templateCount.textContent = "HATA";
    templateList.innerHTML = '<p class="template-loading">Şablon listesi yüklenemedi.</p>';
  });

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;
  selectedTemplate = null;
  const extension = file.name.split(".").pop().toLowerCase();
  if (file.size > MAX_FILE_SIZE) {
    fileInput.value = "";
    fileName.textContent = "Dosya 100 MB'dan küçük olmalı";
    setModel("Model seçilmedi", "3D model veya şablon bekleniyor");
    return;
  }
  if (!SUPPORTED_EXTENSIONS.includes(extension)) {
    fileInput.value = "";
    fileName.textContent = "Bu 3D formatı desteklenmiyor";
    setModel("Model seçilmedi", "Desteklenen formatlardan birini seç");
    return;
  }
  fileName.textContent = file.name;
  setModel(file.name, `${(file.size / 1024 / 1024).toFixed(1)} MB · ${extension.toUpperCase()}`);
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
    fileName.textContent = "Önce bir 3D model veya şablon seç";
    return;
  }

  const data = new FormData(form);
  const file = fileInput.files[0];
  const submitButton = form.querySelector(".submit-button");
  submitButton.disabled = true;
  submitButton.querySelector("span").textContent = "Dosya gönderiliyor...";
  data.set("_subject", `Yeni 3D baskı isteği — ${summaryModel.textContent}`);
  data.set("_template", "table");
  data.set("_captcha", "false");
  data.set("model_name", summaryModel.textContent);
  data.set("model_file_name", file ? file.name : "Hazır şablon");
  data.set("template_file", selectedTemplate ? selectedTemplate.file : "Kullanıcı yüklemesi");
  data.set("template_url", selectedTemplate ? selectedTemplate.url : "");

  fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } })
    .then((response) => {
      if (!response.ok) throw new Error("upload_failed");
      return response.json();
    })
    .then(() => {
      successMessage.classList.add("show");
      form.reset();
      selectedTemplate = null;
      setModel("Model seçilmedi", "3D model veya şablon bekleniyor");
      fileName.textContent = "Henüz dosya seçilmedi";
    })
    .catch(() => {
      fileName.textContent = "Gönderim başarısız, tekrar deneyin";
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.querySelector("span").textContent = "Sipariş isteğini gönder";
    });
});

document.querySelector("#closeSuccess").addEventListener("click", () => successMessage.classList.remove("show"));
