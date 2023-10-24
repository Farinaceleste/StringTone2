const alertaContacto = document.querySelector("#boton-confirmar");

alertaContacto.addEventListener ("click", mostrarAlerta);

function mostrarAlerta (e){

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: '¿Aceptas términos y condiciones?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Acepto T&C',
    cancelButtonText: 'No, no acepto',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Aceptaste T&C.',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })

}