// options是配置对象
function ajax( options ){
    // 定义一个默认配置对象
    var defaultOptions = {
        type:"get",
        url:"",
        data:{},
        contentType:"application/x-www-form-urlencoded",
        success:function(){},
        error:function(){}
    };

    // 合并对象(用options合并到defaultOptions中)
    // console.log( options );
    // console.log( defaultOptions );
    // console.log("");

    options = Object.assign( defaultOptions , options );
    
    // 创建ajax对象
    var xhr = new XMLHttpRequest();

    // 定义一个参数字符串
    var paramStr = "";
    // 遍历options.data
    for(var attr in options.data ){
        paramStr += "&" + attr + "=" + options.data[attr];
    }
    // 去掉第一个&符号
    paramStr = paramStr.substr(1);

    // 判断请求方式
    if( options.type == "get" ){// 如果是get请求,传递参数拼接在url后面
        if( paramStr.length == 0 ){// 如果参数字符串的长度为0,则表示用户没有传递参数
            // 初始化ajax对象
            xhr.open( options.type,  options.url );
        }else{
            // 判断原来的options.url中是否存在?号
            if( options.url.indexOf("?") == -1 ){
                // 初始化ajax对象
                xhr.open( options.type,  options.url + "?" + paramStr );
            }else{
                // 初始化ajax对象
                xhr.open( options.type,  options.url + "&" + paramStr );
            }
        }

        // 发送请求
        xhr.send();
    }else if( options.type == "post" ){// 如果是post请求,传统表单参数是通过xhr.send()方法传递的
        // 初始化ajax对象
        xhr.open( options.type,  options.url );

        // 获取options.contentType的值
        var contentType = options.contentType;

        // 判断contentType的值,设置不同请求头
        if( contentType == "application/x-www-form-urlencoded" ){
            // 设置请求头  传统表单传值
            xhr.setRequestHeader("Content-Type", contentType );
            // 发送请求
            xhr.send( paramStr );
        }else if( contentType == "application/json"){
            // 设置请求头 json字符串传值
            xhr.setRequestHeader("Content-Type", contentType );
            // 发送请求
            xhr.send( options.data );
        }
    }else{
        xhr.open( options.type,  options.url );
        // 如果不是get请求也不是post请求,是其他请求,那么直接发请求
        xhr.send();
    }

    // 处理响应
    xhr.onreadystatechange = function(){
        if( xhr.readyState == 4 ){// 判断ajax状态码
            if(  xhr.status == 200 ){// 判断http状态码是否为200
                // 判断xhr.responseText响应内容是普通字符串还是json字符串
                var reg = /^\{(.+:.+,*){1,}\}$/;
                // 判断是否符合正则规则
                if( reg.test( xhr.responseText ) ){// 如果是json字符串
                    // 成功回调函数
                    options.success( JSON.parse( xhr.responseText ) );
                }else{
                    // 成功回调函数
                    options.success( xhr.responseText );
                }
            }else{
                // 失败回调函数
                options.error( xhr );
            }
        }
    }
}
