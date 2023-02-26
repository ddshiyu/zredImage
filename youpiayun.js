const footer = document.querySelector('.footer-wrapper')
const firstSpan = footer.querySelector('span')
const div = document.createElement('div')

div.innerHTML = '<div class="1">本网站由<img src="https://cdn.jsdelivr.net/gh/ddshiyu/zredImage@master/youpai-logo.png">提供CDN加速/云服务存储</div>'

footer.insertBefore(div, firstSpan)