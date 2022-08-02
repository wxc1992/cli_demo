
export default [
    {
        title:'实例管理',
        name:'/instancemanagement',
        icon:'fa fa-cogs',
        id: '1',
        children:[
            {
                title:'实例列表',
                name:'/instancemanagement/instancelist',
                icon:'',
                id: '1-1',
            },
        ]
    },
    {
        title:'sql管理',
        name:'/sql',
        icon:'fa fa-tachometer',
        id: '2',
        children:[
            {
                title:'SQL上线',
                name:'/sql/sqlcheck',
                icon:'',
                id: '2-1',
            },
        ]
    },
    {
        title:'历史记录',
        name:'/history',
        icon:'fa fa-cogs',
        id: '3',
        children:[
            {
                title:'审核记录',
                name:'/history/checkhistory',
                icon:'',
                id: '3-1',
            },
            {
                title:'执行记录',
                name:'/history/carryouthistory',
                icon:'',
                id: '3-2',
            },
        ]
    },
]