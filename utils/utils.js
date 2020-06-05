(function(Vue){
    Vue.prototype.getUniqID = function(){
        return Date.now()
    }
    let storageKey = "mythodos"
    let mytodos = {}
    mytodos.storageFunc = {
        fetch:function(){
            return JSON.parse(localStorage.getItem(storageKey) || '[]');
        },
        save:function(messages){
            localStorage.setItem(storageKey, JSON.stringify(messages));
        }
    }
    //将mytodos绑定在window上面
    window.mytodos = mytodos
})(Vue)