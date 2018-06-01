/**
 * routes:
 * /api/cart
 * /api/cart/:id
 * /api/cart/:id/add
 * /api/cart/:id/remove
 */
let returnedCartList = (data, Product, res) => {
    let productIDs = [],
        parsed = [];
    console.log(12,data.products);
    // return   res.status(200).json(data);
    data.products.forEach(item => {
        //console.log(productIDs, parsed, item);

        let splited = item.split(':'); // product list format id:amount_order => 5b03ad3b60b4263ee82c274a:5
        productIDs.push(splited[0]);
        parsed.push({id: splited[0], amount_order: splited[1]});

    });
    Product.find(
        {_id: {$in: productIDs}},
        {category: 0, description: 0}
    )
        .then(products => {
            let list = [];
            products.forEach(product => {
                parsed.forEach(order => {
                  //  console.log(29, products, product._id, order.id);
                    if (product._id == order.id) {
                        let obj = {
                            price: product.price,
                            amount: product.amount,
                            _id: product._id,
                            title: product.title,
                            slug: product.slug,
                            img_url: product.img_url,
                            amount_order: order.amount_order
                        };

                        list.push(obj);
                    }
                });
            });

            data.products = list;
            //console.log('list',list);

            res.status(200).json(data);
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
        if(req.query.cart_id) {
            return Cart.find({_id: req.query.cart_id})
                .then(data => {
                    returnedCartList(data[0], Product, res);
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

        Cart.find({_id: req.params.id})
            .then(data => {
                let params = data[0],
                    amount = 1,
                    prods = [];

                if (params.products.length > 0) {
                    if (params.products.join().indexOf(req.body.product) >= 0) {
                        params.products.forEach(item => {
                            let splited = item.split(':');
                            //console.log('117 string', req.body.product, item, splited[0], splited[0] === req.body.product);

                            if (splited[0] == req.body.product) {
                                amount = Number(splited[1]) + 1;
                                prods.push(`${splited[0]}:${amount}`);
                            } else {
                                prods.push(item);
                            }
                        });
                    } else {
                        //console.log(`125 test   ---    ${req.body.product}:${amount}`);
                        prods = params.products;
                        prods.push(`${req.body.product}:${amount}`);
                    }

                    //console.log(132, params.products, prods);
                    params.products = prods;
                } else {
                    params.products.push(`${req.body.product}:${amount}`);
                    params.count++;
                }

                //console.log(139, params, params.products);
                params.total_price = (params.total_price > 0 ? params.total_price - req.body.price : 0) + (req.body.price * amount);

                //console.log(params);
                Cart.findOneAndUpdate({_id: req.params.id}, params, {new: true})
                    .then(sevedData => {
                        console.log(142, sevedData);
                        returnedCartList(sevedData, Product, res);
                    })
                    .catch(next);
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

        //console.log(req.body, req.params, req.query);

        return Cart.find({_id: req.params.id})
            .then(data => {
                let params = data[0],
                    products = [],
                    amount = 1;

                params.products.forEach(item => {
                    console.log(172, item.indexOf(req.body.product), item);
                    if(item.indexOf(req.body.product) < 0) {
                        products.push(item);
                    } else {
                        amount = item.split(':')[1];// product list format id:amount_order => 5b03ad3b60b4263ee82c274a:5
                    }
                });

                console.log(180, params.products, products);
                params.products = products;
                params.total_price = params.total_price - (req.body.price * amount);
                params.count--;

                Cart.findOneAndUpdate({_id: req.params.id}, params, {new: true})
                    .then(sevedData => {
                        returnedCartList(sevedData, Product, res);
                    })
                    .catch(next);
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
