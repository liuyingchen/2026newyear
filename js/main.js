// ==================== 卡片数据 ====================
const cardTemplates = [
    {
        id: 1,
        image: 'images/card-1.jpg',
        title: 'Success Like a Horse',
        message: 'Wishing you to gallop forward like a majestic horse, achieving great success in the new year!'
    },
    {
        id: 2,
        image: 'images/card-2.jpg',
        title: 'Horse Spirit',
        message: 'May you embody the spirit of a horse, with good health, vitality, and happiness every day!'
    },
    {
        id: 3,
        image: 'images/card-3.jpg',
        title: 'Golden Horse Brings Joy',
        message: 'The golden horse brings joy and good fortune. Wishing you endless luck and happiness!'
    },
    {
        id: 4,
        image: 'images/card-4.jpg',
        title: 'Horse Year Blessings',
        message: 'In the Year of the Horse, may all your wishes come true and everything goes smoothly!'
    },
    {
        id: 5,
        image: 'images/card-5.jpg',
        title: 'Horse Welcomes Spring',
        message: 'The horse welcomes spring with family joy and harmony. Wishing you and your family all the best!'
    }
];

// ==================== DOM 元素 ====================
const video = document.getElementById('main-video');
const playOverlay = document.getElementById('play-overlay');
const generateBtnContainer = document.getElementById('generate-btn-container');
const generateBtn = document.getElementById('generate-card-btn');
const cardModal = document.getElementById('card-modal');
const closeModalBtn = document.getElementById('close-modal');
const cardDisplay = document.getElementById('card-display');
const saveCardBtn = document.getElementById('save-card-btn');
const shareCardBtn = document.getElementById('share-card-btn');
const regenerateBtn = document.getElementById('regenerate-btn');
const loadingOverlay = document.getElementById('loading-overlay');

let currentCard = null;

// ==================== 视频播放功能 ====================
function initVideoPlayer() {
    // 点击播放覆盖层播放视频
    playOverlay.addEventListener('click', function() {
        playVideo();
    });

    // 监听视频播放状态
    video.addEventListener('play', function() {
        playOverlay.classList.add('hidden');
        // 播放时隐藏生成按钮
        generateBtnContainer.classList.add('hidden');
    });

    video.addEventListener('pause', function() {
        // 如果视频结束，显示生成按钮
        if (video.ended) {
            generateBtnContainer.classList.remove('hidden');
        }
    });

    video.addEventListener('ended', function() {
        // 视频播放完毕，显示生成按钮
        showGenerateButton();
    });
}

function playVideo() {
    console.log('Attempting to play video...');
    console.log('Video element:', video);
    console.log('Video source:', video.querySelector('source').src);

    // 检查视频是否存在
    if (!video) {
        console.error('Video element not found');
        alert('视频加载失败，请检查视频文件是否存在');
        return;
    }

    // 检查视频是否已就绪
    if (video.readyState === 0) {
        console.error('Video not ready');
        alert('视频正在加载中，请稍后再试');
        return;
    }

    video.play().catch(function(error) {
        console.error('Video play failed:', error);
        console.error('Error details:', error.message);

        // 根据错误类型给出不同提示
        if (error.name === 'NotSupportedError') {
            alert('视频格式不支持或文件不存在');
        } else if (error.name === 'NotAllowedError') {
            alert('浏览器阻止了自动播放，请确保视频文件正确');
        } else {
            alert('视频播放失败: ' + error.message);
        }
    });
}

function showGenerateButton() {
    // 延迟显示按钮，让用户先看到视频结束
    setTimeout(function() {
        generateBtnContainer.classList.remove('hidden');
        // 添加出现动画
        generateBtnContainer.style.animation = 'none';
        generateBtnContainer.offsetHeight; // 触发重排
        generateBtnContainer.style.animation = 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }, 500);
}

// ==================== 卡片生成功能 ====================
function generateRandomCard() {
    // 随机选择一张卡片
    const randomIndex = Math.floor(Math.random() * cardTemplates.length);
    currentCard = cardTemplates[randomIndex];
    return currentCard;
}

function displayCard(card) {
    cardDisplay.innerHTML = '<div style="position: relative; width: 100%; height: 100%;">' +
        '<img src="' + card.image + '" alt="' + card.title + '" class="card-image" onerror="handleImageError(this)">' +
        '<div class="card-content">' +
        '<h3 class="card-title">' + card.title + '</h3>' +
        '<p class="card-message">' + card.message + '</p>' +
        '</div>' +
        '</div>';
}

// 全局错误处理函数
window.handleImageError = function(img) {
    if (!currentCard) return;
    
    console.error('Image load failed:', img.src);
    // 如果图片加载失败，显示默认背景
    const fallbackSvg = 'data:image/svg+xml,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="533">' +
        '<rect fill="%23fff5e6" width="400" height="533"/>' +
        '<text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="%23c41e3a">' + currentCard.title + '</text>' +
        '</svg>'
    );
    img.src = fallbackSvg;
};

