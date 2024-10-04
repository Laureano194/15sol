function validateForm(){
    if(!["S", "N"].includes(document.getElementById("asistencia").value)){
      document.getElementById("asistencia").classList.add("border-danger")
      return false
    }
    return true
  }
  
function resetForm() {
    document.getElementById("asistencia").classList.remove("border-danger")
    document.getElementById("cantidad").classList.remove("border-danger")
    document.getElementById("nombre").classList.remove("border-danger")
    document.getElementById("menu").classList.remove("border-danger")
    document.getElementById("asistencia").value = "X"
    document.getElementById("cantidad").value = ""
    document.getElementById("nombre").value = ""
    document.getElementById("menu").value = ""
}

let form = document.querySelector("form")
if (form){
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      if(validateForm()){
        let button = document.querySelector("#confirm_button")
        button.innerText = "Cargando ..."
        const data = Object.fromEntries(new FormData(e.target))
        cargarInvitado(data)
        .then(res => {
          button.innerText = "Confirmación cargada!"
          button.disabled = "true"})
        .catch(err => {
          button.innerText = "No se pudo enviar la confirmación. Intente luego."
          button.disabled = "true"})
        .finally(() => resetForm())
      }})
}

async function print() {
    let tbody = document.querySelector("tbody")
    let inv = new Invitado()
    let confirmados = await inv.getAll()
    tbody.innerHTML = ""
    mostrarTotal(confirmados)
    for(let confirmado of confirmados) {
        let tr = document.createElement("tr")
        
        let keys = ["nombre", "asiste", "cantidad", "menu"]
        for(let key of keys) {
            let td = document.createElement("td")
            td.innerText = confirmado[key]
            if(key == "asiste") {
              td.innerHTML = confirmado["asiste"] =="S" ? "✓" : "<i class='fa-solid fa-x'></i>" 
              td.style.textAlign = "center"
            }
            tr.appendChild(td)
        }
        tbody.appendChild(tr)
    }
}

function mostrarTotal(confirmados){
    let num = confirmados.reduce((total, confirmado) => {
        return total + (confirmado.asiste == "S" ? Number(confirmado.cantidad) : 0)
    }, 0)
    document.getElementById("total_confirmados").innerText = "Total confirmados: " + num
    document.getElementById("total_confirmados").style.visibility = "visible"  
}
async function cargarInvitado(data) {
    let objInvitado = new Invitado()
    console.log(await objInvitado.add(data.asiste, data.nombre, data.cantidad, data.menu))
}

async function downloadXLSX() {
  let objInvitado = new Invitado()
  let confirmados = await objInvitado.getAll()
  let filtrados = confirmados.map((confirmado) => {
    return {nombre: confirmado.nombre, asiste: confirmado.asiste, cantidad: confirmado.cantidad, menu: confirmado.menu}
  })
  const worksheet = XLSX.utils.json_to_sheet(filtrados);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Confirmados");

  /* fix headers */
  XLSX.utils.sheet_add_aoa(worksheet, [["Nombre", "Asiste", "Cantidad", "Menu Especial"]], { origin: "A1" });

  /* calculate column width */
  const max_width = confirmados.reduce((w, r) => Math.max(w, r.nombre.length), 10);
  worksheet["!cols"] = [ { wch: max_width } ];

  /* create an XLSX file and try to save to Presidents.xlsx */
  XLSX.writeFile(workbook, "Confirmados.xlsx", { compression: true });

}

let xlsxButton = document.getElementById("dwnldxlsx")
if (xlsxButton) {
  xlsxButton.addEventListener("click", () => {
    downloadXLSX()
  })
}