
document.addEventListener('DOMContentLoaded', init, false);
function init() {
 pwa()
 like()
 postDropDown()
//  deletePost()
pfpupload()
deletePosts()
updateprofile()
followUser()
addComment()
viewComments()

$("#loginForm").submit(function(e) {
  e.preventDefault()
  loginValidation(e)
})
}


function like() {
  let likeIcon = document.getElementById('eachPost')

  if(likeIcon) {
    let count = 0
    let post = 0
    likeIcon = Array.from(likeIcon.children)
    likeIcon.forEach(posts => {
      const span = posts.children[3]
      const iconController = posts.children[2].children[0].children[0]
      let likeCount = posts.children[2].children[0].children[1]
      likeCount.innerHTML = `
        ${likeCount.id} Likes`
      iconController.addEventListener('click',(e)=> {
      if(count >= 10) {
        e.target.classList = ["heart outline like icon"]
      }else {
        post++
        e.target.classList = ["heart like icon"]
        count++
        let add = parseInt(likeCount.id) + count
        likeCount.innerHTML = `
        ${add} Likes`
        if(post === 10){
          postLikes(span.id,span.title,count,likeCount.id)
        }
      }
    } )
    })
  } 
}
async function postLikes(postId,userId,clickAmount,prevlike) {
      const formData = {"amount" : clickAmount, "prev" : prevlike}
      console.log(formData)
      $.ajax({
        type        : 'PATCH', // define the type of HTTP verb we want to use 
        url         : `/app/users/${userId}/posts/${postId}`, // the 
        data        : formData, // our data object
                    encode          : true,
                    // success: function(response, textStatus, jqXHR) {
                    //   // img.src = response;
                    //   console.log(response)
                    // },
                    error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
    })
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
        media.addEventListener('click',limitVid)
        // const modalBodyInput = exampleModal.querySelector('.modal-body input')
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
      // }

    })
  }

}


function limitVid() {
  console.log('yes')
   const input = document.getElementById('videoInput')
   const span = document.getElementById('vidSpan')
// console.log(input)
   if(input) {
     input.addEventListener('change', (e) => {
       const files = input.files[0].size
       const fileName = input.files[0].name
       const limit = 30000000
       let size = Math.floor(files/1000000)
       size = size.toFixed(2)
       if(files > limit) {
         alert('File too large, Wait time will be extended. You can close the modal and will get redirected when done.')
         span.innerHTML = `File ${fileName} is <strong>${size}<strong><em>Mb</em>`
       }else {
         span.innerHTML = `File ${fileName} is <strong>${size}</strong><em>Mb</em> Est wait time <= 80secs`
       }
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

  const formData = {
        'name'              : $('input[name=name]').val(),
        'email'             : $('input[name=email]').val(),
        'userpassword'      : $('input[name=userpassword]').val()
    };
    // process the form
    $.ajax({
        type        : 'PATCH', // define the type of HTTP verb we want to use 
        url         : `/app/users/${id}`, // the 
        data        : formData, // our data object
        dataType    : 'json', // what expect back from the server
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
        type        : 'DELETE', 
        url         : `/app/users/${id}`, 
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
    type        : 'DELETE', 
    url         : `/app/users/${e.title}/posts/${postId}`,
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
  const followIcon = e.target

   const userID = followIcon.tabIndex
  const followId = followIcon.title
  $.ajax({
    url : `/app/users/${userID}/follow/${followId}`, 
    type: "POST", 
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
function addComment() {
  const commentForm = document.getElementById('eachPost')
  if(commentForm) {
     let form = Array.from(commentForm.children)
     form.forEach(posts => {
       const span = posts.children[3]
       const commentCount = posts.children[2].children[2].children[0]
       const formData = posts.children[4].children[0].children[0]
      //  console.log(formData)
       formData.addEventListener('submit', async(e) => {
          await postComment(span,formData,commentCount)
          e.preventDefault()
       })
     })
  }
}

async function postComment(span,form,cCount) {
  // console.log(span.id)
  const userId = span.title
  const postId = span.id
  const input = form.children[0].children[0].children[1]
  const formData = {
        'comment'              : $(`input[name=${span.id}]`).val()
    };
    $.ajax({
      url : `/app/users/${userId}/posts/${postId}`, 
      type: "POST",
      data : formData, 
      encode          : true,
     success: function(response, textStatus, jqXHR) {
       span.innerText = input.value 
       cCount.innerHTML = parseInt(cCount.innerText) + 1
       input.value = ''
      },
      error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);
      },
  });
}
function viewComments() {
  const commentForm = document.getElementById('eachPost')
  if(commentForm) {
    let form = Array.from(commentForm.children)
    form.forEach(posts => {
      const span = posts.children[3]
      const commentA = posts.children[2].children[2]
    commentA.addEventListener('click',() => {
        const userId = span.title
        const postId = span.id
        $.ajax({
          url : `/app/users/${userId}/posts/${postId}`,
          type: "GET",  
         success: function(response, textStatus, jqXHR) {
          modalComment(response,userId,postId)
          $("#commentModal").modal('show');
          },
          error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR);
              console.log(textStatus);
              console.log(errorThrown);
          },
      });
      commentA.removeEventListener('click',posts)
      })
    })
 }
}
function modalComment(comments,userId,postId) {
  const commentModal = document.getElementById('commentModal')
  if(commentModal) {
    const body = commentModal.children[0].children[0].children[1]
     if(comments.length){
         comments.forEach(comment => {
           const p = document.createElement('p')
           p.style.borderRadius = '22px'
           p.style.paddingLeft = '5px'
           p.style.height = '2em'
           p.style.fontSize = 'large'
           p.style.display = 'flex'
           p.style.justifyContent = 'space-between'
           const i = document.createElement('i')
           i.classList = ['heart outline icon']
           p.innerText = comment.content
           p.append(i)
           if(comment.loved) {
            i.classList = ["heart icon"]
            i.style.color = 'red'
           }else {
            i.addEventListener('click',(e)=> {
              i.classList = ["heart icon"]
              i.style.color = 'red'
              commentLike(userId,postId,comment.id)
            })
           }
           const hr = document.createElement('hr')
           body.append(p,hr)
         })
     }else {
       body.innerText = 'No comments'
     }

async function commentLike(userId,postId,commentId) {
  $.ajax({
    type        : 'PATCH',
    url         : `/app/users/${userId}/posts/${postId}/comment/${commentId}`
})

}
     commentModal.addEventListener('hidden.bs.modal', function (event) {
       body.innerHTML = ''
     })
  }
}

async function loginValidation(e) {
  const emailinput = e.target[0]
  const passInput = e.target[1]
  //is-invalid
  const formData = {
    'useremail'              : $('input[name=useremail]').val(),
    'userpassword'      : $('input[name=userpassword]').val()
};
$.ajax({
  url : `/login`, 
  type: "POST",
  data : formData, 
  encode          : true,
 success: function(response, textStatus, jqXHR) {
   if(response === '/') {
    window.location.href = response
   }else {
     emailinput.classList = [response]
     passInput.classList = [response]
   }
  },
  error: function (jqXHR, textStatus, errorThrown) {
  console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
  },
});
}
