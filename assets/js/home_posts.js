{
    // this is the method to submit the form data for new post using AJAX , //function which send the data to the controller action
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data: newPostForm.serialize(), // this converts the newPostForm data into JSON, key would be content and value will be 
                // value filled in the form
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                    console.log("calling comments");
                    console.log(data.data.post._id,"you this my posts's id");

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    //enable functionlaity toggling the likes on the new Post 
                    new ToggleLike($('.toggle-like-button',newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

// <ul>
// <% for (let post of postsList) { %> 
    //   <% } %>
        // </ul> 
    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`
        
            <li id="post-${post._id}">
                <p>
                   
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
                    </small>
                    
                ${post.content}
                <small>
                    ${post.user.name}
                </small>
                <br>
                <small> 
                        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                        0 Likes
                        </a>
                    
                </small>
                </p>

                <div class="post-comments">
                   
                        <form action="/comments/create" method="post">
                            <input type="text" name="content" placeholder="Type here to comment..." required>
                            <input type="hidden" name="post" value="${ post._id}">
                            <input type="Submit" value="Add comment">
            
                        </form>
                   
            
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                        </ul>
            
                    </div>
                </div>
            
            </li>
            
    
    `) // in jquery we can use backtick to be able to use {} and add variables  into it
    }

    //method to delete post from DOM
    let deletePost = function(deleteLink){
        console.log('outside');
        $(deleteLink).click(function(e){
            e.preventDefault();
            console.log("entering here");
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme:'relax',
                        text:'Post deleted',
                        type:'success',
                        layout:'topRight',
                        timeout:'1500'
                    }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    createPost();
}