const mypath = 'https://cdn.jsdelivr.net/gh/ddshiyu/zredImage@cndV2.5/photo.json'
// var imgDataPath = [{"name":"上海之旅","children":["1080.1440 16627a9c9bdba371d8071c80b302954.jpg","1080.1440 32ec568d3fd43130a22b470cff0afbb.jpg","1080.1440 44889cfab1d911f854e7da6db41e0a3.jpg","1080.1440 5bb65b72bace5ab6de082366fb2ebc6.jpg","1080.1440 89f6a4060014ade8a0498b3dc6e1cb6.jpg","1776.1184 微信图片_20211031202249.jpg","1776.1184 微信图片_202110312022491.jpg","1776.1184 微信图片_202110312022492.jpg","1080.1440 微信图片_202110312022493.jpg","1080.1440 微信图片_202110312022494.jpg","1080.1440 微信图片_202110312022495.jpg","1440.1080 微信图片_202110312022496.jpg","1080.1440 微信图片_202110312022497.jpg","1440.1080 微信图片_202110312022498.jpg","1440.1080 微信图片_20211031202354.jpg"]},{"name":"佛山之旅","children":["1080.1440 2321617694409_.pic.jpg","1080.1440 2331617694410_.pic.jpg","1440.1080 2341617694410_.pic.jpg","1440.1080 2351617694410_.pic.jpg","1440.1080 2361617694411_.pic.jpg","1080.1440 2371617694411_.pic.jpg","1080.1440 2381617694411_.pic.jpg","1440.1080 2391617694411_.pic.jpg"]},{"name":"工作","children":["518.504 0207992309313730054f103ca463023.jpg","266.247 1a5222d0e06302387694c9eec924862.jpg","960.1995 1f1b961e4191a290dd7805cf119a946.jpg","514.398 2ba414a88c5b8e43579ffbdc43a916b.jpg","796.651 66a739ef5b1a625d379e8b0b8ba0bac.jpg","1080.1080 ba29b87add3014ca44c9370ff6ea4c3.jpg"]},{"name":"日常","children":["1440.1080 b54184e2d47c153d6bf604cea8f0263.jpg","1440.1080 db80147b7ab0a3878cd38f79d5402ff.jpg","1440.1080 fb2dec6f48b0f8366ebfb2fda564d86.jpg"]},{"name":"穿越","children":["800.600 009a783e173dbd91459c0ce453f8fa9.jpg","1440.1080 140b9d030f2bafadbacab37e85ce888.jpg","1440.1080 1fb23954b6899278d54d23fb3664a46.jpg","1440.1080 25fa4e036dc50fe04ce2ad5b485089d.jpg","1440.1080 401a1be981966a8399263b9c805ba33.jpg","1440.1080 432a3a08f2551a4497d163efa1a66d3.jpg","1440.1080 542e1fa75e1f0cdbc575eca9b7eafaf.jpg","1440.1080 5b3752b761efa9c84664218e136051f.jpg","1440.1080 88e5ab0b42d27f3b17d19be24103690.jpg","1440.1080 8d534a7a9990234b4fd0a395d13d637.jpg","1440.1080 8ea4e6a1685089394beb39cd806b649.jpg","1920.1080 aa577ac5c0bbc3ea63eb2ed5f191b10.jpg","1920.1080 db480e4503d15abbdfc569a860b85f4.jpg","1920.1080 ebfbc6aaf3b06d1877bea35e1afaaf1.jpg","1440.1080 f17e7aeea3ce4003811ff8a907f6e0b.jpg","1440.1080 f2e68a2cc6f085bb9e41e696493c10c.jpg","1920.1080 fc32005913da247820da6f0c76a1fd4.jpg"]}]
var imgDataPath = mypath
var imgPath = "https://cdn.jsdelivr.net/gh/ddshiyu/zredImage@cndV2.5/images/"; //图片访问路径
var imgMaxNum = 50; //图片显示数量

var windowWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
if (windowWidth < 768) {
  var imageWidth = 145; //图片显示宽度(手机端)
} else {
  var imageWidth = 250; //图片显示宽度
}

