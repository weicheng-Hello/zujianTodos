(function(){
    //初次加载时路由初始化
    function handleHashChang(){
        //清空hash值
        window.location.hash = ""
        //初始化visibility的值为all
        vm.$root.visibility = "all"
    }
    //检测hash的变化
    let routes = [{path:"all"},{path:"active"},{path:"finish"}]
    //用hashchangde事件获取hash值，利用replace截取字符串
    window.addEventListener("hashchange",function(){
        let visibility = window.location.hash.replace("#/","")
        let index = routes.findIndex((e,i)=>{
            if(e.path === visibility){
                return true
            }
        })
        if(index === -1) {
            window.location.hash=""
            vm.$root.visibility = "all"
        }else{
            vm.$root.visibility = visibility;
        }
    })
    handleHashChang()
})()