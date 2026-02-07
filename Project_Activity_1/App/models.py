from django.db import models

# Create your models here.

class Category(models.Model):
    category_id = models.BigAutoField(primary_key=True)
    category_name = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Categories"
    
    def __str__(self):
        return self.category_name

class Product(models.Model):
    product_id = models.BigAutoField(primary_key=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=50)
    manu_date = models.DateField()
    exp_date = models.DateField()
    price = models.IntegerField()

    def __str__(self):
        return self.product_name

class Customer(models.Model):
    customer_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    contact = models.IntegerField()
    age = models.IntegerField()

    def __str__(self):
        return self.name

class Order(models.Model):
    order_id = models.BigAutoField(primary_key=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    order_date = models.DateField()

    def __str__(self):
        # This shows "Order #1 - Juan Dela Cruz" in the list
        return f"Order #{self.order_id} - {self.customer.name}"

class Order_item(models.Model):
    order_item_id = models.BigAutoField(primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order_date = models.DateField()

    class Meta:
        verbose_name = "Order Item"
        verbose_name_plural = "Order Items"

    def __str__(self):
        # This shows exactly what was bought: "Order #1: Smartphone"
        return f"{self.order} : {self.product.product_name}"