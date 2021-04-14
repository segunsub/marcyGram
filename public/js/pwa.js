document.addEventListener('DOMContentLoaded', init, false);
function init() {
 pwa()
 like()
 postDropDown()
//  deletePost()
limitVid()

}


function like() {
  let iconController = document.getElementById('likeIcon')
  if(iconController) {
    let count = 0
    iconController.addEventListener('click',(e)=> {
      if(count >= 10) {
        e.target.classList = ["heart outline like icon"]
      }else {
        e.target.classList = ["heart like icon"]
        count++
      }
    } )
  } 
}
function pwa() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then((reg) => {
        console.log('Service worker registered -->', reg);
      }, (err) => {
        console.error('Service worker not registered -->', err);
      });
  }
}
function postDropDown() {
  const exampleModal = document.getElementById('upload')
  if(exampleModal) {
    exampleModal.addEventListener('show.bs.modal', function (event) {
      // Button that triggered the modal
      const button = event.relatedTarget
      // Extract info from data-bs-* attributes
      const recipient = button.getAttribute('data-bs-whatever')
      // If necessary, you could initiate an AJAX request here
      // and then do the updating in a callback.
      //
      // Update the modal's content.
      console.log(recipient)
      let modalTitle = exampleModal.querySelector('.modal-title')
      const media = document.getElementById('fileUpload')
      // var modalBodyInput = exampleModal.querySelector('.modal-body input')
       if(recipient === "Photos") {
         media.innerHTML = `
         <label for="file" class="form-label">Post Photos </label>
         <hr>
          <input type="file" class="ui button" name="file" accept="image/*">`
       }else if(recipient === "Videos") {
         media.innerHTML = `
         <label for="file" class="form-label">Post Video</label>
         <hr>
          <input type="file" class="ui button" name="file" accept="video/*" id="videoInput">
          <span id="vidSpan">Video File Limit 30Mb</span>`
       }else{ 
         media.innerHTML = `
         <label for="messagetext" class="col-form-label">Text</label>
         <hr>
         <textarea class="form-control" name="messagetext"id="message-text"></textarea>
         `
       }
      modalTitle.textContent = recipient
      // modalBodyInput.value = recipient
    })
  }

}


function limitVid() {
   const input = document.getElementById('videoInput')
   const span = document.getElementById('vidSpan')
console.log(input)
   if(input) {
     input.addEventListener('change', (e) => {
       let files = input.files
       console.log(files)

      //  if(files[0].size > ) 
     })
   }
}