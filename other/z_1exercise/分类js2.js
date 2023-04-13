    let list = siteData.products.filter(item => item.product_category_id !== 636);
    if (siteData.current_product_category_id) {
        // 通过参数指定的分类名， 查找到指定的产品分类
        const category = siteData.product_categorys.find(item => item.id === (siteData.current_product_category_id));

        // 查询分类下面的子分类
        const children = siteData.product_categorys.filter(item => item.parent_id === category.id).map(item=>item.id);

        // 合并分类和子分类
        const ids = [category.id].concat(children)

        // 筛选出符合条件的产品
        list = siteData.products.filter(product => ids.includes(product.product_category_id))
    }
    const show_per_page = 6;// 每一页显示的条数
    const max_page = Math.ceil(list.length / show_per_page);// 一共有多少页