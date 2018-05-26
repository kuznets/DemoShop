/**
 * routes:
 * /api/cart
 * /api/cart/:id
 */

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
            Cart.findOne({uid: {$eq: req.body.uid}})
                .then(cart => {
                    if(cart) return res.status(200).json(cart);
                    Cart.create(req.body)
                        .then(data => {
                            res.status(201).json(data);
                        })
                        .catch(next);
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
                    let productIDs = [],
                        parsed = [];
                    data.products.forEach(item => {
                        let splited = item.split(':'); // product list format id:count => iecueviur493:5
                        productIDs.push(splited[0]);
                        parsed.push({id: splited[0], count: splited[1]});
                    });
                    Product.find(
                            {_id: { $all: data.products }},
                            {category: 0, description: 0}
                        )
                        .then(products => {
                            let list = [];
                            products.forEach(product => {
                                parsed.forEach(order => {
                                    if (product._id == order.id) {
                                        product.count = order.id;
                                        list.push(product);
                                    }
                                });
                            });

                            data.products = list;

                            res.status(200).json(data);
                        })
                        .catch(err => {
                            console.log(err);
                            return false;
                        });
                })
                .catch(next);
        } else {
            res.status(200).json({message: 'Not heave card_id in request.'});
        }
    },

    /**
     * PUT /api/cart/:id/add
     * Return the operation status.
     * @method addCartProduct
     * @return JSON
     */
    addCartProduct(req, res, next){
        if(!req.body.product || !req.body.price) return res.status(200).json({message: 'Not heave product or price in request.'});

        return Cart.find({_id: req.params.id})
            .then(data => {
                let params = data;

                params.products.push(req.body.product);
                params.total_price = params.total_price + req.body.price;
                params.count++;

                return Cart.findOneAndUpdate({_id: req.params.id}, params)
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
     * PUT /api/cart/:id/remove
     * Return the operation status.
     * @method removeCartProduct
     * @return JSON
     */
    removeCartProduct(req, res, next){
        if(!req.body.product || !req.body.price) return res.status(200).json({message: 'Not heave product or price in request.'});

        return Cart.find({_id: req.params.id})
            .then(data => {
                let params = data,
                    products = [];

                params.products.forEach(item => {
                    if(req.body.product.split(':')[0] != item.split(':')[0]) products.push(item); // product list format id:count => iecueviur493:5
                });

                params.products = products;
                params.total_price = params.total_price - req.body.price;
                params.count--;

                return Cart.findOneAndUpdate({_id: req.params.id}, params)
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
    deleteCart(req, res, next){
        return Cart.remove({_id: req.params.id})
            .then(data => {
                res.status(200).json(data);
            })
            .catch(next);
    }
});
