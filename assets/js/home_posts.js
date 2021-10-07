// //method to submit form data with ajax

// function serialize(form) {
//     let requestArray = [];
//     form.querySelectorAll('[name]').forEach((elem) => {
//         console.log(elem);
//         requestArray.push(elem.name + ':' + elem.value);
//     });
//     if(requestArray.length > 0){
//         return requestArray.join('&');
//     }
//     else
//         return false;
// }


// let createPost = function(){
//     let newPostForm = document.querySelector('#new-post-form');
//     console.log('newPostForm' , newPostForm);

//     newPostForm.onsubmit = function(e){
//         e.preventDefault();
//     }

//     const xhttp = new XMLHttpRequest();
//     xhttp.onload = function() {
//     console.log('Response from web : ',responseText);
//     }
//     xhttp.open("POST", "/posts/create");
//     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     // let formData = new FormData(newPostForm);
//     // console.log(JSON.stringify(newPostForm));
//     let serialized = serialize(newPostForm);
//     console.log('Serialized ..', serialized);
//     xhttp.send(serialized);
// }

// createPost();

// //method to manipulate DOM

// {
    
//     // createPost();
// }

let createPost = function (){
    let newForm = $('#new-post-form');

    newForm.submit(function(e){
        e.preventDefault();

        $.ajax({
            type : 'post',
            url : '/posts/create',
            data : newForm.serialize(),
            success : function(data){
                // createPost();
                console.log('Serialized : ',data);
                let newPost = newPostDom(data.data.post);
                $('#all-posts').prepend(newPost);
                //append this .post-del-btn class everytime we create new post, remember to add space before .
                deletePost($(' .post-del-btn', newPost))
            }, 
            error : function(err){
                console.log('Error', err.responseText);
            }
        })
    });
}


//manipulate DOM

let newPostDom = function(post){
    return $(`

    <div class="post-div" id="post-${ post._id }">
        <div class="post-head">
            <h5 class="user-name"><a href="/users/profile/${ post.user.id }" style="text-decoration: none; color: rgb(41, 41, 41);"><i class="fas fa-user-circle" style="color: cadetblue;"></i> &nbsp;${ post.user.name }</a></h5>
            <small class="post-del-btn"><a href="/posts/destroy/${ post.id }"><i class="fas fa-trash-alt"></i></a></small>
           
        </div>
        <p class="post-content">${ post.content }</p>
        <div class="post-comment">
          
            <form action="/comments/create" method="post">
                <input type="text" name="content" placeholder="Add your comment here.">
                <input type="hidden" name="post" value="${ post._id }">
                <button type="submit" ><i class="far fa-comment-alt"></i></button>
            </form>
            
            <div class="post-comments-list">
                <ul id= "post-comments-${ post._id }">
                </ul>
            </div>
        </div>
    </div>
    
    `);
}

let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type : 'get',
            url : $(deleteLink).prop('href'),
            success : function(data){
                $(`#post-${data.post_id}`).remove();
            },
            error : function(error){
                console.log('error : ', error.responseText);
            }
        });
    });
}

