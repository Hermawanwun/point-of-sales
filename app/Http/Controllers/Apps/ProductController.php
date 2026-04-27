<?php

namespace App\Http\Controllers\Apps;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    private function generateUniqueBarcode(?string $categoryName = null): string
    {
        $prefix = Str::upper(Str::substr(Str::slug($categoryName ?? 'PRD', ''), 0, 3));
        $prefix = $prefix !== '' ? $prefix : 'PRD';

        do {
            $barcode = sprintf(
                '%s-%s-%04d',
                $prefix,
                now()->format('YmdHis'),
                random_int(1000, 9999)
            );
        } while (Product::where('barcode', $barcode)->exists());

        return $barcode;
    }

    private function generateUniqueSku(?string $title = null): string
    {
        $prefix = Str::upper(Str::substr(Str::slug($title ?? 'PRODUCT', ''), 0, 8));
        $prefix = $prefix !== '' ? $prefix : 'PRODUCT';

        do {
            $sku = sprintf(
                'SKU-%s-%s',
                $prefix,
                Str::upper(Str::random(10))
            );
        } while (Product::where('sku', $sku)->exists());

        return $sku;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get products
        $products = Product::when(request()->search, function ($products) {
            $products = $products->where('title', 'like', '%' . request()->search . '%');
        })->with('category')->latest()->paginate(10);

        //return inertia
        return Inertia::render('Dashboard/Products/Index', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //get categories
        $categories = Category::all();

        //return inertia
        return Inertia::render('Dashboard/Products/Create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $categoryName = Category::whereKey($request->category_id)->value('name');
        $request->merge([
            'barcode' => $request->filled('barcode')
                ? $request->barcode
                : $this->generateUniqueBarcode($categoryName),
            'sku' => $request->filled('sku')
                ? $request->sku
                : $this->generateUniqueSku($request->title),
        ]);

        /**
         * validate
         */
        $request->validate([
            'barcode' => 'required|unique:products,barcode',
            'sku' => 'required|unique:products,sku',
            'title' => 'required',
            'description' => 'required',
            'category_id' => 'required',
            'buy_price' => 'required',
            'sell_price' => 'required',
            'stock' => 'required',
        ]);
        //upload image
        $image = $request->file('image');
        $image->storeAs('public/products', $image->hashName());

        //create product
        Product::create([
            'image' => $image->hashName(),
            'barcode' => $request->barcode,
            'sku' => $request->sku,
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'buy_price' => $request->buy_price,
            'sell_price' => $request->sell_price,
            'stock' => $request->stock,
        ]);

        //redirect
        return to_route('products.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //get categories
        $categories = Category::all();

        return Inertia::render('Dashboard/Products/Edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        /**
         * validate
         */
        $request->validate([
            'barcode' => 'required|unique:products,barcode,' . $product->id,
            'sku' => 'required|unique:products,sku,' . $product->id,
            'title' => 'required',
            'description' => 'required',
            'category_id' => 'required',
            'buy_price' => 'required',
            'sell_price' => 'required',
            'stock' => 'required',
        ]);

        //check image update
        if ($request->file('image')) {

            //remove old image
            Storage::disk('local')->delete('public/products/' . basename($product->image));

            //upload new image
            $image = $request->file('image');
            $image->storeAs('public/products', $image->hashName());

            //update product with new image
            $product->update([
                'image' => $image->hashName(),
                'barcode' => $request->barcode,
                'sku' => $request->sku,
                'title' => $request->title,
                'description' => $request->description,
                'category_id' => $request->category_id,
                'buy_price' => $request->buy_price,
                'sell_price' => $request->sell_price,
                'stock' => $request->stock,
            ]);

        }

        //update product without image
        $product->update([
            'barcode' => $request->barcode,
            'sku' => $request->sku,
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'buy_price' => $request->buy_price,
            'sell_price' => $request->sell_price,
            'stock' => $request->stock,
        ]);

        //redirect
        return to_route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //find by ID
        $product = Product::findOrFail($id);

        $product->carts()->delete();

        //remove image
        Storage::disk('local')->delete('public/products/' . basename($product->image));

        //delete
        $product->delete();

        //redirect
        return back()->with('success', 'Produk berhasil dihapus.');
    }
}