async function showCardModal() {
    // 显示加载动画
    loadingOverlay.classList.remove('hidden');

    // 模拟生成过程（如果有后端API，这里可以调用API）
    await new Promise(function(resolve) {
        setTimeout(resolve, 800);
    });

    // 生成随机卡片
    const card = generateRandomCard();
    displayCard(card);

    // 隐藏加载动画，显示弹窗
    loadingOverlay.classList.add('hidden');
    cardModal.classList.remove('hidden');
}

function hideCardModal() {
    cardModal.classList.add('hidden');
}

async function regenerateCard() {
    // 重新生成卡片
    loadingOverlay.classList.remove('hidden');

    await new Promise(function(resolve) {
        setTimeout(resolve, 500);
    });

    const card = generateRandomCard();
    displayCard(card);

    loadingOverlay.classList.add('hidden');
}

// ==================== 卡片保存功能 ====================
function saveCard() {
    if (!currentCard) return;

    // 创建canvas来合成卡片
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 设置canvas尺寸
    canvas.width = 600;
    canvas.height = 800;

    // 绘制背景
    const gradient = ctx.createLinearGradient(0, 0, 600, 800);
    gradient.addColorStop(0, '#c41e3a');
    gradient.addColorStop(1, '#8b4513');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 800);

    // 绘制装饰
    ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
    ctx.beginPath();
    ctx.arc(300, 400, 200, 0, Math.PI * 2);
    ctx.fill();

    // 绘制标题
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 48px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(currentCard.title, 300, 300);

    // 绘制祝福语
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px Arial, sans-serif';
    const words = currentCard.message.split('');
    let y = 380;
    words.forEach(function(char, index) {
        if (index > 0 && index % 10 === 0) {
            y += 40;
        }
        const x = 150 + ((index % 10) * 30);
        ctx.fillText(char, x, y);
    });

    // 绘制装饰边框
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 8;
    ctx.strokeRect(30, 30, 540, 740);

    // 下载图片
    try {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'horse-year-blessing_' + currentCard.title + '.png';
        link.href = dataUrl;
        link.click();

        // 显示保存成功提示
        showToast('Card saved successfully!');
    } catch (error) {
        console.error('Save failed:', error);
        showToast('Save failed, please try again');
    }
}

// ==================== 卡片分享功能 ====================
function shareCard() {
    if (!currentCard) return;

    // 检查是否支持 Web Share API
    if (navigator.share) {
        navigator.share({
            title: currentCard.title + ' - Horse Year Blessing',
            text: currentCard.message + ' Wishing you a prosperous year!',
            url: window.location.href
        }).then(function() {
            showToast('Shared successfully!');
        }).catch(function(error) {
            console.error('Share failed:', error);
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
}

function fallbackShare() {
    // 复制链接到剪贴板
    const shareText = currentCard.title + '\n' + currentCard.message + '\nGet your unique Horse Year blessing card!';

    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(function() {
            showToast('Copied to clipboard!');
        }).catch(function() {
            showToast('Copy failed, please share manually');
        });
    } else {
        // 降级方案：提示用户
        alert('Please share this content:\n\n' + shareText);
    }
}

// ==================== 提示框 ====================
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText =
        'position: fixed;' +
        'top: 50%;' +
        'left: 50%;' +
        'transform: translate(-50%, -50%);' +
        'background: rgba(0, 0, 0, 0.8);' +
        'color: white;' +
        'padding: 1rem 2rem;' +
        'border-radius: 0.5rem;' +
        'z-index: 1000;' +
        'animation: fadeIn 0.3s ease-out;' +
        'font-weight: 600;' +
        'text-align: center;';

    document.body.appendChild(toast);

    setTimeout(function() {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease-out';
        setTimeout(function() {
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
}

// ==================== 事件监听 ====================
function initEventListeners() {
    // 生成卡片按钮
    generateBtn.addEventListener('click', showCardModal);

    // 关闭弹窗
    closeModalBtn.addEventListener('click', hideCardModal);

    // 点击弹窗外部关闭
    cardModal.addEventListener('click', function(e) {
        if (e.target === cardModal) {
            hideCardModal();
        }
    });

    // 保存卡片
    saveCardBtn.addEventListener('click', saveCard);

    // 分享卡片
    shareCardBtn.addEventListener('click', shareCard);

    // 重新生成
    regenerateBtn.addEventListener('click', regenerateCard);

    // 视频触摸优化（移动端）
    video.addEventListener('touchstart', function(e) {
        // 防止视频被其他手势干扰
        e.stopPropagation();
    });
}

// ==================== 初始化 ====================
function init() {
    console.log('=== Horse Year Page Initialization ===');
    console.log('DOM Ready:', document.readyState);

    initVideoPlayer();
    initEventListeners();

    // 预加载图片
    console.log('Start preloading images...');
    cardTemplates.forEach(function(card, index) {
        const img = new Image();
        img.src = card.image;
        img.onload = function() {
            console.log('Image ' + (index + 1) + ' loaded:', card.image);
        };
        img.onerror = function() {
            console.warn('Image ' + (index + 1) + ' failed:', card.image);
        };
    });

    // 检查视频
    console.log('Video state:', video.readyState);
    console.log('Video source:', video.querySelector('source')?.src);

    console.log('=== Horse Year Page Initialized ===');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

// 额外的安全检查 - 确保脚本加载
window.addEventListener('load', function() {
    console.log('Page fully loaded');
});
