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
        if(req.query.cart_id){
            return Cart.find({_id: req.query.cart_id})
                .then(data => {
                    let productIDs = [],
                        parsed = [];
                    data = data[0];
                    // return   res.status(200).json(data);
                    data.products.forEach(item => {
                        //console.log(productIDs, parsed, item);

                        let splited = item.split(':'); // product list format id:amount_order => 5b03ad3b60b4263ee82c274a:5
                        productIDs.push(splited[0]);
                        parsed.push({id: splited[0], amount_order: splited[1]});

                    });
                    Product.find(
                            {_id: { $all: productIDs }},
                            {category: 0, description: 0}
                        )
                        .then(products => {
                            let list = [];
                            products.forEach(product => {
                                parsed.forEach(order => {
                                    console.log(product._id, order.id);
                                    if (product._id == order.id) {
                                        product.price = product.price * order.amount_order;
                                        product.amount_order = order.amount_order;
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
            res.status(200).json({message: 'Not heave cart_id in request.'});
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
                let params = data[0],
                    upd = false,
                    amount = 1;

                if ( params.products.length) {
                    params.products.forEach((item, key) => {
                       // console.log(req.body.product, item, key);
                        if (item.indexOf(req.body.product)) {
                            let splited = item.split(':');
                            //console.log(item, key, splited);
                            amount = Number(splited[1]) + 1;

                            console.log('amount', params.products[key]);
                            params.products[key] = `${req.body.product}:${amount}`;
                            upd = true;
                        }
                    });
                }

                if (!upd || !params.products.length) {
                    params.products.push(`${req.body.product}:${amount}`);
                    params.count++;
                }

                params.total_price = (params.total_price>0 ? params.total_price - req.body.price : 0) + (req.body.price * amount);

                //console.log(params);
                return Cart.findOneAndUpdate({_id: req.params.id}, params)
                    .then(sevedData => {
                        res.status(200).json(sevedData);
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

        console.log(req.body, req.params, req.query);

        return Cart.find({_id: req.params.id})
            .then(data => {
                let params = data[0],
                    products = [];

                params.products.forEach(item => {
                    if(item.indexOf(req.body.product) < 0) products.push(item); // product list format id:amount_order => 5b03ad3b60b4263ee82c274a:5
                });

                params.products = products;
                params.total_price = params.total_price - req.body.price;
                params.count--;

                return Cart.findOneAndUpdate({_id: req.params.id}, params)
                    .then(sevedData => {
                        res.status(200).json(sevedData);
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
