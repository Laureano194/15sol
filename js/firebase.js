// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.key,
    authDomain: "tiziana-15.firebaseapp.com",
    projectId: "tiziana-15",
    storageBucket: "tiziana-15.appspot.com",
    messagingSenderId: "652038035833",
    appId: "1:652038035833:web:4938acb9dd7392c15e37a8"
    //   databaseURL: "xxx",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()


  // Firebase
  class Invitado {
    invitadosRef = db.collection("invitados");

    async add(asiste, nombre, cantidad, menu) {
      const invitado = { asiste, nombre, cantidad, menu };
      
      try {
        const docRef = await this.invitadosRef.add(invitado);
        console.log("User Added with ID: ", docRef.id);
        invitado.id = docRef.id;
      } catch (error) {
        console.error("Error Adding User: ", error);
      }
      return invitado;
    }

    async getAll() {
      const invitados = [];
      try {
        const snapshot = await this.invitadosRef.get();
        snapshot.forEach((doc) => invitados.push({ id: doc.id, ...doc.data() }));
      } catch (err) {
        console.error("Error Getting Invitados: ", error);
      }
      return invitados;
    }

    async get(id) {
      let invitado;
      try {
        let doc = await this.invitadosRef.doc(id).get();

        if (doc.exists) invitado = { id: doc.id, ...doc.data() };
        else console.log("No document found with id: ", id);
      } catch (error) {
        console.error("Error in getting invitado: ", error);
      }
      return invitado;
    }
  }
/////////////////////////////////////////////////////////
  // async function print() {
  //   let inv = new Invitado()
  //   let confirmados = await inv.getAll()
  //   let tbody = document.querySelector("tbody")
  //   for(let confirmado of confirmados) {
  //       let tr = document.createElement("tr")
        
  //       let td1 = document.createElement("td")
  //       td1.innerText = confirmado.nombre
  //       let td2 = document.createElement("td")
  //       td2.innerText = confirmado.asiste
  //       let td3 = document.createElement("td")
  //       td3.innerText = confirmado.cantidad
  //       let td4 = document.createElement("td")
  //       td4.innerText = confirmado.menu
  
  //       tr.appendChild(td1)
  //       tr.appendChild(td2)
  //       tr.appendChild(td3)
  //       tr.appendChild(td4)
  //       tbody.appendChild(tr)
  //   }
  // }
  // print()
  
  // Formulario
  
  // function validateForm(){
  //   if(!["S", "N"].includes(document.getElementById("asistencia").value)){
  //     document.getElementById("asistencia").classList.add("border-danger")
  //     return false
  //   }
  //   return true
  // }
  
  // function resetForm() {
  //   document.getElementById("asistencia").classList.remove("border-danger")
  //   document.getElementById("cantidad").classList.remove("border-danger")
  //   document.getElementById("nombre").classList.remove("border-danger")
  //   document.getElementById("menu").classList.remove("border-danger")
  //   document.getElementById("asistencia").value = "X"
  //   document.getElementById("cantidad").value = ""
  //   document.getElementById("nombre").value = ""
  //   document.getElementById("menu").value = ""
  // }
  
  // async function cargarInvitado(data) {
  //     let objInvitado = new Invitado()
  //     console.log(await objInvitado.add(data.asiste, data.nombre, data.cantidad, data.menu))
  // }
  
  // let form = document.querySelector("form")
  // if (form){
  //     form.addEventListener("submit", (e) => {
  //       e.preventDefault()
  //       if(validateForm()){
  //         let button = document.querySelector("#confirm_button")
  //         button.innerText = "Cargando ..."
  //         const data = Object.fromEntries(new FormData(e.target))
  //         cargarInvitado(data)
  //         .then(res => {
  //           button.innerText = "Confirmación cargada!"
  //           button.disabled = "true"})
  //         .catch(err => {
  //           button.innerText = "No se pudo enviar la confirmación. Intente luego."
  //           button.disabled = "true"})
  //         .finally(() => resetForm())
  //       }})
  // }