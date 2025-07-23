@app.route('/api/products', methods=['POST'])
def create_product():
    data = request.json

    # Required fields
    required_fields = ['name', 'sku', 'price', 'warehouse_id', 'initial_quantity']
    for field in required_fields:
        if field not in data:
            return {"error": f"{field} is required"}, 400

    # Check if SKU already exists
    existing = Product.query.filter_by(sku=data['sku']).first()
    if existing:
        return {"error": "SKU already exists"}, 409

    try:
        # Create product
        product = Product(
            name=data['name'],
            sku=data['sku'],
            price=float(data['price'])
        )
        db.session.add(product)
        db.session.flush()

        # Add inventory
        inventory = Inventory(
            product_id=product.id,
            warehouse_id=data['warehouse_id'],
            quantity=int(data['initial_quantity'])
        )
        db.session.add(inventory)
        db.session.commit()

        return {"message": "Product created", "product_id": product.id}, 201

    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500

# Note:
# - Used db.session.flush() to get the product ID before committing to the database.
# - Committing once after both product and inventory creation ensures consistent data if something fails.
# - Casting price to float helps handle cases where input comes as a string.
