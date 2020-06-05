(function(Vue){
    Vue.component("todos-content",{
    watch: {
        messages:{
            handler(messages){
                mytodos.storageFunc.save(messages);
            },
            deep:true
        }                
    },
    data:function(){
        return {
        message:"",//输入框的值
        messages:mytodos.storageFunc.fetch(),//每次页面刷新在本地缓存中获取数据
        allCheckLabel:true,
        showInput_index:-1,//代表没有编辑的项
        title_cache:"",//保存input内容修改之前的值
        
        }
        
    },
    //自定义组件  聚焦
    directives:{
        focus:{
            inserted:function(el,binding,vode){
            el.focus()
        }
    }
    },
    methods: {
        //监听input
        handkey:function(){
            if(!this.message.trim()){
                alert("请输入非空字符")
                return
            }
            this.messages.push({
                id:Date.now(),//获取当前时间戳
                title:this.message,
                completed:false
            })
            // let todos = this.messages.push(this.message)
            // localStorage.setItem("stroage",JSON.stringify(this.messages))
            this.message=""
            console.log(this.messages)
        },
        del:function(index){
            // console.log(this.messages)
            this.messages.splice(index,1)
        },
        //全选
        allChange:function(){
            this.messages.forEach((e,i) => {
                e.completed = this.allCheckLabel
            })
            this.allCheckLabel = !this.allCheckLabel
        },
        //展示input
        showInput:function(index){
            //保存编辑之前的值
            this.title_cache = this.messages[index].title
            //记录当前编辑哪一条记录
            this.showInput_index = index
            console.log(this.title_cache)
        },
        //保存展示input里面的内容
        saveShowInput:function(index){
            //如果输入的内容为空就删除这条数据
            if(this.messages[index].title==""){
                this.messages.splice(index,1)
            }
            //取消编辑状态
            this.showInput_index = -1
            
            console.log(666)
        },
        //取消修改input里面的内容
        cancelShowInput:function(index){
            // this.showInput_index = index
            this.messages[index].title = this.title_cache
            this.title_cache = ""//清空编辑  内容的缓存
            this.showInput_index = -1
            console.log(this.messages[index].tltle)
            console.log(this.message)
        },
        //清除已完成
        removeItem:function(){
          let unfinish = this.messages.filter(function(e,i){
                return !e.completed
            })
            this.messages = unfinish
            console.log("www")
        },
        //点击添加下拉框的内容
        upDown:function(tip){
            this.messages.push({
                title:tip,
                id:Date.now(),
                completed:false
            })
            this.message=""
        }
    },
    computed:{
        //计算全选按钮
        allCheck:function(){
            let allCheck = true //默认全选
            this.messages.map(function(e,i){
                if(!e.completed){
                    allCheck = false
                }
            })
            return allCheck
        },
        remaining:function(){
            //过滤数组筛选出未被选中的项
        let remaining = this.messages.filter((e,i)=>{
                //未完成项
                return !e.completed
            })
            return remaining
        },
        //路由的数据筛选
        filterMessages:function(){
            if(this.visibility == "all"){
                return this.messages
            }else if(this.visibility == "active"){
                return this.messages.filter(function(e,i){
                    return !e.completed
                })
            }else{
                return this.messages.filter(function(e, i){
                    return e.completed
                })
            }
        },
        // 删选数据显示在下拉框
        tips:function(){
            let tips = []
            this.messages.forEach((e,i)=>{
                if(e.title.indexOf(this.message) != -1){
                    tips.push(e.title)
                }
            })
            return tips
        },
        visibility:function(){
          return this.$root.visibility//all全部 change 激活  finish完成
        }
    },
    
    template: `
    <section>
        <div class="title">
            <input type="text" 
            v-focus
            placeholder="What needs to be done?"
            v-model="message"
            @keyup.13.stop="handkey"
            >
            <!-- 全选框 -->
            <input type="checkbox" 
            v-show="messages.length != 0"
            v-model="allCheck"
            @click.stop="allChange"
            >
            <ul :class="['updown hidden',{show:message != ''}]">
                <li class="updown-content"
                v-for="tip,index in tips"
                @click="upDown(tip)"
                >{{tip}}</li>
                <!-- <li class="updown-content">你的</li>
                <li class="updown-content">他的</li> -->
            </ul>
        </div>
        <div class="content" v-for="item,index in filterMessages" >
            <input type="checkbox" v-model="item.completed" >
            <section :class="['content-item',{active:item.completed},{hidden:showInput_index === index}]" 
            @dblclick.stop="showInput(index)"
            >{{item.title}}</section>
            <div class="content-del" @click.stop="del(index)"></div>
            <input type="text" :class="['hidden',{show:showInput_index === index}]"
            v-model="item.title"
            @keyup.esc="cancelShowInput(index)"
            @keyup.13.stop= "saveShowInput(index)"
            @blur.stop="saveShowInput(index)"
            >
        </div>
        <div class="footer" v-show="messages.length != 0">
            <div class="left">剩下{{remaining.length}}项</div>
            <div class="center">
                <a href="#/all" :class="['center-item-all',{change:visibility == 'all'}]" >All</a>
                <a href="#/active" :class="['center-item-active',{change:visibility == 'active'}]">激活</a>
                <a href="#/finish" :class="['center-item-finish',{change:visibility == 'finish'}]">完成</a>
            </div>
       
            <div class="right"  @click.stop="removeItem">清除已完成</div>
        
        </div>
    </section>

    `
    })
})(Vue)