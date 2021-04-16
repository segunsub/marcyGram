
document.addEventListener('DOMContentLoaded', init, false);
function init() {
 pwa()
 like()
 postDropDown()
//  deletePost()
limitVid()
pfpupload()
deletePosts()
updateprofile()
followUser()
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
      
      // if(button) {
        const recipient = button.getAttribute('data-bs-whatever')
        let modalTitle = exampleModal.querySelector('.modal-title')
        const media = document.getElementById('fileUpload')
        // var modalBodyInput = exampleModal.querySelector('.modal-body input')
         if(recipient === "Photos") {
           media.innerHTML = `
           <label for="file" class="form-label">Post Photos </label>
           <hr>
            <input type="file" class="ui button" name="file" accept="image/*">`
         }else if(recipient === "Videos") {
          limitVid()
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
      // }

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
function pfpupload() {
  const file = document.getElementById('pfpsupload')
  if (file) {
    file.addEventListener('change', async() => {
      await postImage(file.name)
    })
  }
}

async function postImage(id) {
const formData = new FormData($("#pfpsupload")[0])
const img = document.getElementById('pfpImg')
$.ajax({
    url : `/app/users/${id}`, // Url of backend (can be python, php, etc..)
    type: "POST", // data type (can be get, post, put, delete)
    data : formData, // data in json format
   success: function(response, textStatus, jqXHR) {
    	img.src = response;
    },
    error: function (jqXHR, textStatus, errorThrown) {
		console.log(jqXHR);
      	console.log(textStatus);
      	console.log(errorThrown);
    },
    cache: false,
        contentType: false,
        processData: false
});
}
function deletePosts() {
  const container = document.getElementById('gridContainer')
  if(container) {
    let children = container.children
    if(children) {
      children = Array.from(children)
      // console.log(children)
      //.removeEventListener("click", Respond)
      children.forEach(post => {
        post.addEventListener('click', openModal , false)
      })
    }
  }

}

function updateprofile() {
  const updateBtn = document.getElementById('updateProfile')
  if(updateBtn) {
    updateBtn.addEventListener('submit', (e) => {
      e.preventDefault()
      if(e.submitter.id === 'updateButton') {
        updateUserProfile()
      }else {
        deleteUserProfile()
      }
     
    })
  }
}
async function updateUserProfile() {
  const updateBtn = document.getElementById('updateButton')
  const id = updateBtn.name
  const pass = document.getElementById('password')
  const mess = document.getElementById('message')

  var formData = {
        'name'              : $('input[name=name]').val(),
        'email'             : $('input[name=email]').val(),
        'userpassword'      : $('input[name=userpassword]').val()
    };
    // process the form
    $.ajax({
        type        : 'PATCH', // define the type of HTTP verb we want to use (POST for our form)
        url         : `/app/users/${id}`, // the url where we want to POST
        data        : formData, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
                    encode          : true,
                    success: function(response, textStatus, jqXHR) {
                      // img.src = response;
                      if(response.check) {
                        mess.style.display = 'block'
                        pass.classList.add(`${response.check}`)
                      }else {
                        window.location.href = response.location
                      }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
    })
}
async function deleteUserProfile() {
  const deleteBtn = document.getElementById('deleteButton')
  const id = deleteBtn.name
    $.ajax({
        type        : 'DELETE', // define the type of HTTP verb we want to use (POST for our form)
        url         : `/app/users/${id}`, // the url where we want to POST
    success: function(result) {
      console.log(result)
      window.location.href = result.redirect
    }
    })
}



function openModal(e) {
  const modal = document.getElementById('postsModal')
  modal.addEventListener('show.bs.modal', function (event) {
    const img = document.getElementById('postImg')
    const text = document.getElementById('postText')
    const video = document.getElementById('postVid')
    const parent = document.getElementById('parentText')
    const vid = document.getElementById('videPlay')
    img.style.display = 'none'
    text.style.display = 'none'
    video.style.display = 'none'
    parent.style.display = 'none'
    if(e.target.title === 'image'){
      img.src = e.target.src
      img.style.display = 'block'
    }else if(e.target.title === 'text') {
      text.innerText = e.target.innerText
      text.style.display = 'block'
      parent.style.display = 'block'
    }else if(e.target.title === 'video'){
      video.style.display = 'block';
      video.src = e.target.children[0].src;
    }else{}
    
    const postId = e.target.id
     const button = document.getElementById('deletePostBtn')
     button.addEventListener('click', (e)=> {
        deletepost(postId,e.target)
     } )
  })
    $("#postsModal").modal('show');
}

async function deletepost(postId,e) {
  const div = document.getElementById(postId)
  const container = document.getElementById('gridContainer')
  console.log(div,container)
  $.ajax({
    type        : 'DELETE', // define the type of HTTP verb we want to use (POST for our form)
    url         : `/app/users/${e.title}/posts/${postId}`, // the url where we want to POST
    dataType    : 'json',
success: function(result) {

  container.removeChild(div)
}
})
}

function followUser() {
  const followdiv = document.getElementById('profileStack')
  if(followdiv) {
    // console.log(follow)
    let children = followdiv.children
    children = Array.from(children)
    children.forEach(child => {
      const div = child.children[2].children[1]
      div.addEventListener('click', follow)
    })
  }
}
async function follow(e) {
  const followIcon = e.path[0]
   const userID = followIcon.tabIndex
  const followId = followIcon.title
  $.ajax({
    url : `/app/users/${userID}/follow/${followId}`, // Url of backend (can be python, php, etc..)
    type: "POST", // data type (can be get, post, put, delete)
   success: function(response, textStatus, jqXHR) {
     followIcon.classList = ['user icon']
     console.log(response, textStatus, jqXHR)
  },
    error: function (jqXHR, textStatus, errorThrown) {
		console.log(jqXHR);
      	console.log(textStatus);
      	console.log(errorThrown);
    },
});
// followdiv.removeEventListener('click',follow)
}