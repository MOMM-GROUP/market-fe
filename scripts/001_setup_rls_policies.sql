-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Vendors policies
CREATE POLICY "Vendors can view their own data" ON vendors FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Vendors can update their own data" ON vendors FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Vendors can insert their own data" ON vendors FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Anyone can view verified vendors" ON vendors FOR SELECT USING (is_verified = true);

-- Products policies
CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Vendors can manage their own products" ON products FOR ALL USING (
  vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
);

-- Orders policies
CREATE POLICY "Customers can view their own orders" ON orders FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Customers can create their own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Order items policies
CREATE POLICY "Users can view order items for their orders" ON order_items FOR SELECT USING (
  order_id IN (SELECT id FROM orders WHERE customer_id = auth.uid()) OR
  vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
);

-- Cart items policies
CREATE POLICY "Users can manage their own cart" ON cart_items FOR ALL USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Customers can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Customers can update their own reviews" ON reviews FOR UPDATE USING (auth.uid() = customer_id);
