const CreatePerson = require('./createPerson');
const CopyTextToClipboard = require('./copyToClipboard');
const Swal = require('sweetalert2');

module.exports = {
    campoObtigatorio:  ()=>{
        Swal.fire({
            icon: 'warning',
            title: 'Oops! Existem campos obrigatórios que não foram preenchidos!',
            showConfirmButton: true,
        })
    },

    confirmationExtensao:  () =>{
        Swal.fire({
            icon: 'error',
            title: 'Extensão inválida" ',
            showConfirmButton: true,
            timer: 3000,
        })
    },
    confirmationTamanho: () =>{
        Swal.fire({
            icon: 'error',
            title: 'Tamanho do arquivo muito grande! ',
            showConfirmButton: true,
            timer: 3000,
          
        })
    },
    confirmationEmailMasks: () =>{
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Padrão de email incorreto!",
            showConfirmButton: false,
            timer: 1500
          });
    },
    confirmationUndefined: () =>{
        Swal.fire({
            icon: 'error',
            title: 'Oops! algo deu errado, tente novamente. ',
            showConfirmButton: false,
            timer: 3000,
          
        })
    },
    confirmationCheckbox: () =>{
        Swal.fire({
            icon: 'warning',
            title: 'Oops! Você deve concordar com os termos para continuar!',
            showConfirmButton: true,
        })
    },
    confirmationFile: () =>{
        Swal.fire({
            icon: 'warning',
            title: 'Oops! Você deve anexar um arquivo para continuar!',
            showConfirmButton: true,
        })
    },
    confirmationServerError: () =>{
        Swal.fire({
            icon: 'warning',
            title: 'Oops! algo deu errado, tente novamente',
            showConfirmButton: false,
            timer: 3000
        })
    },
    confirmationCategoria: () =>{
        Swal.fire({
            icon: 'warning',
            title: 'Oops! você nao escolheu uma categoria',
            showConfirmButton: true,
            timer: 3000
        })
    },

    confirmationCategoriaInstrumento:  () =>{
        Swal.fire({
            icon: 'warning',
            title: 'Oops! você deve informar o instrumento',
            showConfirmButton: true,
            timer: 3000
        })
    },

    confirmationMaturidade: () =>{
        Swal.fire({
            icon: 'warning',
            title: 'Oops! você nao escolheu uma maturidade da solução',
            showConfirmButton: true,
            timer: 3000
        })
    },
    confirmationSuccess: () =>{
        Swal.fire({
            icon: 'success',
            title: 'Cadastro feito com sucesso!',
            html: 'Em breve você receberá um email de confirmação.',
            showConfirmButton: true,
            timer: 3000,
          })
                
    },
    confirmationPaymantPix: (img, qrcode, formdata) =>{
        Swal.fire({
            title: "Pagamento!",
            text: "Leia o QRCode acima para fazer o pagamento!",
            html:
                '<text>'+ qrcode +'</text>',
            imageUrl: img,
            imageWidth: 400,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Copy',
            imageHeight: 200,
            imageAlt: "Custom image"
          }).then(async (result) => {
            if (result.isConfirmed) {
                await CopyTextToClipboard.copyToClipboard(qrcode);
                Swal.fire({
                    icon: 'success',
                    title: "Copiado!",
                    html:
                        '<text>'+ qrcode +'</text>',
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: "Custom image"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // chamar metodo aqui
                    await CreatePerson.createPersonData(formdata);
                    Swal.fire({
                        icon: 'success',
                        title: "Submetemos seus dados para nossa base!",
                        html:
                        'Em breve enviaremos um email para você!',
                        imageWidth: 400,
                        imageHeight: 200,
                    })
                }})
            }
        });
    },
    uploadingProgress: ()=>{
        Swal.fire({
            title: 'Enviando projeto ...',
            /* html: 'Enviando projeto ...', */
            onBeforeOpen: () => {
              Swal.showLoading()

            } 
          })
    }
}