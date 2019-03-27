//SET_PRODUCT_TYPE

//product type reducer which creates, grabs, updates, and delete product type
//all information is sent via object
const productTypeReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_PRODUCT_TYPE':
            return action.payload;
        default:
            return state;
    }
};


export default productTypeReducer;
