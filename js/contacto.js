const alertaContacto = document.querySelector("#boton-confirmar");

alertaContacto.addEventListener ("click", mostrarAlerta);

function mostrarAlerta (e){

    (async () => {

        const { value: accept } = await Swal.fire({
          title: 'Términos y condiciones',
          input: 'checkbox',
          inputValue: 1,
          inputPlaceholder:
            'Aceptaste los términos y las condiciones',
          confirmButtonText:
            'Continue <i class="fa fa-arrow-right"></i>',
          inputValidator: (result) => {
            return !result && 'Necesitas aceptar T&C'
          }
        })
        
        if (accept) {
          Swal.fire('Aceptaste T&C :)')
        }
        
        })()


}