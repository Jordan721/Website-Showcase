// Feed.js - Interactive Feed Functionality

// Sample posts data (simulating a database)
let posts = [
    {
        id: 1,
        author: "Sarah Johnson",
        avatar: "fas fa-user-circle",
        time: "2 hours ago",
        content: "Excited to be part of this amazing privacy-focused social network! Finally, a platform that respects user data. 🎉",
        image: "Pics/Website_and_App.png",
        likes: 42,
        comments: 8,
        shares: 3,
        liked: false,
        commentsList: []
    },
    {
        id: 2,
        author: "Mike Chen",
        avatar: "fas fa-user-circle",
        time: "5 hours ago",
        content: "Just discovered the theme customization feature! This platform keeps getting better. 🚀💜",
        image: null,
        likes: 28,
        comments: 5,
        shares: 2,
        liked: false,
        commentsList: []
    },
    {
        id: 3,
        author: "Alex Rivera",
        avatar: "fas fa-user-circle",
        time: "1 day ago",
        content: "Love how Social Com's puts privacy first. No more worrying about data breaches! 🔒✨",
        image: "Pics/Social%20Com's%20Logo.png",
        likes: 156,
        comments: 23,
        shares: 12,
        liked: false,
        commentsList: []
    }
];

// Function to create a post element
function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'post-card fade-in';
    article.dataset.postId = post.id;

    article.innerHTML = `
        <div class="post-header">
            <div class="user-info">
                <div class="avatar">
                    <i class="${post.avatar}"></i>
                </div>
                <div>
                    <h4>${post.author}</h4>
                    <span class="post-time">${post.time}</span>
                </div>
            </div>
            <button class="options-btn"><i class="fas fa-ellipsis-h"></i></button>
        </div>
        <div class="post-content">
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
        </div>
        <div class="post-stats">
            <span><i class="fas fa-heart"></i> <span class="likes-count">${post.likes}</span> likes</span>
            <span><i class="fas fa-comment"></i> <span class="comments-count">${post.comments}</span> comments</span>
            <span><i class="fas fa-share"></i> <span class="shares-count">${post.shares}</span> shares</span>
        </div>
        <div class="post-actions-bar">
            <button class="action-btn like-btn ${post.liked ? 'liked' : ''}" data-action="like">
                <i class="fas fa-heart"></i> ${post.liked ? 'Liked' : 'Like'}
            </button>
            <button class="action-btn comment-btn" data-action="comment">
                <i class="fas fa-comment"></i> Comment
            </button>
            <button class="action-btn share-btn" data-action="share">
                <i class="fas fa-share"></i> Share
            </button>
        </div>
        <div class="comments-section" style="display: none;">
            <div class="comments-list"></div>
            <div class="comment-input-wrapper">
                <input type="text" class="comment-input" placeholder="Write a comment...">
                <button class="send-comment-btn"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    `;

    return article;
}

// Function to render all posts
function renderPosts() {
    const feedLayout = document.querySelector('.feed-layout');
    const createPostCard = document.querySelector('.create-post-card');

    // Clear existing posts (except create post card)
    const existingPosts = feedLayout.querySelectorAll('.post-card');
    existingPosts.forEach(post => post.remove());

    // Add posts after create post card
    posts.forEach(post => {
        const postElement = createPostElement(post);
        feedLayout.appendChild(postElement);
    });

    // Add event listeners to new posts
    attachPostEventListeners();
}

// Function to attach event listeners to posts
function attachPostEventListeners() {
    // Like buttons
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', handleLike);
    });

    // Comment buttons
    document.querySelectorAll('.comment-btn').forEach(btn => {
        btn.addEventListener('click', toggleComments);
    });

    // Share buttons
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', handleShare);
    });

    // Send comment buttons
    document.querySelectorAll('.send-comment-btn').forEach(btn => {
        btn.addEventListener('click', handleComment);
    });

    // Comment input enter key
    document.querySelectorAll('.comment-input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleComment.call(e.target.nextElementSibling, e);
            }
        });
    });
}

// Handle like functionality
function handleLike(e) {
    const postCard = e.currentTarget.closest('.post-card');
    const postId = parseInt(postCard.dataset.postId);
    const post = posts.find(p => p.id === postId);
    const likesCountElement = postCard.querySelector('.likes-count');
    const likeBtn = e.currentTarget;

    // Animate the button
    likeBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        likeBtn.style.transform = 'scale(1)';
    }, 200);

    if (post.liked) {
        post.likes--;
        post.liked = false;
        likeBtn.classList.remove('liked');
        likeBtn.innerHTML = '<i class="fas fa-heart"></i> Like';
    } else {
        post.likes++;
        post.liked = true;
        likeBtn.classList.add('liked');
        likeBtn.innerHTML = '<i class="fas fa-heart"></i> Liked';

        // Create heart animation
        createHeartAnimation(postCard);
    }

    // Update count with animation
    likesCountElement.style.transform = 'scale(1.3)';
    likesCountElement.textContent = post.likes;
    setTimeout(() => {
        likesCountElement.style.transform = 'scale(1)';
    }, 200);
}