const photo = {
  page: 1,
  offset: imgMaxNum,
  init: function () {
    var that = this;
     setTimeout(() => {
      console.log(imgDataPath);
      that.render(that.page, imgDataPath);
      //that.scroll(data);
      that.eventListen(imgDataPath);
     }, 0)
  },
  constructHtml(options) {
    const {
      imageWidth,
      imageX,
      imageY,
      name,
      imgPath,
      imgName,
      imgNameWithPattern,
    } = options;
    const htmlEle = `<div class="card lozad" style="width:${imageWidth}px">
                  <div class="ImageInCard" style="height:${
                    (imageWidth * imageY) / imageX
                  }px">
                    <a data-fancybox="gallery" href="${imgPath}${name}/${imgNameWithPattern}"
                          data-caption="${imgName}" title="${imgName}">
                            <img  class="lazyload" data-src="${imgPath}${name}/${imgNameWithPattern}"
                            src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                            onload="lzld(this)"
                            lazyload="auto">
                        </a>
                  </div>
                </div>`;
    return htmlEle;
  },
  render: function (page, data = []) {
    this.data = data;
    console.log(this.data)
    if (!data.length) return;
    var html,
      imgNameWithPattern,
      imgName,
      imageSize,
      imageX,
      imageY,
      li = "";

    let liHtml = "";
    let contentHtml = "";

    data.forEach((item, index) => {
      const activeClass = index === 0 ? "active" : "";
      liHtml += `<li class="nav-item" role="presentation">
          <a class="nav-link ${activeClass} photo-tab" id="home-tab" photo-uuid="${item.name}" data-toggle="tab" href="#${item.name}"  role="tab" aria-controls="${item.name}" aria-selected="true">${item.name}</a>
        </li>`;
    });
    const [initData = {}] = data;
    const { children = [],name } = initData;
    children.forEach((item, index) => {
      console.log(item);
      imgNameWithPattern = item.split(" ")[1];
      imgName = imgNameWithPattern.split(".")[0];
      imageSize = item.split(" ")[0];
      imageX = imageSize.split(".")[0];
      imageY = imageSize.split(".")[1];
      let imgOptions = {
        imageWidth,
        imageX,
        imageY,
        name,
        imgName,
        imgPath,
        imgNameWithPattern,
      };
      li += this.constructHtml(imgOptions);
    });
    contentHtml += ` <div class="tab-pane fade show active"  role="tabpanel" aria-labelledby="home-tab">${li}</div>`;

    const ulHtml = `<ul class="nav nav-tabs" id="myTab" role="tablist">${liHtml}</ul>`;
    const tabContent = `<div class="tab-content" id="myTabContent">${contentHtml}</div>`;

    $("#imageTab").append(ulHtml);
    $(".ImageGrid").append(tabContent);
    this.minigrid();
  },
  eventListen: function (data) {
    let self = this;
    var html,
      imgNameWithPattern,
      imgName,
      imageSize,
      imageX,
      imageY,
      li = "";
    $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
      $(".ImageGrid").empty();
      const selectId = $(e.target).attr("photo-uuid");
      const selectedData = data.find((data) => data.name === selectId) || {};
      const { children,name } = selectedData;
      let li = "";
      children.forEach((item, index) => {
        imgNameWithPattern = item.split(" ")[1];
        imgName = imgNameWithPattern.split(".")[0];
        imageSize = item.split(" ")[0];
        imageX = imageSize.split(".")[0];
        imageY = imageSize.split(".")[1];
        let imgOptions = {
          imageWidth,
          imageX,
          imageY,
          name,
          imgName,
          imgPath,
          imgNameWithPattern,
        };
        li += self.constructHtml(imgOptions);
      });
      $(".ImageGrid").append(li);
      self.minigrid();
    });
  },
  minigrid: function () {
    var grid = new Minigrid({
      container: ".ImageGrid",
      item: ".card",
      gutter: 12,
    });
    grid.mount();
    $(window).resize(function () {
      grid.mount();
    });
  },
};
photo.init();