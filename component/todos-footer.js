// (function(Vue){
//     Vue.component("todos-footer",{
//         template:`
//         <div class="footer" v-show="messages.length != 0">
//             <div class="left">剩下{{remaining.length}}项</div>
//             <div class="center">
//                 <a href="#/all" :class="['center-item-all',{change:visibility == 'all'}]" >All</a>
//                 <a href="#/active" :class="['center-item-active',{change:visibility == 'active'}]">激活</a>
//                 <a href="#/finish" :class="['center-item-finish',{change:visibility == 'finish'}]">完成</a>
//             </div>
       
//             <div class="right"  @click.stop="removeItem">清除已完成</div>
        
//         </div>
//         `
//     })
        
    
// })(Vue)