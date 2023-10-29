const asideEl = document.querySelector("#asideAccountInfo")
    const abrirAsideEl = document.querySelector("#btnAside")
    const cerrarAsideEl = document.querySelector("#btnCerrarAside")

    abrirAsideEl.addEventListener("click", ()=>{
      if (window.innerWidth <=700){
        asideEl.style.left = "0";
        asideEl.style.boxShadow = "122px 0px 0px 0px rgba(0,0,0,0.70)";
      }
    })

    cerrarAsideEl.addEventListener("click", ()=>{
    if (window.innerWidth <=700){
      asideEl.style.left = "-100%";
      asideEl.style.boxShadow = "0px 0px 0px 0px rgba(0,0,0,0.70)";
    }
    })