/* Hakkımızda / İletişim gibi statik sayfalar için ortak init */

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page || "home";
  BioCare.renderShell(page);

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      BioCare.showToast("Mesajınız alındı. En kısa sürede dönüş yapacağız.");
      form.reset();
      form.classList.remove("was-validated");
    });
  }
});
