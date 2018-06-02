/**
 * routes:
 * /api/orders
 * /api/order/:id
 */

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
                    Product.find(
                            {_id: { $all: data.products }}, 
                            {category: 0, description: 0}
                        )
                        .then(list => {
                            data.products = list;

                            res.status(200).json(data);
                        })
                        .catch(next);
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
