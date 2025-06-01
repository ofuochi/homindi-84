"use client"

import { useEffect, useState } from "react"
import { Row, Col, Card, Slider, Checkbox, Select, Input, Button, Empty, Pagination, Spin } from "antd"
import { FilterOutlined } from "@ant-design/icons"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ProductCard from "@/components/product/ProductCard"
import { useProductStore } from "@/store/useProductStore"
import { PRODUCT_CATEGORIES } from "@/lib/constants"

const { Search } = Input
const { Option } = Select

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const pageSize = 12

  const {
    filteredProducts,
    searchTerm,
    selectedCategories,
    priceRange,
    inStockOnly,
    sortBy,
    isLoading,
    setSearchTerm,
    setSelectedCategories,
    setPriceRange,
    setInStockOnly,
    setSortBy,
    clearFilters,
    fetchProducts,
    products,
  } = useProductStore()

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts()
    }
  }, [products.length, fetchProducts])

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const maxPrice = Math.max(...products.map((p) => p.price), 100)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Spin size="large" />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-gray-600">Discover authentic Nigerian ingredients for your kitchen</p>
        </div>

        {/* Search and Sort */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <Search
            placeholder="Search products..."
            allowClear
            size="large"
            className="flex-1"
            value={searchTerm}
            onSearch={setSearchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={sortBy} onChange={setSortBy} size="large" className="w-full sm:w-48">
            <Option value="name">Sort by Name</Option>
            <Option value="price-low">Price: Low to High</Option>
            <Option value="price-high">Price: High to Low</Option>
          </Select>
          <Button
            icon={<FilterOutlined />}
            size="large"
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden"
          >
            Filters
          </Button>
        </div>

        <Row gutter={24}>
          {/* Filters Sidebar */}
          <Col xs={24} lg={6} className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <Card title="Filters" className="mb-6">
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Categories</h4>
                <Checkbox.Group
                  options={PRODUCT_CATEGORIES}
                  value={selectedCategories}
                  onChange={setSelectedCategories}
                  className="flex flex-col space-y-2"
                />
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <Slider
                  range
                  min={0}
                  max={maxPrice}
                  value={priceRange}
                  onChange={setPriceRange}
                  tooltip={{ formatter: (value) => `$${value}` }}
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Stock Filter */}
              <div className="mb-6">
                <Checkbox checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)}>
                  In Stock Only
                </Checkbox>
              </div>

              {/* Clear Filters */}
              <Button block onClick={clearFilters}>
                Clear All Filters
              </Button>
            </Card>
          </Col>

          {/* Products Grid */}
          <Col xs={24} lg={18}>
            <div className="mb-4 text-gray-600">
              Showing {paginatedProducts.length} of {filteredProducts.length} products
            </div>

            {paginatedProducts.length === 0 ? (
              <Empty description="No products found" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <>
                <Row gutter={[24, 24]}>
                  {paginatedProducts.map((product) => (
                    <Col key={product.id} xs={24} sm={12} xl={8}>
                      <ProductCard product={product} />
                    </Col>
                  ))}
                </Row>

                {/* Pagination */}
                {filteredProducts.length > pageSize && (
                  <div className="mt-8 text-center">
                    <Pagination
                      current={currentPage}
                      total={filteredProducts.length}
                      pageSize={pageSize}
                      onChange={setCurrentPage}
                      showSizeChanger={false}
                      showQuickJumper
                    />
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </div>

      <Footer />
    </div>
  )
}
