// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        console.log("contructor called")
        console.log("im constructor postId",postId,"/////////////////////////////////////////////////////////")
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        console.log($(this));
        console.log('called before prevent outside');
        
        // console.log(this);
        
        // console.log(final_string);
        // console.log($("#post-${postId}-comments-form"));
        // let init_string = "#post-{postId}-comments-form";
        // let final_string =init_string.replace("{postId}",postId);
        // console.log(final_string,"final_string");
        // console.log(this.newCommentForm);
        // console.log($("#post-64e0f5cbd66df5fc3e22dd0f-comments-form"));
        
        // $(final_string).submit(function(e){
        //     console.log("inside of new function");
        //     e.preventDefault();
        // })

       
        
        this.newCommentForm.submit(function(e){
            console.log('called before prevent');
            e.preventDefault();
            let self = this;
            console.log($("#post-64e0f5cbd66df5fc3e22dd0f-comments-form"));

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    console.log("data",data);
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));

                    //enable functionlity toggling the likes on the new comment
                    new ToggleLike($('.toggle-like-button',newComment));

                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment){
        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(`<li id="comment-${ comment._id }">
                        <p>
                        
                            
                            <small>
                                <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                            </small>
                            
                            ${comment.content}
                            <br>
                            <small>
                                ${comment.user.name}
                            </small>
                            <small> 
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                                0 Likes
                                </a>
                    
                             </small>
                        </p>    

                </li>`);
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
}