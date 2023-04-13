/**
  * siteData(网站数据，包含栏目、文章、产品、分类、当前栏目等信息)
 *      字段信息:
 *          {menus: [], articles: [], products: [], article_categorys: [], product_categorys: [], resources: [], current_menu: {}}
 *          menu(栏目): {id(栏目id), parent_id(栏目父id), language(栏目所属语言), name(栏目名字), subname（栏目副标题），html_name(栏目html名), type(栏目类型), link(栏目超链接), is_show(是否显示), describe_img_url(栏目缩略图), link(链接)}
 *          article(文章): {id(文章id), title(文章标题), language(文章所属语言), article_category_id(文章所属分类id), article_category_name(文章所属分类名称), author(文章作者), labels(标签), pc_content(文章详情), describe_img_url(文章缩略图), intro(文章简介), click_times(文章点击次数), publish_time(文章发布时间), link(链接), out_link(外链接), attachment_url(附件链接),产品常规售价（regular_price）,产品促销价格（sale_price）,库存状态(stock_status)},库存数量(stock_count)},
 *          product(产品): {id(), title(产品标题), language(产品所属语言), product_category_id(产品所属分类id), product_category_name(产品所属分类名称), thumb_img_urls(产品图片集), labels(标签), click_times(产品点击次数), publish_time(产品发布时间), link(链接), out_link(外链接), attachment_url(附件链接)}
 *          article_category(文章分类): {id(文章分类id), parent_id(文章分类父id), name(文章分类名), language(文章所属语言), describe_img_url(文章分类缩略图), describe_title(描述标题), describe_content(描述内容)}
 *          product_category(产品分类): {id(产品分类id), parent_id(产品分类父id), name(产品分类名), language(产品所属语言), describe_img_url(产品分类缩略图), describe_title(描述标题), describe_content(描述内容)},
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
return`
${product.pc_content_url ? `<script src="//cdn.xuansiwei.com/${product.pc_content_url}.js"></script>` : ''}
${product.m_content_url ? `<script src="//cdn.xuansiwei.com/${product.m_content_url}.js"></script>` : ''}

【<a href="javascript:history.back()">返回</a>】
【<a href="javascript:window.scroll(0,-360)">顶部</a>】
【<a href="javascript:self.close()">关闭</a>】

line-clamp-3  展示几行文字

`