
export const initialStateAuth = {
    role: 'SHOP',
    authenticated: true,
    user_data: {
        full_name: '',
        default_customer: {
            cust_code: '',
            cust_name: '',
            ship_brand_name:'',
            ship_to_name:'',
            cust_img: '',
        },
        list_customer: []
    }
};

export const initialStateShop = {
    allOrder: [],
    allSKU: [],
    showCartBalance: 0,
    showItemDetail: {},
    showTab: {
        on: 1,
        value: 'CatalogList',
        transitionName: 'tabOne',
    }
};