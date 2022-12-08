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
 * 百度地图常用标签写法: 
 * <dynamic-load component="gaode_map.js" data="{'name': '***公司', 'address': '北京***大厦', 'phone': '88888'}"></dynamic-load>
 */
module.exports = function(siteData, data, util) {
    const config = util.config || {};
    const params = JSON.parse(data.replace(/'/g, '"'));
    return `
        <div>
            <style>
                #m-gaode-map{height:350px;}
            </style>
            <script src="https://webapi.amap.com/maps?v=1.4.15&key=76cdbbd815f7244489c683ff35d05d71&plugin=AMap.PlaceSearch"></script>
            <div id="m-gaode-map"></div>
            <script>
                // 初始化地图
                var map = new AMap.Map("m-gaode-map", {
                    resizeEnable: true,
                    // lang: "en"
                });
                var infoWindow = new AMap.InfoWindow({
                    autoMove: true,
                    offset: {x: 0, y: -30}
                });

                function createContent(poi) {  //信息窗体内容
                    var s = [];
                    s.push("<b>${params.name || config['公共']['公司名称']}</b>");
                    s.push("Address：${params.address || config['公共']['公司地址']}");
                    s.push("Phone：${params.phone || config['公共']['公司手机']}");
                    return s.join("<br>");
                }
                // 获取搜索信息
                function autoInput(){
                    var keywords = '${params.address || config['公共']['公司地址']}';
                    AMap.plugin('AMap.PlaceSearch', function(){
                        var autoOptions = {
                            city: '全国'
                        }
                        var placeSearch = new AMap.PlaceSearch(autoOptions);
                        placeSearch.search(keywords, function(status, result) {
                            if (status !== 'error') {
                                var poi = result.poiList.pois[0];
                                if (poi) {

                                } else {
                                    console.warn('没有查询到地址')
                                }
                                //添加marker
                                var marker = new AMap.Marker({
                                    map: map,
                                    position: poi.location
                                });
                                map.setCenter(marker.getPosition());     
                                infoWindow.setContent(createContent(poi));
                                infoWindow.open(map, marker.getPosition());
                            } else {
                                console.warn(result)
                            }
                            
                        })
                    })
                }

                autoInput();

            </script>
        </div>
    `
}