// Create floating heart animation
function createHeartAnimation(postCard) {
    const heart = document.createElement('i');
    heart.className = 'fas fa-heart floating-heart';
    heart.style.cssText = `
        position: absolute;
        color: #e63946;
        font-size: 2rem;
        pointer-events: none;
        animation: floatHeart 1s ease-out forwards;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    `;

    postCard.style.position = 'relative';
    postCard.appendChild(heart);

    setTimeout(() => heart.remove(), 1000);
}

// Toggle comments section
function toggleComments(e) {
    const postCard = e.currentTarget.closest('.post-card');
    const commentsSection = postCard.querySelector('.comments-section');

    if (commentsSection.style.display === 'none') {
        commentsSection.style.display = 'block';
        commentsSection.style.animation = 'slideDown 0.3s ease-out';
    } else {
        commentsSection.style.display = 'none';
    }
}

// Handle comment submission
function handleComment(e) {
    const postCard = e.currentTarget.closest('.post-card');
    const postId = parseInt(postCard.dataset.postId);
    const post = posts.find(p => p.id === postId);
    const commentInput = postCard.querySelector('.comment-input');
    const commentText = commentInput.value.trim();

    if (!commentText) return;

    // Add comment to post
    const comment = {
        id: Date.now(),
        author: "You",
        text: commentText,
        time: "Just now"
    };

    if (!post.commentsList) post.commentsList = [];
    post.commentsList.push(comment);
    post.comments++;

    // Update comments count
    const commentsCount = postCard.querySelector('.comments-count');
    commentsCount.textContent = post.comments;

    // Add comment to UI
    const commentsList = postCard.querySelector('.comments-list');
    const commentElement = document.createElement('div');
    commentElement.className = 'comment-item fade-in';
    commentElement.innerHTML = `
        <div class="comment-header">
            <i class="fas fa-user-circle"></i>
            <strong>${comment.author}</strong>
            <span class="comment-time">${comment.time}</span>
        </div>
        <p class="comment-text">${comment.text}</p>
    `;

    commentsList.appendChild(commentElement);

    // Clear input
    commentInput.value = '';
}

// Handle share functionality
function handleShare(e) {
    const postCard = e.currentTarget.closest('.post-card');
    const postId = parseInt(postCard.dataset.postId);
    const post = posts.find(p => p.id === postId);

    post.shares++;

    const sharesCount = postCard.querySelector('.shares-count');
    sharesCount.textContent = post.shares;

    // Show share notification
    showNotification('Post shared! 🎉');

    // Animate share button
    const shareBtn = e.currentTarget;
    shareBtn.style.transform = 'scale(1.1) rotate(10deg)';
    setTimeout(() => {
        shareBtn.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('feedSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            filterPosts(searchTerm);
        });
    }

    // Make trending hashtags clickable
    document.querySelectorAll('.trend-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const hashtag = tag.textContent;
            const searchInput = document.getElementById('feedSearch');
            if (searchInput) {
                searchInput.value = hashtag;
                filterPosts(hashtag.toLowerCase());
            }
        });
    });
}

