from django.contrib import admin
from .models import Category, Product, Customer, Order, Order_item

# This simple registration allows you to see the tables
admin.site.register(Category)
admin.site.register(Customer)

# Using a Class-based registration allows you to customize the list view
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'category', 'price', 'exp_date')
    search_fields = ('product_name',)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'customer', 'order_date')
    list_filter = ('order_date',)

@admin.register(Order_item)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'product_id', 'customer_id')

# Register your models here.
