const counter = Vue.createApp({});
counter.component(
'click-counter', {
    template: '<button class="btn btn-info" @click="count++">You clicked: {{count}} Times</button>',
    data() {
        return {
            count: 0
        }
    },
}).mount('#components');

const shoppingListApp = Vue.createApp({
    data() {
        return {
            editing: false,
            header: "Shopping List App",
            newItem: '',
            items: [
                {
                    label: '10 party hats',
                    purchased: true,
                    priority: false
                },
                {
                    label: '2 board games',
                    purchased: false,
                    priority: true
                },
                {
                    label: '20 cups',
                    purchased: false,
                    priority: false
                }
            ]
        }
    },
    methods: {
        saveItem(){
            this.items.push({
                label: this.newItem,
                purchased: false
            });
            this.newItem = "";
        },
        doEdit(editing){
            this.editing = editing;
            this.newItem = "";
        },
        togglePurchased(item){
            item.purchased = !item.purchased;
        }
    },
    computed: {
        reverseItems(){
            return [...this.items].reverse();
        }
    }
})
.component(
    data() {
        return {
            
        }
    },
)
.mount('#shopping-list');