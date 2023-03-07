/**
  * siteData(网站数据，包含栏目、文章、产品、分类、当前栏目等信息)
 *      字段信息:
 *          {menus: [], articles: [], products: [], article_categorys: [], product_categorys: [], resources: [], current_menu: {}}
 *          menu(栏目): {id(栏目id), parent_id(栏目父id), language(栏目所属语言), name(栏目名字), html_name(栏目html名), type(栏目类型), link(栏目超链接), is_show(是否显示), describe_img_url(栏目缩略图)}
 *          article(文章): {id(文章id), title(文章标题), language(文章所属语言), article_category_id(文章所属分类id), article_category_name(文章所属分类名称), author(文章作者), pc_content(文章详情), describe_img_url(文章缩略图), intro(文章简介), click_times(文章点击次数), publish_time(文章发布时间)}
 *          product(产品): {id(), title(产品标题), language(产品所属语言), product_category_id(产品所属分类id), product_category_name(产品所属分类名称), thumb_img_urls(产品图片集), click_times(产品点击次数), publish_time(产品发布时间)}
 *          article_category(文章分类): {id(文章分类id), parent_id(文章分类父id), name(文章分类名), language(文章所属语言), describe_img_url(文章分类缩略图)}
 *          product_category(产品分类): {id(产品分类id), parent_id(产品分类父id), name(产品分类名), language(产品所属语言), describe_img_url(产品分类缩略图)},
 *          resource(资源集): {id(资源id), name(资源名), described(描述), type(类型), size(长度), url(链接), resource_lib_category_id(文件夹id), resource_lib_category_name(文件夹名)}
 *      额外字段: 
 *          在命名为article_category、*_article_category脚本中, siteData中会有额外字段:current_article_category_id
 *          在命名为product_category、*_product_category脚本中, siteData中会有额外字段:current_product_category_id
 *  data（标签中包含的数据，格式固定为json字符串）
 *      解析data: const params = JSON.parse(data.replace(/'/g, '"'));
 *  util（通用工具库，包含: lodash、moment）
 *      字段信息:
 *          {_, moment}
 *      举例: 日期格式化: util.moment(article.publish_time).format('YYYY-MM-DD hh:mm:ss')
 *  return htmlString
 */
 module.exports = function (siteData, data, util) {
  let list = siteData.articles;
  if (siteData.current_article_category_id) {
      // 通过参数指定的分类名， 查找到指定的文章分类
      const category = siteData.article_categorys.find(item => item.id === siteData.current_article_category_id);

      // 查询分类下面的子分类
      const children = siteData.article_categorys.filter(item => item.parent_id === category.id).map(item=>item.id);

      // 合并分类和子分类
      const ids = [category.id].concat(children)

      // 筛选出符合条件的文章
      list = siteData.articles.filter(article => ids.includes(article.article_category_id))
  }
  const show_per_page = 6;// 每一页显示的条数
  const max_page = Math.ceil(list.length / show_per_page);// 一共有多少页
  return `
      <div class="articles">
      ${list.map((item, index) => {
          return ` 
              <div class="columns is-centered is-vcentered is-mobile is-multiline xinwen-item style-one" ${index >= show_per_page ? 'style="display: none;"' : ''}>
                  <!-- 判断index 参考上一条代码-->
                  <div class="column is-6-desktop is-12-mobile ${(index+1)%2 === 0 ? `style-two` : `style-one`}">
                      <a href="${item.link}" class="title">${item.title}</a>
                      <h6 class="subtitle">by ${item.author}  /  ${util.moment(item.publish_time).format('YYYY-MM-DD')}</h6>
                      <p class="intro">${item.intro}</p>
                      <a class="more" href="${item.link}">Read More »</a>
                  </div>
                  <a href="${item.link}" class="column is-4-desktop is-12-mobile">
                      <div class="image is-3by2">
                          <img src="${item.describe_img_url}" alt="${item.title}">
                      </div>
                  </a>
              </div>
              `
          }).join('\n')}
      </div>
      <div class="pagination is-centered">
          <div class="pagination-list">
              ${list.length > show_per_page ? `
                  ${util._.range(max_page).map((item) =>　{
                      return `<a class="pagination-link page_item_${item + 1} ${item === 0 ? 'is-current' : ''}" href="javascript:xinwenliebiao_loadPage(${item + 1})">${item + 1}</a>`
                  }).join('\n')}
              `:''}
          </div>
      </div>
      <script>
          //每页显示的数目
          var show_per_page = ${show_per_page}; 
          var max_page = ${max_page};
          // 当前页面
          var current_page = 1;
  
          function xinwenliebiao_loadPage(page) {
              $('#xinwenliebiao .articles').children().hide();
              $('#xinwenliebiao .articles').children().slice((page - 1) * show_per_page, page * show_per_page).css('display', 'block');
              $('#xinwenliebiao .is-current').removeClass('is-current');
              $('#xinwenliebiao .page_item_' + page).addClass('is-current')
          }
      </script>
  `
}