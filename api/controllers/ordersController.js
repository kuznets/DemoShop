/**
 * routes:
 * /api/orders
 * /api/order/:id
 */

let returnedOrderedProducts = (data, Product, res) => {
    let productIDs = [],
        parsed = [];

    data.products.forEach(item => {
        let splited = item.split(':'); // product list format id:amount_order => 5b03ad3b60b4263ee82c274a:5
        productIDs.push(splited[0]);
        parsed.push({id: splited[0], amount_order: splited[1]});

    });

    Product.find(
        {_id: {$in: productIDs}},
        {description: 0}
    )
        .then(products => {
            let list = [];
            products.forEach(product => {
                parsed.forEach(order => {
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

            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
            return false;
        });
};
module.exports = (Orders, Product) => ({
    /**
     * POST /api/orders
     * Return the orders data.
     * @method createOrder
     * @return JSON
     */
    createOrder(req, res, next){
        if(!req.body.uid || !req.body.products || !req.body.price_sum) {
            return res.status(404).json({message: 'Not send required data.  uid, products, price_sum'});
        } else { 
            Orders.findOne({uid: {$eq: req.body.uid}})
               .then(data => {
                    if(data) return res.status(200).json(data);
                    
                    req.body.status = 'Заказано';
                    Orders.create(req.body)
                        .then(data => {
                            res.status(201).json(data);
                        })
                        .catch(next);
                })
                .catch(next);
        }
    },

    /**
     * GET /api/orders
     * Return the orders list.
     * @method getOrders
     * @return JSON
     */
    getOrders(req, res, next){
        return Orders.find()
            .then(list => {
                if(!list.length) return res.status(200).json({message: 'Not heave orders'});
                res.status(200).json(list);
            })
            .catch(next);
    },

    /**
     * GET /api/order/:id
     * Return the products list in order.
     * @method getOrders
     * @return JSON
     */
    getOrder(req, res, next){
        if(req.params.id){
            return Orders.find({_id: req.params.id})
                .then(data => {
                    returnedOrderedProducts(data, Product, res)
                })
                .catch(next);
        } else {
            res.status(200).json({message: 'Not heave :id in path.'});
        }
    },

    /**
     * PUT /api/order/:id
     * Return the operation status.
     * @method putOrder
     * @return JSON
     */
    putOrder(req, res, next){
        if(!req.body) return res.status(200).json({message: 'Not heave data in request.'});

        return Orders.find({_id: req.params.id})
            .then(data => {
                if(typeof req.body.products == 'string'){
                    let products = [];
                    req.body.products.split(',').forEach(item => {
                        products.push(item);
                    });
                    data.products = products;
                }

                Orders.findOneAndUpdate({_id: req.params.id}, data, {new: true})
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
     * DELETE /api/order/:id
     * Return the operation status.
     * @method deleteOrder
     * @return JSON
     */
    deleteOrder(req, res, next){
        return Orders.remove({_id: req.params.id})
            .then(data => {
                if(data.ok) return res.status(200).json({status: 'success'});
                res.status(200).json(data);
            })
            .catch(next);
    }
});