function filterPosts(searchTerm) {
    const postCards = document.querySelectorAll('.post-card');

    postCards.forEach(post => {
        const content = post.querySelector('.post-content p')?.textContent.toLowerCase() || '';
        const author = post.querySelector('.user-info h4')?.textContent.toLowerCase() || '';

        if (searchTerm === '' || content.includes(searchTerm) || author.includes(searchTerm)) {
            post.style.display = 'block';
            post.style.animation = 'fadeIn 0.3s ease-out';
        } else {
            post.style.display = 'none';
        }
    });

    // Show "no results" message if all posts are hidden
    const visiblePosts = Array.from(postCards).filter(post => post.style.display !== 'none');
    const feedLayout = document.querySelector('.feed-layout');
    let noResults = document.querySelector('.no-results');

    if (visiblePosts.length === 0 && searchTerm !== '') {
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <i class="fas fa-search"></i>
                <h3>No posts found</h3>
                <p>Try searching for something else</p>
            `;
            feedLayout.appendChild(noResults);
        }
    } else if (noResults) {
        noResults.remove();
    }
}

// Handle creating new posts
document.addEventListener('DOMContentLoaded', () => {
    const postBtn = document.querySelector('.post-btn');
    const postTextarea = document.querySelector('.create-post-card textarea');

    if (postBtn) {
        postBtn.addEventListener('click', () => {
            const content = postTextarea.value.trim();

            if (!content) {
                showNotification('Please write something to post!', 'error');
                return;
            }

            // Create new post
            const newPost = {
                id: Date.now(),
                author: "You",
                avatar: "fas fa-user-circle",
                time: "Just now",
                content: content,
                image: null,
                likes: 0,
                comments: 0,
                shares: 0,
                liked: false,
                commentsList: []
            };

            // Add to beginning of posts array
            posts.unshift(newPost);

            // Clear textarea
            postTextarea.value = '';

            // Re-render posts
            renderPosts();

            // Show success notification
            showNotification('Post created successfully! 🎉');

            // Scroll to new post
            setTimeout(() => {
                const newPostElement = document.querySelector(`[data-post-id="${newPost.id}"]`);
                if (newPostElement) {
                    newPostElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        });
    }

    // Initial render
    renderPosts();

    // Setup search
    setupSearch();

    // Setup connect buttons
    setupConnectButtons();
});

// Connect button functionality
function setupConnectButtons() {
    document.querySelectorAll('.connect-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();

            if (this.classList.contains('connected')) {
                this.textContent = 'Connect';
                this.classList.remove('connected');
                showNotification('Connection removed');
            } else if (this.classList.contains('pending')) {
                this.textContent = 'Connect';
                this.classList.remove('pending');
                showNotification('Friend request cancelled');
            } else {
                this.textContent = 'Pending';
                this.classList.add('pending');
                showNotification('Friend request sent! 🎉');

                // Simulate acceptance after 2 seconds (for demo)
                setTimeout(() => {
                    if (this.classList.contains('pending')) {
                        this.textContent = 'Connected';
                        this.classList.remove('pending');
                        this.classList.add('connected');
                        showNotification('You are now connected! ✨');
                    }
                }, 2000);
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add necessary animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes floatHeart {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -100%) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -150%) scale(0.8);
        }
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            max-height: 0;
        }
        to {
            opacity: 1;
            max-height: 500px;
        }
    }

    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .fade-in {
        animation: fadeIn 0.5s ease-out;
    }

    .like-btn.liked {
        color: #e63946;
    }

    .like-btn.liked i {
        animation: heartBeat 0.3s ease-in-out;
    }

    @keyframes heartBeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
    }

    .comments-section {
        padding-top: 1rem;
        border-top: 1px solid var(--border-color);
        margin-top: 1rem;
    }

    .comments-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 1rem;
        max-height: 300px;
        overflow-y: auto;
    }

    .comment-item {
        padding: 0.75rem;
        background: var(--light-bg);
        border-radius: 8px;
    }

    .comment-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
    }

    .comment-header i {
        color: var(--primary-color);
        font-size: 1.5rem;
    }

    .comment-time {
        color: var(--text-light);
        margin-left: auto;
    }

    .comment-text {
        color: var(--text-dark);
        font-size: 0.9rem;
        margin-left: 2rem;
    }

    .comment-input-wrapper {
        display: flex;
        gap: 0.5rem;
    }

    .comment-input {
        flex: 1;
        padding: 0.75rem;
        border: 2px solid var(--border-color);
        border-radius: 8px;
        font-family: 'Poppins', sans-serif;
        transition: all 0.3s ease;
    }

    .comment-input:focus {
        outline: none;
        border-color: var(--primary-color);
    }

    .send-comment-btn {
        background: var(--gradient-1);
        color: white;
        border: none;
        padding: 0.75rem 1.25rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .send-comment-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }

    .action-btn {
        transition: all 0.3s ease;
    }

    .action-btn:active {
        transform: scale(0.95);
    }

    .no-results {
        text-align: center;
        padding: 3rem;
        color: var(--text-light);
    }

    .no-results i {
        font-size: 4rem;
        color: var(--border-color);
        margin-bottom: 1rem;
    }

    .no-results h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: var(--text-dark);
    }

    .trending-item {
        cursor: pointer;
    }

    .trending-item:hover .trend-tag {
        text-decoration: underline;
    }

    .connect-btn.pending {
        background: var(--text-light);
        cursor: default;
    }

    .connect-btn.connected {
        background: #10b981;
    }

    .connect-btn.connected:hover {
        background: #059669;
    }
`;
document.head.appendChild(style);
