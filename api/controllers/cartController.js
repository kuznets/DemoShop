/**
 * routes:
 * /api/cart
 * /api/cart/:id
 */

const getProductsList = (Product, productsArray) => {
    return Product.find({_id: { $all: productsArray }})
        .then(list => {
            return list;
        })
        .catch(err => {
            console.log(err);
            return false;
        });
};

const findCart = (Cart, uid) => {
    return Cart.findOne({uid: {$eq: uid}})
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log(err);
            return false;
        });
};

module.exports = (Cart, Product) => ({
    /**
     * POST /api/cart
     * Return the cart data.
     * @method createCartProducts
     * @return JSON
     */
    createCartProducts(req, res, next){
        if(!req.body.uid) {
            return res.status(404).json({message: 'Non send uid.'});
        } else {
            let cart = findCart(Cart, req.body.uid);

            if(cart) return res.status(200).json(cart);

            return Cart.create(req.body)
                .then(data => {
                    res.status(201).json(data);
                })
                .catch(next);
        }
    },

    /**
     * GET /api/cart
     * Return the products list in cart.
     * @method getCartProducts
     * @return JSON
     */
    getCartProducts(req, res, next){
        if(req.query.card_id){
            return Cart.find({_id: req.query.card_id})
                .then(data => {
                    let products = getProductsList(Product, data.products), list = data;
                    
                    list.products = products;

                    res.status(200).json(list);
                })
                .catch(next);
        } else {
            res.status(200).json({message: 'Not heave card_id in request.'});
        }
    },

    /**
     * PUT /api/cart/:id
     * Return the operation status.
     * @method putCartProduct
     * @return JSON
     */
    putCartProduct(req, res, next){           console.log(req.body, req.params, req.query);

        if(!req.body.product_id || !req.body.price) return res.status(200).json({message: 'Not heave product_id or price in request.'});

        return Cart.find({_id: req.params.id})
            .then(data => {
                let params = data;

                params.products.push(req.body.product_id);
                params.total_price = params.total_price + eq.body.price;
                params.count++;

                return Cart.save(params)
                    .then(() => {
                        res.status(200).json({status: 'success'});
                    })
                    .catch(() => {
                        res.status(201).json({status: 'error'});
                    });
            })
            .catch(next);
    },

    /**
     * DELETE /api/cart/:id
     * Return the operation status.
     * @method deleteCartProduct
     * @return JSON
     */
    deleteCartProduct(req, res, next){
        return Cart.remove({id: req.params.id})
            .then(data => {
                res.status(200).json(data);
            })
            .catch(next);
    }
});
