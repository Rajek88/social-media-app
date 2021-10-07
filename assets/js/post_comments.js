{
    let createComment = function (){
        let newCommentForm = $('#new-comment-form');

        newCommentForm.submit(function(e1){
            e1.preventDefault();

            $.ajax({
                type : 'post',
                url : '/comments/create',
                data : newCommentForm.serialize(),
                success : function(cdata){
                    console.log('Serialized : ',cdata);
                    let newComment = newCommentDom(cdata.data.comment);
                    $('.all-comments').append(newComment);
                    //append this .post-del-btn class everytime we create new post, remember to add space before .
                    deleteComment($(' .comment-del-btn', newComment))
                }, 
                error : function(err){
                    console.log('Error', err.responseText);
                }
            })
        });
    }


    //manipulate DOM

    let newCommentDom = function(comment){
        return $(`

        <li>
            <div class="comment-head">
                <h5 class="commenter-name"><a href="/users/profile/${comment.user.id} " style="text-decoration: none; color: rgb(41, 41, 41);"><i class="fas fa-user-circle" style="color: cadetblue;"></i> &nbsp;${comment.user.name}</a></h5>
                <div class="del-comment">  
                   ${ (locals.user && (locals.user.id === comment.user.id)) ? `<a href="/comments/destroy/${comment.id} " id="comment-del-btn"><i class="fas fa-trash-alt"></i></a>` : ''}
                   ${ (locals.user && (locals.user.id === post.user.id)) ? `<a href="/comments/postownerDestroy/${comment.id} " id="comment-del-btn"><i class="fas fa-trash-alt"></i></a>` : ''}
              </div> 
            </div>

            <div class="comment-content">
                <p> ${comment.content} </p>
            </div>
        </li>
        
        `);
    }

    let deleteComment = function(deleteCommentLink){
        $(deleteCommentLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type : 'get',
                url : $(deleteCommentLink).prop('href'),
                success : function(cdata){
                    $(`#post-${cdata.comment_id}`).remove();
                },
                error : function(error){
                    console.log('error : ', error.responseText);
                }
            });
        });
    }

    createComment();
}